"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, ArrowRight, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { searchProducts, type Product } from "@/lib/product-catalog"

export default function HeaderSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.length >= 2) {
      const found = searchProducts(query).slice(0, 6)
      setResults(found)
      setIsOpen(true)
      setHighlightedIndex(-1)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault()
      const product = results[highlightedIndex]
      setIsOpen(false)
      setQuery("")
      router.push(`/producto/${product.id}`)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={wrapperRef} className="relative flex-1 max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Que estas buscando?"
            className="pl-4 pr-20 h-12 rounded-xl border-2 border-muted focus:border-primary text-base shadow-sm"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 top-1 rounded-lg h-10 w-10 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </form>

      {/* Dropdown results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden z-[100]">
          {results.length > 0 ? (
            <>
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-foreground">{results.length}</span> resultado{results.length !== 1 ? "s" : ""} para{" "}
                  <span className="font-semibold text-orange-500">{`"${query}"`}</span>
                </p>
              </div>
              <div className="max-h-[360px] overflow-y-auto">
                {results.map((product, i) => (
                  <Link
                    key={product.id}
                    href={`/producto/${product.id}`}
                    onClick={() => {
                      setIsOpen(false)
                      setQuery("")
                    }}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      highlightedIndex === i ? "bg-orange-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-foreground">${product.price.toFixed(2)}</p>
                      {product.originalPrice && (
                        <p className="text-[10px] text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`/buscar?q=${encodeURIComponent(query.trim())}`}
                onClick={() => {
                  setIsOpen(false)
                  setQuery("")
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 border-t border-gray-100 text-sm font-semibold text-orange-500 hover:bg-orange-50 transition-colors"
              >
                Ver todos los resultados
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          ) : (
            <div className="px-4 py-8 text-center">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No se encontraron resultados para <span className="font-semibold text-foreground">{`"${query}"`}</span></p>
              <p className="text-xs text-gray-400 mt-1">Intenta con otro termino de busqueda</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
