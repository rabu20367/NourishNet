export type FoodCategory = "Fruits" | "Vegetables" | "Baked Goods" | "Dairy" | "Meats" | "Prepared Meals" | "Pantry Staples" | "Drinks" | "Other";

export type DonationStatus = "Available" | "Claimed" | "In Transit" | "Delivered" | "Cancelled";

export interface Donation {
  id: string;
  foodName: string;
  category: FoodCategory;
  quantity: string; // e.g., "10 lbs", "3 boxes"
  donorName: string; // Could be individual or organization
  donorId?: string; // Link to User/Organization ID
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  imageUrl?: string;
  description?: string;
  isPerishable: boolean;
  postedAt: string; // ISO Date string
  pickupBy?: string; // ISO Date string for deadline
  status: DonationStatus;
  volunteerId?: string; // ID of volunteer handling this
  recipientId?: string; // ID of recipient
}

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export type TimeOfDay = "Morning" | "Afternoon" | "Evening";

export interface VolunteerAvailability {
  days: DayOfWeek[];
  times: TimeOfDay[]; // General time preferences
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  availability: VolunteerAvailability;
  isActive: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  // deliveryHistoryIds: string[];
}

export interface Recipient {
  id: string;
  name: string; // Organization name or individual
  type: "Food Bank" | "Shelter" | "Community Fridge" | "Individual";
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  contactEmail?: string;
  contactPhone?: string;
  needs: {
    foodCategories: FoodCategory[];
    urgency: "Low" | "Medium" | "High";
  };
}
