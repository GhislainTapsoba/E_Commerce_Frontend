import { NextResponse } from "next/server"
import { subscribeToNewsletter } from "@/lib/api/laravel"
import { newsletterSchema } from "@/lib/utils/validation"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email using Zod
    const validationResult = newsletterSchema.safeParse({ email })
    if (!validationResult.success) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 })
    }

    const response = await subscribeToNewsletter(email)
    return NextResponse.json({ message: "Subscription successful", data: response }, { status: 200 })
  } catch (error: any) {
    console.error("Error in /api/newsletter:", error)
    return NextResponse.json({ message: error.message || "Failed to subscribe to newsletter" }, { status: 500 })
  }
}
