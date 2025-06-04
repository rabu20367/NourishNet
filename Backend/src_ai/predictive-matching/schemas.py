from pydantic import BaseModel

class VolunteerHistory(BaseModel):
    volunteer_id: str
    successful_pickups: int
    declined_pickups: int
    avg_distance_km: float
    days_since_last_pickup: int

class RescueRequest(BaseModel):
    donation_id: str
    distance_km: float
    is_perishable: bool
    requested_hour: int
