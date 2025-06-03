import type { Donation, Volunteer, FoodCategory, DonationStatus, DayOfWeek, TimeOfDay } from './types';

export const mockFoodCategories: FoodCategory[] = ["Fruits", "Vegetables", "Baked Goods", "Dairy", "Meats", "Prepared Meals", "Pantry Staples", "Drinks", "Other"];

export const mockDonations: Donation[] = [
  {
    id: '1',
    foodName: 'Fresh Apples',
    category: 'Fruits',
    quantity: '20 lbs',
    donorName: 'Green Valley Grocer',
    location: { address: '123 Main St, Anytown, USA', latitude: 34.0522, longitude: -118.2437 },
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'apples fruit',
    description: 'A mix of Fuji and Gala apples, fresh from the orchard.',
    isPerishable: true,
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    pickupBy: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    status: 'Available',
  },
  {
    id: '2',
    foodName: 'Day-Old Bread Loaves',
    category: 'Baked Goods',
    quantity: '15 loaves',
    donorName: 'Rosie\'s Bakery',
    location: { address: '456 Oak Ave, Anytown, USA', latitude: 34.0550, longitude: -118.2500 },
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'bread bakery',
    description: 'Assorted sourdough and whole wheat loaves.',
    isPerishable: true,
    postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    status: 'Claimed',
    volunteerId: 'v1',
    recipientId: 'r2'
  },
  {
    id: '3',
    foodName: 'Canned Soups Assortment',
    category: 'Pantry Staples',
    quantity: '3 boxes (72 cans)',
    donorName: 'Community Food Drive',
    location: { address: '789 Pine Ln, Anytown, USA', latitude: 34.0600, longitude: -118.2300 },
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'canned food',
    description: 'Tomato, chicken noodle, and vegetable soups.',
    isPerishable: false,
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: 'Delivered',
    volunteerId: 'v2',
    recipientId: 'r1'
  },
  {
    id: '4',
    foodName: 'Mixed Green Salads',
    category: 'Prepared Meals',
    quantity: '12 portions',
    donorName: 'Healthy Eats Cafe',
    location: { address: '101 River Rd, Anytown, USA', latitude: 34.0400, longitude: -118.2600 },
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'salad greens',
    description: 'Freshly prepared mixed green salads with vinaigrette.',
    isPerishable: true,
    postedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    status: 'Available',
  }
];

export const mockVolunteers: Volunteer[] = [
  {
    id: 'v1',
    name: 'Alice Wonderland',
    email: 'alice@example.com',
    phone: '555-1234',
    availability: { days: ['Monday', 'Wednesday', 'Friday'], times: ['Morning', 'Afternoon'] },
    isActive: true,
    currentLocation: { latitude: 34.0530, longitude: -118.2450 },
  },
  {
    id: 'v2',
    name: 'Bob The Builder',
    email: 'bob@example.com',
    phone: '555-5678',
    availability: { days: ['Tuesday', 'Thursday', 'Saturday'], times: ['Evening'] },
    isActive: true,
    currentLocation: { latitude: 34.0580, longitude: -118.2350 },
  },
  {
    id: 'v3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    phone: '555-8765',
    availability: { days: ['Sunday'], times: ['Morning', 'Afternoon', 'Evening'] },
    isActive: false,
  }
];

export const mockImpactStats = {
  mealsRescued: 12345,
  activeVolunteers: 42,
  co2EmissionsAvoidedKg: 5678,
  citiesSupported: 3,
};

export const daysOfWeek: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const timeOfDay: TimeOfDay[] = ["Morning", "Afternoon", "Evening"];
