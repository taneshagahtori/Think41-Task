"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface Car {
  id: string
  name: string
  brand: string
  model: string
  year: number
  availabilityStatus: string
  imageUrl: string
  dailyRate: number
}

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch("/api/cars")
        if (!response.ok) {
          throw new Error("Failed to fetch cars")
        }
        const data = await response.json()
        setCars(data)
        setIsLoading(false)
      } catch (err) {
        setError("An error occurred while fetching cars. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [])

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Available Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Link href={`/cars/${car.id}`} key={car.id} className="block">
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={car.imageUrl || "/placeholder.svg"}
                alt={`${car.brand} ${car.name}`}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
                <p className="text-gray-600 mb-2">
                  {car.brand} {car.model} ({car.year})
                </p>
                <p
                  className={`font-semibold ${
                    car.availabilityStatus === "Available" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {car.availabilityStatus}
                </p>
                <p className="mt-2 text-lg font-bold">${car.dailyRate}/day</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

