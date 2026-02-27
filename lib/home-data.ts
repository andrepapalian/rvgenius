export const rvCategories = [
  { id: "travel-trailer", label: "Travel Trailers", image: "/images/categories/travel-trailer.jpg" },
  { id: "fifth-wheel", label: "Fifth Wheels", image: "/images/categories/fifth-wheel.jpg" },
  { id: "toy-hauler", label: "Toy Haulers", image: "/images/categories/toy-hauler.jpg" },
  { id: "class-a", label: "Class A", image: "/images/categories/class-a.jpg" },
  { id: "class-b", label: "Class B", image: "/images/categories/class-b.jpg" },
  { id: "class-c", label: "Class C", image: "/images/categories/class-c.jpg" },
]

export const testimonials = [
  {
    name: "Sarah & Mike Johnson",
    location: "Denver, CO",
    image: "/images/couple-rv.jpg",
    quote: "Found our dream Class B in just two weeks. The budget calculator helped us know exactly what we could afford!",
    rating: 5,
  },
  {
    name: "The Martinez Family",
    location: "Austin, TX",
    image: "/images/family-rv.jpg",
    quote: "We sold our travel trailer in 3 days and got more than we expected. The process was so simple.",
    rating: 5,
  },
  {
    name: "Robert & Linda Chen",
    location: "Phoenix, AZ",
    image: "/images/retired-couple-rv.jpg",
    quote: "After retiring, we found the perfect fifth wheel for full-time living. RVMarket made it easy to compare options.",
    rating: 5,
  },
]

export const PRICE_PRESETS = [
  { value: "", label: "No min" },
  { value: "10000", label: "$10,000" },
  { value: "25000", label: "$25,000" },
  { value: "50000", label: "$50,000" },
  { value: "75000", label: "$75,000" },
  { value: "100000", label: "$100,000" },
  { value: "150000", label: "$150,000" },
  { value: "200000", label: "$200,000" },
  { value: "300000", label: "$300,000" },
]

export const MAX_PRICE_PRESETS = [
  { value: "", label: "No max" },
  { value: "25000", label: "$25,000" },
  { value: "50000", label: "$50,000" },
  { value: "75000", label: "$75,000" },
  { value: "100000", label: "$100,000" },
  { value: "150000", label: "$150,000" },
  { value: "200000", label: "$200,000" },
  { value: "300000", label: "$300,000" },
  { value: "400000", label: "$400,000+" },
]

export const yearOptions = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017]

export const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "year-new", label: "Year: newest" },
  { value: "year-old", label: "Year: oldest" },
  { value: "mileage", label: "Mileage: lowest" },
]

export const sleepsOptions = [
  { value: "", label: "Any" },
  { value: "2", label: "2+" },
  { value: "4", label: "4+" },
  { value: "6", label: "6+" },
  { value: "8", label: "8+" },
]
