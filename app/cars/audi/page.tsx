import Image from "next/image"
import { notFound } from "next/navigation"

async function getAudiDetails() {
  // In a real-world scenario, you might want to use environment variables for the base URL
  const res = await fetch("http://localhost:3000/api/cars/audi", { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch car data")
  }
  return res.json()
}

export default async function AudiDetails() {
  let car
  try {
    car = await getAudiDetails()
  } catch (error) {
    console.error("Error fetching Audi details:", error)
    return <div>Error loading car details. Please try again later.</div>
  }

  if (!car) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {car.brand} {car.model} Details
      </h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={car.imageUrl || "/placeholder.svg"}
          alt={`${car.brand} ${car.model}`}
          width={500}
          height={300}
          className="w-full h-64 object-cover object-center"
        />
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
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
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

