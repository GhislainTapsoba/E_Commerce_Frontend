"use client"

import Link from "next/link"
import { Package2, Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/hooks/useCart"
import MobileMenu from "./MobileMenu"
import Navigation from "./Navigation"

export default function Header() {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <MobileMenu />
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Package2 className="h-6 w-6" />
          <span className="font-bold text-lg">ECMS</span>
        </Link>
        <Navigation className="hidden md:flex" />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher des produits..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/panier">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Panier</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
