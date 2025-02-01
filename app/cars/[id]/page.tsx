"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"

interface Car {
  id: string
  name: string
  brand: string
  model: string
  year: number
  availabilityStatus: string
  imageUrl: string
  description: string
  dailyRate: number
}

export default function CarDetails() {
  const { id } = useParams()
  const [car, setCar] = useState<Car | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const response = await fetch(`/api/cars/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch car details")
        }
        const data = await response.json()
        setCar(data)
        setIsLoading(false)
      } catch (err) {
        setError("An error occurred while fetching car details. Please try again later.")
        setIsLoading(false)
      }
    }

    if (id) {
      fetchCarDetails()
    }
  }, [id])

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  if (!car) {
    return <div className="text-center mt-8">Car not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={car.imageUrl || "/placeholder.svg"}
          alt={`${car.brand} ${car.name}`}
          width={500}
          height={300}
          className="w-full h-64 object-cover object-center"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Brand</h2>
              <p className="text-gray-700">{car.brand}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Model</h2>
              <p className="text-gray-700">{car.model}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Year</h2>
              <p className="text-gray-700">{car.year}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Availability Status</h2>
              <p
                className={`font-semibold ${
                  car.availabilityStatus === "Available" ? "text-green-600" : "text-red-600"
                }`}
              >
                {car.availabilityStatus}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{car.description}</p>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">Daily Rate</h2>
              <p className="text-2xl font-bold text-blue-600">${car.dailyRate}/day</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

