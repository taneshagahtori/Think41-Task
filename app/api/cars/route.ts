import { NextResponse } from "next/server"

const cars = [
  {
    id: "1",
    name: "A4",
    brand: "Audi",
    model: "2023",
    year: 2023,
    availabilityStatus: "Available",
    imageUrl: "/placeholder.svg?height=300&width=500",
    description:
      "The Audi A4 is a line of compact executive cars produced since 1994 by the German car manufacturer Audi, a subsidiary of the Volkswagen Group.",
    dailyRate: 89,
  },
  {
    id: "2",
    name: "3 Series",
    brand: "BMW",
    model: "2023",
    year: 2023,
    availabilityStatus: "Available",
    imageUrl: "/placeholder.svg?height=300&width=500",
    description:
      "The BMW 3 Series is a line of compact executive cars manufactured by the German automaker BMW since May 1975.",
    dailyRate: 95,
  },
  {
    id: "3",
    name: "C-Class",
    brand: "Mercedes-Benz",
    model: "2023",
    year: 2023,
    availabilityStatus: "Unavailable",
    imageUrl: "/placeholder.svg?height=300&width=500",
    description: "The Mercedes-Benz C-Class is a series of compact executive cars produced by Mercedes-Benz Group AG.",
    dailyRate: 99,
  },
]

export async function GET() {
  return NextResponse.json(cars)
}

