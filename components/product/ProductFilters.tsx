"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Category } from "@/types/product"
import { useState, useEffect } from "react"

interface ProductFiltersProps {
  categories: Category[]
  onFilterChange: (filters: { categorySlugs: string[]; minPrice?: number; maxPrice?: number }) => void
  initialCategorySlugs?: string[]
}

export default function ProductFilters({ categories, onFilterChange, initialCategorySlugs = [] }: ProductFiltersProps) {
  const [selectedCategorySlugs, setSelectedCategorySlugs] = useState<string[]>(initialCategorySlugs)

  useEffect(() => {
    setSelectedCategorySlugs(initialCategorySlugs)
  }, [initialCategorySlugs])

  const handleCategoryChange = (slug: string, checked: boolean) => {
    const newSelectedCategories = checked
      ? [...selectedCategorySlugs, slug]
      : selectedCategorySlugs.filter((s) => s !== slug)
    setSelectedCategorySlugs(newSelectedCategories)
    onFilterChange({ categorySlugs: newSelectedCategories })
  }

  return (
    <div className="w-full space-y-6">
      <Accordion type="multiple" className="w-full" defaultValue={["category"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-semibold">Catégories</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {categories.map((category) => (
                <Label key={category.id} className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={selectedCategorySlugs.includes(category.slug)}
                    onCheckedChange={(checked) => handleCategoryChange(category.slug, !!checked)}
                  />
                  {category.name}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Add more filter options here, e.g., price range, color, size */}
        {/* <AccordionItem value="price">
          <AccordionTrigger className="text-base font-semibold">Prix</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <Input type="number" placeholder="Min" className="w-24" />
                <Input type="number" placeholder="Max" className="w-24" />
                <Button size="sm">Appliquer</Button>
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  )
}
