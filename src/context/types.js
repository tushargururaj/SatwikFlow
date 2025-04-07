
// Shared type definitions for context data

// Farmer types
export const FARMER_INITIAL_DATA = [
  { 
    id: 1, 
    name: "Sita Devi", 
    village: "A", 
    landSize: "2",
    crops: ["Wheat", "Chili"],
    lastUpdate: "April 3, 2025",
    notes: "Has been farming for 15 years. Specializes in organic farming techniques."
  },
  { 
    id: 2, 
    name: "Mohan Singh", 
    village: "B", 
    landSize: "3.5",
    crops: ["Rice", "Wheat"],
    lastUpdate: "April 1, 2025",
    notes: "Recently resolved pest issues in wheat crop."
  },
  { 
    id: 3, 
    name: "Rajesh Patel", 
    village: "C", 
    landSize: "1.5",
    crops: ["Chili", "Tomato"],
    lastUpdate: "April 2, 2025",
    notes: "First-generation farmer. Started farming 5 years ago."
  },
  { 
    id: 4, 
    name: "Lata Kumari", 
    village: "A", 
    landSize: "2.2",
    crops: ["Onion", "Potato"],
    lastUpdate: "March 30, 2025",
    notes: "Specializes in root vegetables. Uses traditional farming methods."
  },
  { 
    id: 5, 
    name: "Santosh Kumar", 
    village: "D", 
    landSize: "4",
    crops: ["Rice", "Wheat", "Corn"],
    lastUpdate: "March 28, 2025",
    notes: "Has the largest farm in the district. Uses modern machinery."
  }
];

// Updates types
export const UPDATES_INITIAL_DATA = [
  { 
    id: 1,
    farmerId: 1,
    farmerName: "Sita Devi",
    date: "April 3, 2025",
    crops: [
      { name: "Chili", quantity: 10 },
      { name: "Wheat", quantity: 12 }
    ],
    notes: "Good quality harvest"
  },
  { 
    id: 2,
    farmerId: 2,
    farmerName: "Mohan Singh",
    date: "April 2, 2025",
    crops: [],
    notes: "Pest issue resolved. Wheat crop recovery in progress."
  },
  { 
    id: 3,
    farmerId: 3,
    farmerName: "Rajesh Patel",
    date: "April 1, 2025",
    crops: [
      { name: "Wheat", quantity: 15 }
    ],
    notes: "Will deliver tomorrow"
  }
];

// Active crops types
export const ACTIVE_CROPS_INITIAL_DATA = [
  {
    id: 1,
    farmerId: 1,
    farmerName: "Sita Devi",
    cropName: "Chili",
    growthStage: "Harvesting",
    expectedQuantity: "10",
    expectedHarvestDate: new Date(2025, 3, 10),
    notes: "Ready for harvest"
  },
  {
    id: 2,
    farmerId: 1,
    farmerName: "Sita Devi",
    cropName: "Wheat",
    growthStage: "Ripening",
    expectedQuantity: "15",
    expectedHarvestDate: new Date(2025, 3, 15),
    notes: "Good growth"
  },
  {
    id: 3,
    farmerId: 2,
    farmerName: "Mohan Singh",
    cropName: "Rice",
    growthStage: "Flowering",
    expectedQuantity: "20",
    expectedHarvestDate: new Date(2025, 3, 25),
    notes: "Needs more water"
  }
];

// Consumer orders types
export const CONSUMER_ORDERS_INITIAL_DATA = [
  { 
    id: 'ORD-005', 
    date: 'April 2, 2025', 
    items: [{ crop: 'Tomato', quantity: '5' }],
    status: 'Processing',
    deliveryDate: 'April 8, 2025'
  },
  { 
    id: 'ORD-004', 
    date: 'March 27, 2025', 
    items: [{ crop: 'Potato', quantity: '3' }, { crop: 'Onion', quantity: '2' }],
    status: 'Delivered',
    deliveryDate: 'April 1, 2025'
  },
  { 
    id: 'ORD-003', 
    date: 'March 15, 2025', 
    items: [{ crop: 'Brinjal', quantity: '2' }],
    status: 'Delivered',
    deliveryDate: 'March 20, 2025'
  }
];

