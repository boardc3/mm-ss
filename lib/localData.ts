export interface Amenity {
  name: string;
  description: string;
  distance: string;
  rating?: number;
  image?: string;
  address?: string;
}

export interface AmenityCategory {
  id: string;
  label: string;
  items: Amenity[];
}

export const localAmenities: AmenityCategory[] = [
  {
    id: 'restaurants',
    label: 'Restaurants',
    items: [
      {
        name: 'Zuma Miami',
        description: 'Modern Japanese cuisine in a chic, minimalist setting with a riverfront terrace.',
        distance: '0.5 miles',
        rating: 4.8,
        address: '270 Biscayne Blvd Way',
      },
      {
        name: 'Komodo',
        description: 'Three-story indoor/outdoor eatery & lounge combining Southeast Asian cuisine with a South Florida vibe.',
        distance: '0.8 miles',
        rating: 4.5,
        address: '801 Brickell Ave',
      },
      {
        name: 'CVI.CHE 105',
        description: 'Award-winning Peruvian dishes in a bustling, modern atmosphere.',
        distance: '1.2 miles',
        rating: 4.9,
        address: '105 NE 3rd Ave',
      },
      {
        name: 'Mandolin Aegean Bistro',
        description: 'Authentic Greek and Turkish cuisine served in a charming 1940s home with outdoor seating.',
        distance: '2.5 miles',
        rating: 4.7,
        address: '4312 NE 2nd Ave',
      },
    ],
  },
  {
    id: 'schools',
    label: 'Schools',
    items: [
      {
        name: 'Southside Elementary Museums Magnet School',
        description: 'Top-rated public elementary school focusing on museum studies.',
        distance: '1.0 miles',
        rating: 4.5,
        address: '45 SW 13th St',
      },
      {
        name: 'iPrep Academy',
        description: 'Innovative magnet high school with a focus on technology and leadership.',
        distance: '1.5 miles',
        rating: 4.8,
        address: '1500 Biscayne Blvd',
      },
      {
        name: 'Ransom Everglades School',
        description: 'Prestigious private college preparatory day school.',
        distance: '4.0 miles',
        rating: 5.0,
        address: '3575 Main Hwy',
      },
    ],
  },
  {
    id: 'hospitals',
    label: 'Hospitals',
    items: [
      {
        name: 'Mount Sinai Medical Center',
        description: 'Full-service hospital and medical center known for cardiac care.',
        distance: '4.5 miles',
        rating: 4.6,
        address: '4300 Alton Rd',
      },
      {
        name: 'Jackson Memorial Hospital',
        description: 'Major teaching hospital and referral center.',
        distance: '2.0 miles',
        rating: 4.2,
        address: '1611 NW 12th Ave',
      },
      {
        name: 'Baptist Health Urgent Care',
        description: 'Convenient urgent care facility for non-life-threatening conditions.',
        distance: '0.8 miles',
        rating: 4.7,
        address: 'Brickell City Centre',
      },
    ],
  },
  {
    id: 'playgrounds',
    label: 'Playgrounds & Parks',
    items: [
      {
        name: 'Bayfront Park',
        description: 'Large urban park with a playground, amphitheater, and waterfront views.',
        distance: '0.3 miles',
        rating: 4.6,
        address: '301 Biscayne Blvd',
      },
      {
        name: 'Margaret Pace Park',
        description: 'Waterfront park featuring tennis courts, basketball, and a playground.',
        distance: '1.8 miles',
        rating: 4.7,
        address: '1745 N Bayshore Dr',
      },
      {
        name: 'Simpson Park',
        description: 'Nature preserve with walking trails and native plants.',
        distance: '1.1 miles',
        rating: 4.5,
        address: '55 SW 17th Rd',
      },
    ],
  },
];
