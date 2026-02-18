"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Search, User, Shuffle, Heart, ShoppingCart, Menu, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useCompare } from "@/lib/compare-context"
import { useState } from "react"
import { LoginDialog } from "./login-dialog"
import { cn } from "@/lib/utils"
import Image from "next/image"
import HeaderSearch from "./header-search"

const categories = [
  { name: "Moda y Accesorios", slug: "moda-y-accesorios", icon: "👔" },
  { name: "Tecnología", slug: "tecnologia", icon: "💻" },
  { name: "Vehículos", slug: "vehiculos", icon: "🚗" },
  { name: "Hogar y Jardín", slug: "hogar-y-jardin", icon: "🏡" },
  { name: "Medicina", slug: "medicina", icon: "⚕️" },
  { name: "Alimentos", slug: "alimentos", icon: "🍽️" },
  { name: "Belleza", slug: "belleza", icon: "💄" },
  { name: "Deportes", slug: "deportes", icon: "⚽" },
  { name: "Juegos y Juguetes", slug: "juegos-y-juguetes", icon: "🎮" },
]

export default function Header() {
  const { itemCount, total } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const { itemCount: wishlistCount } = useWishlist()
  const { itemCount: compareCount } = useCompare()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <button
          onClick={() => (window.location.href = "/ofertas")}
          className="w-full bg-secondary text-white hidden md:block hover:bg-secondary/90 transition-colors"
        >
          <div className="container mx-auto px-4 py-3 overflow-hidden">
            <div className="flex items-center justify-center gap-6 text-sm whitespace-nowrap animate-marquee font-medium">
              <span className="flex items-center gap-2">
                <span className="text-primary">⚡</span>
                ENVÍO GRATIS en compras sobre $50
              </span>
              <span className="text-primary/50">•</span>
              <span className="flex items-center gap-2">
                <span className="text-primary">🎯</span>
                Hasta 70% OFF en productos seleccionados
              </span>
              <span className="text-primary/50">•</span>
              <span className="flex items-center gap-2">
                <span className="text-primary">🔥</span>
                Ofertas exclusivas todos los días
              </span>
              <span className="mx-8 text-primary/30">|</span>
              <span className="flex items-center gap-2">
                <span className="text-primary">⚡</span>
                ENVÍO GRATIS en compras sobre $50
              </span>
              <span className="text-primary/50">•</span>
              <span className="flex items-center gap-2">
                <span className="text-primary">🎯</span>
                Hasta 70% OFF en productos seleccionados
              </span>
            </div>
          </div>
        </button>

        <div className="container mx-auto px-4 py-3 md:py-5">
          {/* Mobile Header Layout (Stack vertically) */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">

            {/* Top Row on Mobile: Menu, Logo, Cart/User Actions */}
            <div className="flex items-center justify-between w-full md:w-auto">
              {/* Mobile Menu Button - Left */}
              <div className="md:hidden">
                <DropdownMenu open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                      <Menu className="w-6 h-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-72 max-h-[80vh] overflow-y-auto p-2">
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <DropdownMenuItem key={category.slug} asChild>
                          <Link
                            href={`/categorias/${category.slug}`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                          >
                            <span className="text-xl">{category.icon}</span>
                            <span className="font-medium">{category.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/productos" className="p-3 font-medium">Productos</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/tiendas" className="p-3 font-medium">Tiendas</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/informacion" className="p-3 font-medium">Información</Link>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Logo - Center on Mobile, Left on Desktop */}
              <Link href="/" className="flex-shrink-0 group">
                <Image
                  src="/images/image.png"
                  alt="TIENDA98"
                  width={140}
                  height={36}
                  className="h-7 md:h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Mobile Cart/User Actions - Right */}
              <div className="flex items-center gap-1 md:hidden">
                <Link href="/carrito">
                  <Button variant="ghost" size="icon" className="relative h-10 w-10">
                    <ShoppingCart className="w-5 h-5" />
                    {itemCount > 0 && (
                      <Badge className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-primary text-white">
                        {itemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-2">
                    {isAuthenticated ? (
                      <>
                        <div className="px-3 py-3 bg-muted/50 rounded-lg mb-2">
                          <p className="font-semibold text-foreground">{user?.name}</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                        <DropdownMenuItem asChild className="rounded-lg py-2.5">
                          <Link href="/mi-cuenta">Mi Cuenta</Link>
                        </DropdownMenuItem>
                        {user?.type !== "seller" && (
                          <DropdownMenuItem asChild className="rounded-lg py-2.5">
                            <Link href="/mis-pedidos">Mis Pedidos</Link>
                          </DropdownMenuItem>
                        )}
                        {user?.type === "seller" && (
                          <DropdownMenuItem asChild className="rounded-lg py-2.5">
                            <Link href="/vendedor/mi-tienda">Mi Tienda</Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuItem onClick={logout} className="text-destructive rounded-lg py-2.5">
                          <LogOut className="w-4 h-4 mr-2" />
                          Cerrar Sesión
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem
                          onClick={() => setShowLoginDialog(true)}
                          className="rounded-lg py-2.5 hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-colors"
                        >
                          Iniciar Sesión
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/registro"
                            className="rounded-lg py-2.5 hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-colors"
                          >
                            Registrarse
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Search Bar - Full Width on Mobile, Middle on Desktop */}
            <div className="w-full md:flex-1 md:mx-4 order-last md:order-none">
              <HeaderSearch />
            </div>

            {/* Desktop Actions - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-2">
              <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "relative h-11 w-11 rounded-xl hover:bg-muted hover:text-primary transition-all",
                      isUserMenuOpen && "bg-primary/10 text-primary",
                    )}
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-3 bg-muted/50 rounded-lg mb-2">
                        <p className="font-semibold text-foreground">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                      <DropdownMenuItem asChild className="rounded-lg py-2.5">
                        <Link href="/mi-cuenta">Mi Cuenta</Link>
                      </DropdownMenuItem>
                      {user?.type !== "seller" && (
                        <DropdownMenuItem asChild className="rounded-lg py-2.5">
                          <Link href="/mis-pedidos">Mis Pedidos</Link>
                        </DropdownMenuItem>
                      )}
                      {user?.type === "seller" && (
                        <DropdownMenuItem asChild className="rounded-lg py-2.5">
                          <Link href="/vendedor/mi-tienda">Mi Tienda</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="my-2" />
                      <DropdownMenuItem onClick={logout} className="text-destructive rounded-lg py-2.5">
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        onClick={() => setShowLoginDialog(true)}
                        className="rounded-lg py-2.5 hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-colors"
                      >
                        Iniciar Sesión
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/registro"
                          className="rounded-lg py-2.5 hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-colors"
                        >
                          Registrarse
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/comparar">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-11 w-11 rounded-xl hover:bg-muted hover:text-primary transition-all hidden sm:flex"
                >
                  <Shuffle className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary text-white">
                    {compareCount}
                  </Badge>
                </Button>
              </Link>

              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-11 w-11 rounded-xl hover:bg-muted hover:text-primary transition-all hidden sm:flex"
                >
                  <Heart className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary text-white">
                    {wishlistCount}
                  </Badge>
                </Button>
              </Link>

              <Link href="/carrito">
                <Button className="relative h-11 px-4 rounded-xl bg-primary hover:bg-primary/90 gap-2 shadow-md hover:shadow-lg transition-all">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-1 -left-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary">
                      {itemCount}
                    </Badge>
                  )}
                  <span className="font-bold text-base">${total.toFixed(2)}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:block bg-muted/50 border-t border-border">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
              <DropdownMenu open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    className={cn(
                      "gap-2 font-semibold h-10 px-5 rounded-xl bg-secondary text-white hover:bg-secondary/90 transition-all shadow-sm",
                      isCategoriesOpen && "bg-primary",
                    )}
                  >
                    <Menu className="w-4 h-4" />
                    <span className="hidden sm:inline">Categorías</span>
                    <ChevronDown
                      className={cn("w-4 h-4 transition-transform duration-200", isCategoriesOpen && "rotate-180")}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80 max-h-[500px] overflow-y-auto p-2">
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category.slug} asChild>
                        <Link
                          href={`/categorias/${category.slug}`}
                          className="cursor-pointer flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group"
                        >
                          <span className="text-2xl group-hover:scale-110 transition-transform">{category.icon}</span>
                          <span className="font-medium text-base">{category.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/productos"
                className="text-foreground hover:text-primary transition-all font-medium px-4 py-2 rounded-xl hover:bg-muted whitespace-nowrap"
              >
                Productos
              </Link>
              <Link
                href="/tiendas"
                className="text-foreground hover:text-primary transition-all font-medium px-4 py-2 rounded-xl hover:bg-muted whitespace-nowrap"
              >
                Tiendas
              </Link>
              <Link
                href="/informacion"
                className="text-foreground hover:text-primary transition-all font-medium px-4 py-2 rounded-xl hover:bg-muted whitespace-nowrap"
              >
                Información
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  )
}
