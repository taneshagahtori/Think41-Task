"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RentalFormData {
  userId: string
  carId: string
  startDate: string
  endDate: string
}

export default function NewRental() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RentalFormData>()

  const onSubmit = async (data: RentalFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit rental")
      }

      router.push("/rentals")
    } catch (error) {
      setSubmitError("An error occurred while submitting the rental. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">New Rental</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="userId">User</Label>
          <Controller
            name="userId"
            control={control}
            rules={{ required: "User is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">User 1</SelectItem>
                  <SelectItem value="2">User 2</SelectItem>
                  <SelectItem value="3">User 3</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>}
        </div>

        <div>
          <Label htmlFor="carId">Car</Label>
          <Controller
            name="carId"
            control={control}
            rules={{ required: "Car is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a car" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Audi A4</SelectItem>
                  <SelectItem value="2">BMW 3 Series</SelectItem>
                  <SelectItem value="3">Mercedes-Benz C-Class</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.carId && <p className="text-red-500 text-sm mt-1">{errors.carId.message}</p>}
        </div>

        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: "Start date is required" }}
            render={({ field }) => <Input type="date" {...field} />}
          />
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
        </div>

        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: "End date is required",
              validate: (value, formValues) =>
                new Date(value) > new Date(formValues.startDate) || "End date must be after start date",
            }}
            render={({ field }) => <Input type="date" {...field} />}
          />
          {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
        </div>

        {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Rental"}
        </Button>
      </form>
    </div>
  )
}

