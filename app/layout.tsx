import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import WhatsAppButton from "@/components/common/WhatsAppButton"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "ECMS - Votre E-commerce Optimisé",
    template: "%s | ECMS",
  },
  description:
    "Découvrez nos produits de qualité et commandez en ligne facilement. Site e-commerce optimisé avec Next.js, Strapi et Laravel.",
  keywords: ["e-commerce", "produits", "boutique en ligne", "Next.js", "Strapi", "Laravel"],
  openGraph: {
    title: "ECMS - Votre E-commerce Optimisé",
    description: "Découvrez nos produits de qualité et commandez en ligne facilement.",
    url: "https://your-ecommerce-domain.com", // Replace with your actual domain
    siteName: "ECMS",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200&text=ECMS E-commerce", // Replace with a real image
        width: 1200,
        height: 630,
        alt: "ECMS E-commerce",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECMS - Votre E-commerce Optimisé",
    description: "Découvrez nos produits de qualité et commandez en ligne facilement.",
    images: ["/placeholder.svg?height=630&width=1200&text=ECMS E-commerce"], // Replace with a real image
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton phoneNumber="22605929883" /> {/* Replace with actual WhatsApp number */}
        </div>
      </body>
    </html>
  )
}
