import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Car Rental System",
  description: "Rent your dream car today",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Car Rental</h1>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-white hover:text-blue-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/cars" className="text-white hover:text-blue-200">
                  Cars
                </a>
              </li>
              <li>
                <a href="/users" className="text-white hover:text-blue-200">
                  Users
                </a>
              </li>
              <li>
                <a href="/rentals" className="text-white hover:text-blue-200">
                  Rentals
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto mt-8">{children}</main>
      </body>
    </html>
  )
}

