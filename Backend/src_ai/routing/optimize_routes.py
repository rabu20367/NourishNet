import json
import math
import sys
from typing import Any, Dict, List

from ortools.constraint_solver import pywrapcp, routing_enums_pb2


def distance(a: Dict[str, float], b: Dict[str, float]) -> int:
    dx = a["latitude"] - b["latitude"]
    dy = a["longitude"] - b["longitude"]
    return int(math.sqrt(dx * dx + dy * dy) * 111000)


def available(vol: Dict[str, Any], day: str, time: str) -> bool:
    if not vol.get("isActive"):
        return False
    avail = vol.get("availability", {})
    return day in avail.get("days", []) and time in avail.get("times", [])


def build_distance_matrix(locations: List[Dict[str, float]], factor: float) -> List[List[int]]:
    matrix = []
    for a in locations:
        row = []
        for b in locations:
            row.append(int(distance(a, b) * factor))
        matrix.append(row)
    return matrix


def optimize(data: Dict[str, Any]) -> Dict[str, Any]:
    donations = data.get("donations", [])
    day = data.get("currentDay")
    time = data.get("currentTime")
    traffic = float(data.get("trafficFactor", 1.0))
    volunteers = [v for v in data.get("volunteers", []) if available(v, day, time)]

    if not donations or not volunteers:
        return {"routes": [], "unassigned": [d["id"] for d in donations]}

    all_nodes = [v["currentLocation"] for v in volunteers] + [d["location"] for d in donations]
    distance_matrix = build_distance_matrix(all_nodes, traffic)

    num_vehicles = len(volunteers)
    starts = list(range(num_vehicles))
    ends = list(range(num_vehicles))

    manager = pywrapcp.RoutingIndexManager(len(distance_matrix), num_vehicles, starts, ends)
    routing = pywrapcp.RoutingModel(manager)

    def dist_callback(from_index: int, to_index: int) -> int:
        return distance_matrix[manager.IndexToNode(from_index)][manager.IndexToNode(to_index)]

    transit_cb = routing.RegisterTransitCallback(dist_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_cb)

    def demand_callback(from_index: int) -> int:
        node = manager.IndexToNode(from_index)
        return 0 if node < num_vehicles else 1

    demand_cb = routing.RegisterUnaryTransitCallback(demand_callback)
    routing.AddDimensionWithVehicleCapacity(demand_cb, 0, [3] * num_vehicles, True, "Capacity")

    search_params = pywrapcp.DefaultRoutingSearchParameters()
    search_params.first_solution_strategy = routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC

    solution = routing.SolveWithParameters(search_params)

    routes = []
    if solution:
        assigned = set()
        for v in range(num_vehicles):
            index = routing.Start(v)
            stops = []
            dist = 0
            while not routing.IsEnd(index):
                prev = index
                index = solution.Value(routing.NextVar(index))
                node = manager.IndexToNode(index)
                if node >= num_vehicles:
                    donation_idx = node - num_vehicles
                    donation = donations[donation_idx]
                    stops.append({"donationId": donation["id"], "location": donation["location"]})
                    assigned.add(donation["id"])
                dist += routing.GetArcCostForVehicle(prev, index, v)
            routes.append({"volunteerId": volunteers[v]["id"], "stops": stops, "distance_km": dist / 1000})
        unassigned = [d["id"] for d in donations if d["id"] not in assigned]
    else:
        routes = []
        unassigned = [d["id"] for d in donations]

    return {"routes": routes, "unassigned": unassigned}


if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    result = optimize(input_data)
    print(json.dumps(result))

