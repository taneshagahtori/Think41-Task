import { NextResponse } from "next/server"

const audiCar = {
  id: "audi-a4-2023",
  brand: "Audi",
  model: "A4",
  year: 2023,
  availabilityStatus: "Available",
  imageUrl: "/placeholder.svg?height=300&width=500",
  description:
    "The Audi A4 is a line of compact executive cars produced since 1994 by the German car manufacturer Audi, a subsidiary of the Volkswagen Group.",
}

export async function GET() {
  // Simulating a slight delay to mimic a real API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return NextResponse.json(audiCar)
}

