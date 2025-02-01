import Link from "next/link"

export default function Rentals() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Rental Records</h1>
      <Link href="/rentals/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        New Rental
      </Link>
      <p className="mt-4">Rental records will be displayed here.</p>
    </div>
  )
}

