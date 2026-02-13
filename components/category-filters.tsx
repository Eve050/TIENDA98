"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface CategoryFiltersProps {
  subcategories: string[]
  sizes?: string[]
  ageRanges?: string[]
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  categories: string[]
  priceRanges: string[]
  ratings: number[]
  sizes?: string[]
  ageRanges?: string[]
}

export function CategoryFilters({ subcategories, sizes, ageRanges, onFilterChange }: CategoryFiltersProps) {
  const [tempCategories, setTempCategories] = useState<string[]>([])
  const [tempPrices, setTempPrices] = useState<string[]>([])
  const [tempRatings, setTempRatings] = useState<number[]>([])
  const [tempSizes, setTempSizes] = useState<string[]>([])
  const [tempAges, setTempAges] = useState<string[]>([])

  const priceRanges = ["Menos de $50", "$50 - $100", "$100 - $200", "Más de $200"]
  const ratings = [5, 4, 3, 2]

  const handleCategoryToggle = (category: string) => {
    const newCategories = tempCategories.includes(category)
      ? tempCategories.filter((c) => c !== category)
      : [...tempCategories, category]
    setTempCategories(newCategories)
  }

  const handlePriceToggle = (price: string) => {
    const newPrices = tempPrices.includes(price) ? tempPrices.filter((p) => p !== price) : [...tempPrices, price]
    setTempPrices(newPrices)
  }

  const handleRatingToggle = (rating: number) => {
    const newRatings = tempRatings.includes(rating) ? tempRatings.filter((r) => r !== rating) : [...tempRatings, rating]
    setTempRatings(newRatings)
  }

  const handleSizeToggle = (size: string) => {
    const newSizes = tempSizes.includes(size) ? tempSizes.filter((s) => s !== size) : [...tempSizes, size]
    setTempSizes(newSizes)
  }

  const handleAgeToggle = (age: string) => {
    const newAges = tempAges.includes(age) ? tempAges.filter((a) => a !== age) : [...tempAges, age]
    setTempAges(newAges)
  }

  const applyFilters = () => {
    onFilterChange({
      categories: tempCategories,
      priceRanges: tempPrices,
      ratings: tempRatings,
      sizes: tempSizes,
      ageRanges: tempAges,
    })
  }

  const clearFilters = () => {
    setTempCategories([])
    setTempPrices([])
    setTempRatings([])
    setTempSizes([])
    setTempAges([])
    onFilterChange({
      categories: [],
      priceRanges: [],
      ratings: [],
      sizes: [],
      ageRanges: [],
    })
  }

  const hasFilters =
    tempCategories.length > 0 ||
    tempPrices.length > 0 ||
    tempRatings.length > 0 ||
    tempSizes.length > 0 ||
    tempAges.length > 0

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 sticky top-24">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 className="font-bold text-xl text-gray-900">Filtrar por</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-[#FF6B35] hover:text-white hover:bg-[#FF6B35] transition-all duration-200 gap-1"
          >
            <X className="h-4 w-4" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="mb-6">
        <h4 className="font-bold mb-4 text-sm text-gray-700 uppercase tracking-wide flex items-center gap-2">
          <div className="w-1 h-4 bg-[#FF6B35] rounded-full"></div>
          Categorías
        </h4>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {subcategories.map((sub) => (
            <label
              key={sub}
              className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
            >
              <input
                type="checkbox"
                checked={tempCategories.includes(sub)}
                onChange={() => handleCategoryToggle(sub)}
                className="w-4 h-4 rounded border-2 border-gray-300 text-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#FF6B35] transition-colors duration-200 font-medium">
                {sub}
              </span>
            </label>
          ))}
        </div>
      </div>

      {sizes && (
        <div className="mb-6">
          <h4 className="font-bold mb-4 text-sm text-gray-700 uppercase tracking-wide flex items-center gap-2">
            <div className="w-1 h-4 bg-[#FF6B35] rounded-full"></div>
            Tallas
          </h4>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {sizes.map((size) => (
              <label
                key={size}
                className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
              >
                <input
                  type="checkbox"
                  checked={tempSizes.includes(size)}
                  onChange={() => handleSizeToggle(size)}
                  className="w-4 h-4 rounded border-2 border-gray-300 text-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#FF6B35] transition-colors duration-200 font-medium">
                  {size}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {ageRanges && (
        <div className="mb-6">
          <h4 className="font-bold mb-4 text-sm text-gray-700 uppercase tracking-wide flex items-center gap-2">
            <div className="w-1 h-4 bg-[#FF6B35] rounded-full"></div>
            Edad
          </h4>
          <div className="space-y-3">
            {ageRanges.map((age) => (
              <label
                key={age}
                className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
              >
                <input
                  type="checkbox"
                  checked={tempAges.includes(age)}
                  onChange={() => handleAgeToggle(age)}
                  className="w-4 h-4 rounded border-2 border-gray-300 text-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#FF6B35] transition-colors duration-200 font-medium">
                  {age}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h4 className="font-bold mb-4 text-sm text-gray-700 uppercase tracking-wide flex items-center gap-2">
          <div className="w-1 h-4 bg-[#FF6B35] rounded-full"></div>
          Rango de Precio
        </h4>
        <div className="space-y-3">
          {priceRanges.map((price) => (
            <label
              key={price}
              className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
            >
              <input
                type="checkbox"
                checked={tempPrices.includes(price)}
                onChange={() => handlePriceToggle(price)}
                className="w-4 h-4 rounded border-2 border-gray-300 text-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#FF6B35] transition-colors duration-200 font-medium">
                {price}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold mb-4 text-sm text-gray-700 uppercase tracking-wide flex items-center gap-2">
          <div className="w-1 h-4 bg-[#FF6B35] rounded-full"></div>
          Calificación
        </h4>
        <div className="space-y-3">
          {ratings.map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
            >
              <input
                type="checkbox"
                checked={tempRatings.includes(rating)}
                onChange={() => handleRatingToggle(rating)}
                className="w-4 h-4 rounded border-2 border-gray-300 text-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm flex items-center gap-1 text-gray-700 group-hover:text-[#FF6B35] transition-colors duration-200">
                <span className="text-yellow-400 text-base">{"★".repeat(rating)}</span>
                <span className="text-gray-300 text-base">{"☆".repeat(5 - rating)}</span>
                <span className="ml-1 font-medium">y más</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button
        onClick={applyFilters}
        disabled={!hasFilters}
        className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Aplicar Filtros
      </Button>
    </div>
  )
}
