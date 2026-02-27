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
  deal?: "great" | "good" | "fair"
}

export const rvTypes = [
  { value: "class-a", label: "Class A" },
  { value: "class-b", label: "Class B" },
  { value: "class-c", label: "Class C" },
  { value: "travel-trailer", label: "Travel Trailer" },
  { value: "fifth-wheel", label: "Fifth Wheel" },
  { value: "toy-hauler", label: "Toy Hauler" },
]

type Coordinates = {
  lat: number
  lng: number
}

const CITY_COORDINATES: Record<string, Coordinates> = {
  "denver, co": { lat: 39.7392, lng: -104.9903 },
  "austin, tx": { lat: 30.2672, lng: -97.7431 },
  "phoenix, az": { lat: 33.4484, lng: -112.074 },
  "nashville, tn": { lat: 36.1627, lng: -86.7816 },
  "seattle, wa": { lat: 47.6062, lng: -122.3321 },
  "las vegas, nv": { lat: 36.1699, lng: -115.1398 },
  "tampa, fl": { lat: 27.9506, lng: -82.4572 },
  "portland, or": { lat: 45.5152, lng: -122.6784 },
  "scottsdale, az": { lat: 33.4942, lng: -111.9261 },
  "charlotte, nc": { lat: 35.2271, lng: -80.8431 },
  "boulder, co": { lat: 40.01499, lng: -105.27055 },
  "bend, or": { lat: 44.0582, lng: -121.3153 },
  "minneapolis, mn": { lat: 44.9778, lng: -93.265 }, 
  "san antonio, tx": { lat: 29.4252, lng: -98.4946 },
  "asheville, nc": { lat: 35.5951, lng: -82.5515 },
  "kansas city, mo": { lat: 39.0997, lng: -94.5786 },
  "raleigh, nc": { lat: 35.7796, lng: -78.6382 },
  "dallas, tx": { lat: 32.7767, lng: -96.797 },
  "boise, id": { lat: 43.615, lng: -116.2023 },
  "salt lake city, ut": { lat: 40.7608, lng: -111.891 },
  "moab, ut": { lat: 38.5733, lng: -109.5498 },
  "tucson, az": { lat: 32.2226, lng: -110.9747 },
  "orlando, fl": { lat: 28.5383, lng: -81.3792 },
  "san diego, ca": { lat: 32.7157, lng: -117.1611 },
}

function normalizeLocationKey(value: string): string {
  return value.trim().toLowerCase()
}

