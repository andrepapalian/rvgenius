export interface RVListing {
  id: string
  title: string
  price: number
  year: number
  make: string
  model: string
  type: "class-a" | "class-b" | "class-c" | "travel-trailer" | "fifth-wheel" | "toy-hauler"
  typeName: string
  mileage: number
  length: number
  sleeps: number
  location: string
  description: string
  features: string[]
  images: string[]
  seller: {
    name: string
    phone: string
    email: string
    memberSince: string
  }
  createdAt: string
  featured: boolean
}

export const rvTypes = [
  { value: "class-a", label: "Class A" },
  { value: "class-b", label: "Class B" },
  { value: "class-c", label: "Class C" },
  { value: "travel-trailer", label: "Travel Trailer" },
  { value: "fifth-wheel", label: "Fifth Wheel" },
  { value: "toy-hauler", label: "Toy Hauler" },
]

export const rvListings: RVListing[] = [
  {
    id: "1",
    title: "2023 Winnebago Vista 27P",
    price: 165000,
    year: 2023,
    make: "Winnebago",
    model: "Vista 27P",
    type: "class-a",
    typeName: "Class A",
    mileage: 8500,
    length: 28,
    sleeps: 6,
    location: "Denver, CO",
    description: "Immaculate condition, barely used Class A motorhome. Features a spacious floor plan with full kitchen, queen bed, and convertible dinette. Perfect for family adventures.",
    features: ["Backup Camera", "Leveling Jacks", "Solar Panels", "Outdoor Kitchen", "Generator", "Slide Out"],
    images: ["/images/rv-hero.jpg"],
    seller: {
      name: "John D.",
      phone: "(555) 123-4567",
      email: "john@example.com",
      memberSince: "2022"
    },
    createdAt: "2024-01-15",
    featured: true
  },
  {
    id: "2",
    title: "2022 Airstream Interstate 24GT",
    price: 215000,
    year: 2022,
    make: "Airstream",
    model: "Interstate 24GT",
    type: "class-b",
    typeName: "Class B",
    mileage: 12000,
    length: 24,
    sleeps: 2,
    location: "Austin, TX",
    description: "Luxury touring coach built on Mercedes-Benz Sprinter chassis. Premium finishes throughout with Ultraleather seating and hardwood cabinetry.",
    features: ["Mercedes Chassis", "Leather Interior", "Premium Audio", "Navigation", "Solar Ready", "Rear Cameras"],
    images: ["/images/rv-hero.jpg"],
    seller: {
      name: "Sarah M.",
      phone: "(555) 234-5678",
      email: "sarah@example.com",
      memberSince: "2021"
    },
    createdAt: "2024-01-10",
    featured: true
  },
  {
    id: "3",
    title: "2021 Thor Motor Coach Four Winds",
    price: 89900,
    year: 2021,
    make: "Thor Motor Coach",
    model: "Four Winds 28Z",
    type: "class-c",
    typeName: "Class C",
    mileage: 22000,
    length: 30,
    sleeps: 8,
    location: "Phoenix, AZ",
    description: "Well-maintained Class C with over-cab sleeping area. Great for families with dual entry doors and rear bedroom. Ford E-450 chassis.",
    features: ["Over-Cab Bunk", "Dual Entry", "Rear Bedroom", "Power Awning", "TV/DVD", "Outside Shower"],
    images: ["/images/rv-hero.jpg"],
    seller: {
      name: "Mike R.",
      phone: "(555) 345-6789",
      email: "mike@example.com",
      memberSince: "2020"
    },
    createdAt: "2024-01-08",
    featured: false
  },
  {
    id: "4",
    title: "2024 Grand Design Reflection 315RLTS",
    price: 72500,
    year: 2024,
    make: "Grand Design",
    model: "Reflection 315RLTS",
    type: "fifth-wheel",
    typeName: "Fifth Wheel",
    mileage: 0,
    length: 35,
    sleeps: 4,
    location: "Nashville, TN",
    description: "Brand new fifth wheel with rear living layout. Theater seating, fireplace, and residential refrigerator. Never been used!",
    features: ["Fireplace", "Theater Seating", "Residential Fridge", "Washer/Dryer Prep", "Auto Level", "King Bed"],
    images: ["/images/rv-hero.jpg"],
    seller: {
      name: "Lisa T.",
      phone: "(555) 456-7890",
      email: "lisa@example.com",
      memberSince: "2023"
    },
    createdAt: "2024-01-20",
    featured: true
  },
  {
    id: "5",
    title: "2020 Keystone Passport 2670BH",
    price: 32000,
    year: 2020,
    make: "Keystone",
    model: "Passport 2670BH",
    type: "travel-trailer",
    typeName: "Travel Trailer",
    mileage: 0,
    length: 30,
    sleeps: 10,
    location: "Seattle, WA",
    description: "Family-friendly travel trailer with bunkhouse. Lightweight design that's easy to tow. Perfect condition with all features working.",
    features: ["Bunkhouse", "Outdoor Kitchen", "Power Tongue Jack", "LED Lighting", "USB Ports", "Bluetooth Stereo"],
    images: ["/images/rv-hero.jpg"],
    seller: {
      name: "David K.",
      phone: "(555) 567-8901",
      email: "david@example.com",
      memberSince: "2019"
    },
    createdAt: "2024-01-05",
    featured: false
  },
  {
    id: "6",
    title: "2023 Heartland Road Warrior 413",
    price: 95000,
    year: 2023,
    make: "Heartland",
    model: "Road Warrior 413",
    type: "toy-hauler",
    typeName: "Toy Hauler",
    mileage: 0,
    length: 44,
    sleeps: 8,
    location: "Las Vegas, NV",
    description: "Ultimate toy hauler with 13ft garage. Perfect for bringing your ATVs, motorcycles, or side-by-sides on your adventures.",
    features: ["13ft Garage", "Fuel Station", "Generator", "Ramp Door Patio", "Dual AC", "Washer/Dryer"],
    images: ["/images/rv-hero.jpg"],
    seller: {
      name: "Chris B.",
      phone: "(555) 678-9012",
      email: "chris@example.com",
      memberSince: "2022"
    },
    createdAt: "2024-01-18",
    featured: true
  },
  {
    id: "7",
    title: "2019 Newmar Dutch Star 4369",
    price: 285000,
    year: 2019,
    make: "Newmar",
    model: "Dutch Star 4369",
    type: "class-a",
    typeName: "Class A",
    mileage: 35000,
    length: 44,
    sleeps: 4,
    location: "Tampa, FL",
    description: "Luxury diesel pusher with full paint and all the amenities. King bed, residential appliances, and premium entertainment system.",
    features: ["Diesel Pusher", "Full Paint", "King Bed", "Washer/Dryer", "Aqua-Hot", "Dishwasher"],
    images: ["/images/rv-hero.jpg"],
    seller: {
      name: "Patricia W.",
      phone: "(555) 789-0123",
      email: "patricia@example.com",
      memberSince: "2018"
    },
    createdAt: "2024-01-12",
    featured: false
  },
  {
    id: "8",
    title: "2022 Coachmen Beyond 22C",
    price: 145000,
    year: 2022,
    make: "Coachmen",
    model: "Beyond 22C",
    type: "class-b",
    typeName: "Class B",
    mileage: 18000,
    length: 22,
    sleeps: 2,
    location: "Portland, OR",
    description: "Compact and versatile Class B van perfect for couples. Easy to drive and park anywhere. Excellent fuel economy.",
    features: ["Pop-Top Roof", "Wet Bath", "Swivel Seats", "Solar Package", "Shore Power", "Propane Furnace"],
    images: ["/images/rv-hero.jpg"],
    seller: {
      name: "Amy S.",
      phone: "(555) 890-1234",
      email: "amy@example.com",
      memberSince: "2021"
    },
    createdAt: "2024-01-22",
    featured: false
  }
]

export function getRVById(id: string): RVListing | undefined {
  return rvListings.find(rv => rv.id === id)
}

export function getFeaturedRVs(): RVListing[] {
  return rvListings.filter(rv => rv.featured)
}

export function searchRVs(query: string, type?: string, minPrice?: number, maxPrice?: number): RVListing[] {
  return rvListings.filter(rv => {
    const matchesQuery = !query || 
      rv.title.toLowerCase().includes(query.toLowerCase()) ||
      rv.make.toLowerCase().includes(query.toLowerCase()) ||
      rv.model.toLowerCase().includes(query.toLowerCase()) ||
      rv.location.toLowerCase().includes(query.toLowerCase())
    
    const matchesType = !type || type === "all" || rv.type === type
    const matchesMinPrice = !minPrice || rv.price >= minPrice
    const matchesMaxPrice = !maxPrice || rv.price <= maxPrice
    
    return matchesQuery && matchesType && matchesMinPrice && matchesMaxPrice
  })
}
