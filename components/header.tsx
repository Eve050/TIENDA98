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

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
          <div className="flex items-center justify-between gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              {/* Mobile Menu Trigger */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <Menu className="w-6 h-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
                    <SheetHeader className="p-4 border-b">
                      <SheetTitle className="text-left flex items-center gap-2">
                        <Image
                          src="/images/image.png"
                          alt="TIENDA98"
                          width={120}
                          height={30}
                          className="h-8 w-auto"
                        />
                      </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col h-full overflow-y-auto pb-20">
                      <div className="p-4 space-y-6">
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-2">
                            Categorías
                          </p>
                          <div className="grid grid-cols-1 gap-1">
                            {categories.map((category) => (
                              <Link
                                key={category.slug}
                                href={`/categorias/${category.slug}`}
                                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-primary/10 transition-colors"
                              >
                                <span className="text-xl">{category.icon}</span>
                                <span className="font-medium text-sm">{category.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-2">
                            Mi Cuenta
                          </p>
                          <div className="flex flex-col gap-1">
                            <Link
                              href="/favoritos"
                              className="flex items-center justify-between p-3 text-sm font-semibold rounded-xl hover:bg-muted"
                            >
                              <div className="flex items-center gap-3">
                                <Heart className="w-4 h-4 text-orange-500" />
                                <span>Lista de deseos</span>
                              </div>
                              <Badge className="bg-orange-500 text-white border-0">{wishlistCount}</Badge>
                            </Link>
                            <Link
                              href="/comparar"
                              className="flex items-center justify-between p-3 text-sm font-semibold rounded-xl hover:bg-muted"
                            >
                              <div className="flex items-center gap-3">
                                <Shuffle className="w-4 h-4 text-orange-500" />
                                <span>Comparar</span>
                              </div>
                              <Badge className="bg-orange-500 text-white border-0">{compareCount}</Badge>
                            </Link>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-2">
                            Menú Principal
                          </p>
                          <div className="flex flex-col gap-1">
                            <Link
                              href="/productos"
                              className="p-3 text-sm font-semibold rounded-xl hover:bg-muted"
                            >
                              Productos
                            </Link>
                            <Link
                              href="/tiendas"
                              className="p-3 text-sm font-semibold rounded-xl hover:bg-muted"
                            >
                              Tiendas
                            </Link>
                            <Link
                              href="/informacion"
                              className="p-3 text-sm font-semibold rounded-xl hover:bg-muted"
                            >
                              Información
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0 group">
                <Image
                  src="/images/image.png"
                  alt="TIENDA98"
                  width={150}
                  height={40}
                  className="h-7 md:h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            <div className="hidden lg:block flex-1 max-w-md mx-4">
              <HeaderSearch />
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
              <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "relative h-9 w-9 md:h-11 md:w-11 rounded-xl hover:bg-muted hover:text-primary transition-all",
                      isUserMenuOpen && "bg-primary/10 text-primary",
                    )}
                  >
                    <User className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-3 bg-muted/50 rounded-lg mb-2">
                        <p className="font-semibold text-foreground">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                      {user?.type === "seller" ? (
                        <DropdownMenuItem asChild className="rounded-lg py-2.5">
                          <Link href="/vendedor/mi-tienda">Mi Tienda</Link>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem asChild className="rounded-lg py-2.5">
                          <Link href="/mi-cuenta">Mi Cuenta</Link>
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

              <Link href="/comparar" className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 md:h-11 md:w-11 rounded-xl hover:bg-muted hover:text-primary transition-all"
                >
                  <Shuffle className="w-4 h-4 md:w-5 md:h-5" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-[10px] md:text-xs bg-secondary text-white">
                    {compareCount}
                  </Badge>
                </Button>
              </Link>

              <Link href="/favoritos" className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 md:h-11 md:w-11 rounded-xl hover:bg-muted hover:text-primary transition-all"
                >
                  <Heart className="w-4 h-4 md:w-5 md:h-5" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-[10px] md:text-xs bg-secondary text-white">
                    {wishlistCount}
                  </Badge>
                </Button>
              </Link>

              <Link href="/carrito">
                <Button className="relative h-9 md:h-11 px-2 md:px-4 rounded-xl bg-primary hover:bg-primary/90 gap-1 md:gap-2 shadow-md hover:shadow-lg transition-all">
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-1 -left-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-[10px] md:text-xs bg-secondary">
                      {itemCount}
                    </Badge>
                  )}
                  <span className="font-bold text-xs md:text-base hidden xs:inline">${total.toFixed(2)}</span>
                </Button>
              </Link>
            </div>
          </div>
          {/* Mobile Search Bar - shown only on mobile below lg */}
          <div className="mt-3 lg:hidden">
            <HeaderSearch />
          </div>
        </div>

        <div className="bg-muted/50 border-t border-border hidden lg:block">
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
                    <span>Categorías</span>
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