function haversineMiles(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const R = 3958.8 // Earth radius in miles
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)

  const sinDLat = Math.sin(dLat / 2)
  const sinDLng = Math.sin(dLng / 2)

  const h =
    sinDLat * sinDLat +
    Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
  return R * c
}

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
    seller: { name: "John D.", phone: "(555) 123-4567", email: "john@example.com", memberSince: "2022" },
    createdAt: "2024-01-15",
    featured: true,
    deal: "good",
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
    seller: { name: "Sarah M.", phone: "(555) 234-5678", email: "sarah@example.com", memberSince: "2021" },
    createdAt: "2024-01-10",
    featured: true,
  },
  {
    id: "3",
    title: "2021 Thor Motor Coach Four Winds 28Z",
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
    seller: { name: "Mike R.", phone: "(555) 345-6789", email: "mike@example.com", memberSince: "2020" },
    createdAt: "2024-01-08",
    featured: false,
    deal: "great",
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
    seller: { name: "Lisa T.", phone: "(555) 456-7890", email: "lisa@example.com", memberSince: "2023" },
    createdAt: "2024-01-20",
    featured: true,
    deal: "good",
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
    seller: { name: "David K.", phone: "(555) 567-8901", email: "david@example.com", memberSince: "2019" },
    createdAt: "2024-01-05",
    featured: false,
    deal: "great",
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
    seller: { name: "Chris B.", phone: "(555) 678-9012", email: "chris@example.com", memberSince: "2022" },
    createdAt: "2024-01-18",
    featured: true,
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
    seller: { name: "Patricia W.", phone: "(555) 789-0123", email: "patricia@example.com", memberSince: "2018" },
    createdAt: "2024-01-12",
    featured: false,
    deal: "good",
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
    seller: { name: "Amy S.", phone: "(555) 890-1234", email: "amy@example.com", memberSince: "2021" },
    createdAt: "2024-01-22",
    featured: false,
  },
  {
    id: "9",
    title: "2024 Tiffin Allegro RED 340 38 LL",
    price: 349000,
    year: 2024,
    make: "Tiffin",
    model: "Allegro RED 340 38 LL",
    type: "class-a",
    typeName: "Class A",
    mileage: 1200,
    length: 40,
    sleeps: 6,
    location: "Scottsdale, AZ",
    description: "Top-of-the-line Tiffin diesel pusher. Full-body paint, Freightliner chassis, Cummins diesel. Residential finishes throughout.",
    features: ["Diesel Pusher", "Full Paint", "Washer/Dryer", "Residential Fridge", "King Bed", "Power Awning"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Robert & Linda C.", phone: "(555) 111-2233", email: "robert@example.com", memberSince: "2020" },
    createdAt: "2024-02-01",
    featured: true,
    deal: "great",
  },
  {
    id: "10",
    title: "2018 Forest River Georgetown 36B5",
    price: 112000,
    year: 2018,
    make: "Forest River",
    model: "Georgetown 36B5",
    type: "class-a",
    typeName: "Class A",
    mileage: 42000,
    length: 37,
    sleeps: 8,
    location: "Charlotte, NC",
    description: "Bunkhouse Class A perfect for large families. Two full bathrooms, five slide-outs, and a spacious living area.",
    features: ["Bunkhouse", "Dual Bathrooms", "5 Slide Outs", "Outdoor Kitchen", "Generator", "Backup Camera"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "James H.", phone: "(555) 222-3344", email: "james@example.com", memberSince: "2019" },
    createdAt: "2024-01-28",
    featured: false,
    deal: "good",
  },
  {
    id: "11",
    title: "2023 Winnebago Revel 44E",
    price: 198000,
    year: 2023,
    make: "Winnebago",
    model: "Revel 44E",
    type: "class-b",
    typeName: "Class B",
    mileage: 6500,
    length: 19,
    sleeps: 2,
    location: "Boulder, CO",
    description: "4x4 adventure van built on Mercedes Sprinter chassis. Hydronic heating, lithium batteries, and pop-up penthouse bed.",
    features: ["4x4 Drive", "Lithium Batteries", "Hydronic Heat", "Pop-Up Bed", "Solar Panels", "Outdoor Shower"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Jake & Emma T.", phone: "(555) 333-4455", email: "jake@example.com", memberSince: "2023" },
    createdAt: "2024-02-05",
    featured: true,
    deal: "great",
  },
  {
    id: "12",
    title: "2021 Storyteller Overland Mode 4x4",
    price: 175000,
    year: 2021,
    make: "Storyteller Overland",
    model: "Mode 4x4",
    type: "class-b",
    typeName: "Class B",
    mileage: 28000,
    length: 19,
    sleeps: 2,
    location: "Bend, OR",
    description: "Overland-ready Class B with GrooveLounge convertible seating, Halo solar system, and off-grid capability for weeks.",
    features: ["4x4 Drive", "Solar Package", "Off-Grid Ready", "Outdoor Shower", "Roof Rack", "Bike Rack"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Hannah M.", phone: "(555) 444-5566", email: "hannah@example.com", memberSince: "2022" },
    createdAt: "2024-01-30",
    featured: false,
  },
  {
    id: "13",
    title: "2022 Jayco Greyhawk 29MV",
    price: 119000,
    year: 2022,
    make: "Jayco",
    model: "Greyhawk 29MV",
    type: "class-c",
    typeName: "Class C",
    mileage: 15000,
    length: 31,
    sleeps: 7,
    location: "Minneapolis, MN",
    description: "Murphy bed floor plan frees up massive living space. JRide Plus suspension for a smooth ride. Full-wall slide.",
    features: ["Murphy Bed", "Full-Wall Slide", "Power Awning", "Backup Camera", "Generator", "Leveling Jacks"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Kevin P.", phone: "(555) 555-6677", email: "kevin@example.com", memberSince: "2021" },
    createdAt: "2024-02-10",
    featured: false,
    deal: "good",
  },
  {
    id: "14",
    title: "2020 Entegra Coach Odyssey 31F",
    price: 98500,
    year: 2020,
    make: "Entegra Coach",
    model: "Odyssey 31F",
    type: "class-c",
    typeName: "Class C",
    mileage: 31000,
    length: 32,
    sleeps: 6,
    location: "San Antonio, TX",
    description: "Premium Class C with Entegra quality. Heated holding tanks, Onan generator, and full-body paint make this a standout.",
    features: ["Full Paint", "Heated Tanks", "Generator", "Power Awning", "TV/DVD", "Rear Bedroom"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Maria G.", phone: "(555) 666-7788", email: "maria@example.com", memberSince: "2020" },
    createdAt: "2024-01-25",
    featured: false,
    deal: "great",
  },
  {
    id: "15",
    title: "2024 Airstream Basecamp 20X",
    price: 52900,
    year: 2024,
    make: "Airstream",
    model: "Basecamp 20X",
    type: "travel-trailer",
    typeName: "Travel Trailer",
    mileage: 0,
    length: 20,
    sleeps: 2,
    location: "Asheville, NC",
    description: "Brand new Airstream Basecamp with rear hatch for gear loading. Iconic aluminum body, modern interior, and adventure-ready design.",
    features: ["Aluminum Body", "Rear Hatch", "Solar Ready", "Wet Bath", "USB Ports", "LED Lighting"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Dealer: Airstream of NC", phone: "(555) 777-8899", email: "dealer@example.com", memberSince: "2018" },
    createdAt: "2024-02-15",
    featured: true,
  },
  {
    id: "16",
    title: "2019 Coachmen Catalina Legacy 293RLTS",
    price: 27500,
    year: 2019,
    make: "Coachmen",
    model: "Catalina Legacy 293RLTS",
    type: "travel-trailer",
    typeName: "Travel Trailer",
    mileage: 0,
    length: 34,
    sleeps: 6,
    location: "Kansas City, MO",
    description: "Spacious rear living travel trailer at an incredible price. Three slide-outs, fireplace, and theater seating.",
    features: ["Fireplace", "Theater Seating", "3 Slide Outs", "Outdoor Kitchen", "Power Tongue Jack", "LED Lighting"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Tom W.", phone: "(555) 888-9900", email: "tom@example.com", memberSince: "2019" },
    createdAt: "2024-01-18",
    featured: false,
    deal: "great",
  },
  {
    id: "17",
    title: "2023 Winnebago Minnie 2500FL",
    price: 38900,
    year: 2023,
    make: "Winnebago",
    model: "Minnie 2500FL",
    type: "travel-trailer",
    typeName: "Travel Trailer",
    mileage: 0,
    length: 28,
    sleeps: 4,
    location: "Raleigh, NC",
    description: "Front living room layout with dual recliners and panoramic windows. Lightweight NXG frame is easy to tow.",
    features: ["Front Living Room", "Power Awning", "Solar Ready", "Bluetooth Stereo", "Outside Shower", "USB Ports"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Stacy F.", phone: "(555) 999-0011", email: "stacy@example.com", memberSince: "2023" },
    createdAt: "2024-02-08",
    featured: false,
    deal: "good",
  },
  {
    id: "18",
    title: "2024 Grand Design Solitude 390RK",
    price: 98000,
    year: 2024,
    make: "Grand Design",
    model: "Solitude 390RK",
    type: "fifth-wheel",
    typeName: "Fifth Wheel",
    mileage: 0,
    length: 42,
    sleeps: 4,
    location: "Dallas, TX",
    description: "Full-time living fifth wheel with rear kitchen. Residential appliances, washer/dryer prep, and massive storage.",
    features: ["Rear Kitchen", "Residential Fridge", "Washer/Dryer Prep", "Auto Level", "Solar Package", "Fireplace"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Dealer: RV Nation TX", phone: "(555) 101-2020", email: "rvnation@example.com", memberSince: "2017" },
    createdAt: "2024-02-12",
    featured: true,
  },
  {
    id: "19",
    title: "2021 Keystone Montana 3761FL",
    price: 68000,
    year: 2021,
    make: "Keystone",
    model: "Montana 3761FL",
    type: "fifth-wheel",
    typeName: "Fifth Wheel",
    mileage: 0,
    length: 40,
    sleeps: 6,
    location: "Boise, ID",
    description: "Front living room fifth wheel with fireplace and theater seating. Four-season insulation for all-weather camping.",
    features: ["Front Living Room", "Fireplace", "Theater Seating", "4-Season Insulation", "King Bed", "Generator Prep"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Bill & Sue N.", phone: "(555) 202-3030", email: "bill@example.com", memberSince: "2020" },
    createdAt: "2024-01-22",
    featured: false,
    deal: "great",
  },
  {
    id: "20",
    title: "2022 Alliance Paradigm 390MP",
    price: 85000,
    year: 2022,
    make: "Alliance",
    model: "Paradigm 390MP",
    type: "fifth-wheel",
    typeName: "Fifth Wheel",
    mileage: 0,
    length: 43,
    sleeps: 8,
    location: "Salt Lake City, UT",
    description: "Mid-profile fifth wheel with incredible storage and a massive front master suite. Six-point auto level included.",
    features: ["Auto Level", "King Bed", "Washer/Dryer", "Residential Fridge", "Solar Package", "Outdoor Kitchen"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Rick D.", phone: "(555) 303-4040", email: "rick@example.com", memberSince: "2022" },
    createdAt: "2024-02-01",
    featured: false,
    deal: "good",
  },
  {
    id: "21",
    title: "2023 Grand Design Momentum 397THS",
    price: 115000,
    year: 2023,
    make: "Grand Design",
    model: "Momentum 397THS",
    type: "toy-hauler",
    typeName: "Toy Hauler",
    mileage: 0,
    length: 43,
    sleeps: 10,
    location: "Moab, UT",
    description: "High-end toy hauler with 12ft garage, happi-jac bed system, and residential amenities throughout.",
    features: ["12ft Garage", "Happi-Jac Beds", "Residential Fridge", "Fireplace", "Ramp Door Patio", "Generator"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Tyler & Jess K.", phone: "(555) 404-5050", email: "tyler@example.com", memberSince: "2023" },
    createdAt: "2024-02-14",
    featured: true,
    deal: "good",
  },
  {
    id: "22",
    title: "2020 Keystone Fuzion 424",
    price: 72000,
    year: 2020,
    make: "Keystone",
    model: "Fuzion 424",
    type: "toy-hauler",
    typeName: "Toy Hauler",
    mileage: 0,
    length: 44,
    sleeps: 8,
    location: "Tucson, AZ",
    description: "Massive toy hauler with side patio, loft, and full-size kitchen. Perfect for hauling UTVs and weekend adventures.",
    features: ["Side Patio", "Loft", "Dual AC", "Generator Prep", "Fuel Station", "Outside Shower"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Derek M.", phone: "(555) 505-6060", email: "derek@example.com", memberSince: "2021" },
    createdAt: "2024-01-27",
    featured: false,
    deal: "great",
  },
  {
    id: "23",
    title: "2017 Fleetwood Bounder 36Y",
    price: 99500,
    year: 2017,
    make: "Fleetwood",
    model: "Bounder 36Y",
    type: "class-a",
    typeName: "Class A",
    mileage: 52000,
    length: 37,
    sleeps: 6,
    location: "Orlando, FL",
    description: "Well-loved Class A with new tires and recent service. Three slides, bunk beds, and a massive basement storage.",
    features: ["Bunkhouse", "3 Slide Outs", "Generator", "Leveling Jacks", "Backup Camera", "Power Awning"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Sandra L.", phone: "(555) 606-7070", email: "sandra@example.com", memberSince: "2018" },
    createdAt: "2024-02-03",
    featured: false,
    deal: "great",
  },
  {
    id: "24",
    title: "2024 Thor Sanctuary 19P",
    price: 159000,
    year: 2024,
    make: "Thor",
    model: "Sanctuary 19P",
    type: "class-b",
    typeName: "Class B",
    mileage: 800,
    length: 19,
    sleeps: 2,
    location: "San Diego, CA",
    description: "Brand new 2024 Thor Sanctuary on Mercedes Sprinter. Eco-friendly with 400W solar standard and lithium batteries.",
    features: ["Lithium Batteries", "Solar Panels", "Mercedes Chassis", "Wet Bath", "Swivel Seats", "Shore Power"],
    images: ["/images/rv-hero.jpg"],
    seller: { name: "Dealer: SoCal Vans", phone: "(555) 707-8080", email: "socal@example.com", memberSince: "2019" },
    createdAt: "2024-02-18",
    featured: true,
  },
]

export function getRVById(id: string): RVListing | undefined {
  return rvListings.find(rv => rv.id === id)
}

export function getFeaturedRVs(): RVListing[] {
  return rvListings.filter(rv => rv.featured)
}

export interface SearchFilters {
  query?: string
  type?: string
  minPrice?: number
  maxPrice?: number
  location?: string
  radiusMiles?: number
  minYear?: number
  maxYear?: number
  minSleeps?: number
  maxMileage?: number
  minLength?: number
  maxLength?: number
  dealOnly?: boolean
  features?: string[]
}

export function searchRVs(
  query: string,
  type?: string,
  minPrice?: number,
  maxPrice?: number
): RVListing[] {
  return filterRVs({ query, type, minPrice, maxPrice })
}

export function filterRVs(filters: SearchFilters): RVListing[] {
  return rvListings.filter(rv => {
    if (filters.query) {
      const q = filters.query.toLowerCase()
      const searchable = `${rv.title} ${rv.make} ${rv.model} ${rv.location} ${rv.description} ${rv.typeName} ${rv.features.join(" ")}`.toLowerCase()
      if (!searchable.includes(q)) return false
    }
    if (filters.type && filters.type !== "all" && rv.type !== filters.type) return false
    if (filters.minPrice && rv.price < filters.minPrice) return false
    if (filters.maxPrice && rv.price > filters.maxPrice) return false
    if (filters.location) {
      const queryKey = normalizeLocationKey(filters.location)
      const rvKey = normalizeLocationKey(rv.location)

      if (filters.radiusMiles) {
        const origin = CITY_COORDINATES[queryKey]
        const dest = CITY_COORDINATES[rvKey]

        if (origin && dest) {
          const distance = haversineMiles(origin, dest)
          if (distance > filters.radiusMiles) return false
        } else {
          // Fallback to simple text match if we don't have coordinates
          if (!rvKey.includes(queryKey)) return false
        }
      } else {
        if (!rvKey.includes(queryKey)) return false
      }
    }
    if (filters.minYear && rv.year < filters.minYear) return false
    if (filters.maxYear && rv.year > filters.maxYear) return false
    if (filters.minSleeps && rv.sleeps < filters.minSleeps) return false
    if (filters.maxMileage && rv.mileage > filters.maxMileage) return false
    if (filters.minLength && rv.length < filters.minLength) return false
    if (filters.maxLength && rv.length > filters.maxLength) return false
    if (filters.dealOnly && !rv.deal) return false
    if (filters.features && filters.features.length > 0) {
      const rvFeatsLower = rv.features.map(f => f.toLowerCase())
      if (!filters.features.every(f => rvFeatsLower.some(rf => rf.includes(f.toLowerCase())))) return false
    }
    return true
  })
}

export function getAllFeatures(): string[] {
  const featureSet = new Set<string>()
  rvListings.forEach(rv => rv.features.forEach(f => featureSet.add(f)))
  return Array.from(featureSet).sort()
}