// Community data types
export const CONSUMER_CONTRIBUTIONS_INITIAL_DATA = [
  { 
    id: 'PO-001',
    orderId: 'CO-008',
    consumer: { name: 'Sunita Sharma', id: 'C-001' },
    date: 'April 2, 2025',
    items: [{ crop: 'Tomato', quantity: '5 kg' }],
    status: 'Pending',
    fulfilled: false
  },
  { 
    id: 'PO-002',
    orderId: 'CO-008',
    consumer: { name: 'Rakesh Mehta', id: 'C-002' },
    date: 'April 3, 2025',
    items: [{ crop: 'Tomato', quantity: '3 kg' }, { crop: 'Onion', quantity: '4 kg' }],
    status: 'Pending',
    fulfilled: false
  },
  { 
    id: 'PO-003',
    orderId: 'CO-008',
    consumer: { name: 'Anita Desai', id: 'C-003' },
    date: 'April 4, 2025',
    items: [{ crop: 'Brinjal', quantity: '2 kg' }],
    status: 'Pending',
    fulfilled: false
  },
  { 
    id: 'PO-004',
    orderId: 'CO-007',
    consumer: { name: 'Sunil Kapoor', id: 'C-004' },
    date: 'April 1, 2025',
    items: [{ crop: 'Potato', quantity: '6 kg' }],
    status: 'Fulfilled',
    fulfilled: true
  }
];

export const COMMUNITY_ORDERS_INITIAL_DATA = [
  { 
    id: 'CO-008', 
    date: 'April 1, 2025', 
    items: [{ crop: 'Tomato', quantity: '8 kg' }, { crop: 'Brinjal', quantity: '2 kg' }],
    status: 'Processing',
    deliveryDate: 'April 7, 2025'
  },
  { 
    id: 'CO-007', 
    date: 'March 25, 2025', 
    items: [{ crop: 'Tomato', quantity: '10 kg' }, { crop: 'Onion', quantity: '6 kg' }],
    status: 'Delivered',
    deliveryDate: 'March 30, 2025'
  },
];

// Profile data types
export const CONSUMER_PROFILE_INITIAL_DATA = {
  name: "Sunita Sharma",
  email: "sunita.sharma@example.com",
  phone: "+91 98765 43210",
  community: "Village B",
  communityId: "COM-102",
  address: "House No. 45, Near Temple, Village B, District Nashik, Maharashtra",
  joinedDate: "January 15, 2025"
};

export const COMMUNITY_PROFILE_INITIAL_DATA = {
  name: "Village B Farmers Collective",
  id: "COM-102",
  address: "Block 2, Ward 7, Village B, District Nashik",
  region: "West Nashik Agricultural Zone",
  agent: {
    name: "Ravi Kumar",
    id: "AG-34",
    contact: "+91 98765 12345"
  },
  head: {
    name: "Rajesh Singh",
    phone: "+91 94876 43210",
    email: "rajesh_singh@villageB.org",
    alternateContact: "Seema Joshi - +91 88123 45678"
  },
  membersCount: 22,
  established: "January 10, 2024"
};

export const CONSUMER_PROFILES_INITIAL_DATA = [
  {
    id: "C-001",
    name: "Sunita Sharma",
    email: "sunita.sharma@example.com",
    phone: "+91 98765 43210",
    community: "Village B",
    communityId: "COM-102",
    address: "House No. 45, Near Temple, Village B",
    joinedDate: "January 15, 2025"
  },
  {
    id: "C-002",
    name: "Rakesh Mehta",
    email: "rakesh.mehta@example.com",
    phone: "+91 95432 10987",
    community: "Village B",
    communityId: "COM-102",
    address: "House No. 23, Main Road, Village B",
    joinedDate: "February 5, 2025"
  },
  {
    id: "C-003",
    name: "Anita Desai",
    email: "anita.desai@example.com",
    phone: "+91 87654 32109",
    community: "Village B",
    communityId: "COM-102",
    address: "Flat 3, Building 2, Village B",
    joinedDate: "March 10, 2025"
  },
  {
    id: "C-004",
    name: "Sunil Kapoor",
    email: "sunil.kapoor@example.com",
    phone: "+91 76543 21098",
    community: "Village B",
    communityId: "COM-102",
    address: "House No. 56, East Road, Village B",
    joinedDate: "January 28, 2025"
  }
];

export const NEW_CONSUMERS_INITIAL_DATA = [
  {
    id: "C-003",
    name: "Anita Desai",
    email: "anita.desai@example.com",
    phone: "+91 87654 32109",
    joinedDate: "March 10, 2025",
    community: "Village B"
  },
  {
    id: "C-005",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 67890",
    joinedDate: "March 15, 2025",
    community: "Village B"
  },
  {
    id: "C-006",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 91234 56789",
    joinedDate: "March 20, 2025",
    community: "Village B"
  }
];
