import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const rentalData = await request.json()

    // Here you would typically save the rental data to a database
    // For this example, we'll just log it and return a success response
    console.log("Received rental data:", rentalData)

    return NextResponse.json({ message: "Rental submitted successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error processing rental:", error)
    return NextResponse.json({ error: "Failed to process rental" }, { status: 500 })
  }
}

