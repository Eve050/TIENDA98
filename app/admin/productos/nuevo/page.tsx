"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Trash2,
  Save,
  Eye,
  Package,
  DollarSign,
  Tag,
  Layers,
  Settings,
  ImageIcon,
  Info,
  Check,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"

interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  image?: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sku: "",
    description: "",
    shortDescription: "",
    category: "",
    subcategory: "",
    brand: "",
    price: "",
    comparePrice: "",
    costPrice: "",
    stock: "",
    lowStockThreshold: "5",
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    status: "borrador",
    featured: false,
    visibility: true,
    taxable: true,
    deliveryType: "inmediata",
    tags: [] as string[],
    metaTitle: "",
    metaDescription: "",
  })

  const [images, setImages] = useState<string[]>([])
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [hasVariants, setHasVariants] = useState(false)
  const [newTag, setNewTag] = useState("")

  const categories = [
    { id: "tecnologia", name: "Tecnologia", subcategories: ["Celulares", "Computadoras", "Tablets", "Accesorios"] },
    { id: "moda", name: "Moda y Accesorios", subcategories: ["Hombres", "Mujeres", "Ninos", "Calzado"] },
    { id: "hogar", name: "Hogar y Decoracion", subcategories: ["Muebles", "Decoracion", "Cocina", "Jardin"] },
    { id: "repuestos", name: "Repuestos Automotrices", subcategories: ["Motor", "Frenos", "Suspension", "Electrico"] },
    { id: "artesanias", name: "Artesanias", subcategories: ["Tejidos", "Ceramica", "Madera", "Joyeria"] },
  ]

  const selectedCategory = categories.find(c => c.id === formData.category)

  const handleImageUpload = () => {
    // Simular subida de imagen
    const newImage = `/product-example-${images.length + 1}.jpg`
    setImages([...images, newImage])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      name: "",
      sku: "",
      price: 0,
      stock: 0,
    }
    setVariants([...variants, newVariant])
  }

  const updateVariant = (id: string, field: keyof ProductVariant, value: string | number) => {
    setVariants(variants.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ))
  }

  const removeVariant = (id: string) => {
    setVariants(variants.filter(v => v.id !== id))
  }

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] })
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
  }

  const handleSubmit = async (status: "borrador" | "publicado") => {
    setSaving(true)
    setFormData({ ...formData, status })
    
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSaving(false)
    router.push("/admin/productos")
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Link href="/admin/productos">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nuevo Producto</h1>
                <p className="text-gray-500">Completa la informacion para crear un nuevo producto</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Eye className="w-4 h-4" />
                Vista previa
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 bg-transparent"
                onClick={() => handleSubmit("borrador")}
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                Guardar borrador
              </Button>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 gap-2"
                onClick={() => handleSubmit("publicado")}
                disabled={saving}
              >
                {saving ? (
                  <>Guardando...</>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Publicar
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-white border p-1 h-auto flex-wrap">
                  <TabsTrigger value="general" className="gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Package className="w-4 h-4" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="pricing" className="gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <DollarSign className="w-4 h-4" />
                    Precios
                  </TabsTrigger>
                  <TabsTrigger value="inventory" className="gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Layers className="w-4 h-4" />
                    Inventario
                  </TabsTrigger>
                  <TabsTrigger value="shipping" className="gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Settings className="w-4 h-4" />
                    Envio
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Tag className="w-4 h-4" />
                    SEO
                  </TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informacion Basica</CardTitle>
                      <CardDescription>Nombre, descripcion y detalles del producto</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label>Nombre del producto *</Label>
                          <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              name: e.target.value,
                              slug: generateSlug(e.target.value)
                            })}
                            placeholder="iPhone 15 Pro Max 256GB"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Slug (URL)</Label>
                          <Input
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="iphone-15-pro-max-256gb"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>SKU</Label>
                          <Input
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                            placeholder="IPH15PM256"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Descripcion corta</Label>
                        <Textarea
                          value={formData.shortDescription}
                          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                          placeholder="Breve descripcion para listados..."
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Descripcion completa</Label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Descripcion detallada del producto..."
                          rows={6}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Images */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Imagenes del Producto</CardTitle>
                      <CardDescription>Sube imagenes de alta calidad (recomendado: 1000x1000px)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Producto ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            {index === 0 && (
                              <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
                                Principal
                              </span>
                            )}
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={handleImageUpload}
                          className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-colors"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Subir imagen</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Pricing Tab */}
                <TabsContent value="pricing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Precios</CardTitle>
                      <CardDescription>Configura los precios del producto</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Precio de venta *</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input
                              type="number"
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              placeholder="0.00"
                              className="pl-7"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Precio comparativo</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input
                              type="number"
                              value={formData.comparePrice}
                              onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                              placeholder="0.00"
                              className="pl-7"
                            />
                          </div>
                          <p className="text-xs text-gray-500">Precio tachado para mostrar descuento</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Costo</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input
                              type="number"
                              value={formData.costPrice}
                              onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                              placeholder="0.00"
                              className="pl-7"
                            />
                          </div>
                          <p className="text-xs text-gray-500">Para calcular margen de ganancia</p>
                        </div>
                      </div>
                      
                      {formData.price && formData.costPrice && (
                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2 text-green-700">
                            <Info className="w-4 h-4" />
                            <span className="font-medium">Margen de ganancia:</span>
                            <span>
                              ${(parseFloat(formData.price) - parseFloat(formData.costPrice)).toFixed(2)} 
                              {" "}({(((parseFloat(formData.price) - parseFloat(formData.costPrice)) / parseFloat(formData.price)) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="font-medium">Producto sujeto a impuestos</p>
                          <p className="text-sm text-gray-500">Aplicar IVA al precio de venta</p>
                        </div>
                        <Switch
                          checked={formData.taxable}
                          onCheckedChange={(checked) => setFormData({ ...formData, taxable: checked })}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Variants */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Variantes</CardTitle>
                          <CardDescription>Diferentes opciones como tallas, colores, etc.</CardDescription>
                        </div>
                        <Switch
                          checked={hasVariants}
                          onCheckedChange={setHasVariants}
                        />
                      </div>
                    </CardHeader>
                    {hasVariants && (
                      <CardContent className="space-y-4">
                        {variants.map((variant, index) => (
                          <div key={variant.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Variante {index + 1}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => removeVariant(variant.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs">Nombre</Label>
                                <Input
                                  value={variant.name}
                                  onChange={(e) => updateVariant(variant.id, "name", e.target.value)}
                                  placeholder="Ej: Negro - 128GB"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">SKU</Label>
                                <Input
                                  value={variant.sku}
                                  onChange={(e) => updateVariant(variant.id, "sku", e.target.value)}
                                  placeholder="SKU"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Precio</Label>
                                <Input
                                  type="number"
                                  value={variant.price}
                                  onChange={(e) => updateVariant(variant.id, "price", parseFloat(e.target.value))}
                                  placeholder="0.00"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Stock</Label>
                                <Input
                                  type="number"
                                  value={variant.stock}
                                  onChange={(e) => updateVariant(variant.id, "stock", parseInt(e.target.value))}
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          className="w-full gap-2 bg-transparent"
                          onClick={addVariant}
                        >
                          <Plus className="w-4 h-4" />
                          Agregar variante
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>

                {/* Inventory Tab */}
                <TabsContent value="inventory" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Inventario</CardTitle>
                      <CardDescription>Gestiona el stock del producto</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Cantidad en stock *</Label>
                          <Input
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Alerta de stock bajo</Label>
                          <Input
                            type="number"
                            value={formData.lowStockThreshold}
                            onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                            placeholder="5"
                          />
                          <p className="text-xs text-gray-500">Notificar cuando el stock sea menor a este valor</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Shipping Tab */}
                <TabsContent value="shipping" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Envio</CardTitle>
                      <CardDescription>Configura las opciones de envio del producto</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Tipo de entrega</Label>
                        <Select
                          value={formData.deliveryType}
                          onValueChange={(value) => setFormData({ ...formData, deliveryType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inmediata">Entrega inmediata (stock local)</SelectItem>
                            <SelectItem value="pedido">Por pedido (importacion)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Peso (kg)</Label>
                        <Input
                          type="number"
                          value={formData.weight}
                          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                          placeholder="0.5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Dimensiones (cm)</Label>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <Input
                              type="number"
                              value={formData.dimensions.length}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                dimensions: { ...formData.dimensions, length: e.target.value }
                              })}
                              placeholder="Largo"
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              value={formData.dimensions.width}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                dimensions: { ...formData.dimensions, width: e.target.value }
                              })}
                              placeholder="Ancho"
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              value={formData.dimensions.height}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                dimensions: { ...formData.dimensions, height: e.target.value }
                              })}
                              placeholder="Alto"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* SEO Tab */}
                <TabsContent value="seo" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Optimizacion para Buscadores</CardTitle>
                      <CardDescription>Mejora la visibilidad del producto en Google</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Titulo SEO</Label>
                        <Input
                          value={formData.metaTitle}
                          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                          placeholder={formData.name || "Titulo del producto"}
                        />
                        <p className="text-xs text-gray-500">
                          {formData.metaTitle.length}/60 caracteres recomendados
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Meta descripcion</Label>
                        <Textarea
                          value={formData.metaDescription}
                          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                          placeholder="Descripcion para resultados de busqueda..."
                          rows={3}
                        />
                        <p className="text-xs text-gray-500">
                          {formData.metaDescription.length}/160 caracteres recomendados
                        </p>
                      </div>

                      {/* Preview */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-2">Vista previa en Google:</p>
                        <div className="font-medium text-blue-600 text-lg">
                          {formData.metaTitle || formData.name || "Titulo del producto"}
                        </div>
                        <div className="text-green-700 text-sm">
                          tienda98.com/productos/{formData.slug || "producto"}
                        </div>
                        <div className="text-gray-600 text-sm mt-1">
                          {formData.metaDescription || formData.shortDescription || "Descripcion del producto..."}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Etiquetas</CardTitle>
                      <CardDescription>Ayudan a encontrar el producto en busquedas internas</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Agregar etiqueta..."
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        />
                        <Button onClick={addTag} variant="outline" className="bg-transparent">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                            >
                              {tag}
                              <button onClick={() => removeTag(tag)}>
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Estado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Visibilidad</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="publicado">Publicado</SelectItem>
                        <SelectItem value="borrador">Borrador</SelectItem>
                        <SelectItem value="pendiente">Pendiente de revision</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Producto destacado</p>
                      <p className="text-xs text-gray-500">Mostrar en la pagina principal</p>
                    </div>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Organizacion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Categoria *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: "" })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedCategory && (
                    <div className="space-y-2">
                      <Label>Subcategoria</Label>
                      <Select
                        value={formData.subcategory}
                        onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar subcategoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCategory.subcategories.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Marca</Label>
                    <Input
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="Apple, Samsung, Nike..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Resumen
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      {formData.name ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span className={formData.name ? "text-gray-700" : "text-red-600"}>
                        Nombre del producto
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      {formData.price ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span className={formData.price ? "text-gray-700" : "text-red-600"}>
                        Precio de venta
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      {formData.category ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span className={formData.category ? "text-gray-700" : "text-red-600"}>
                        Categoria
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      {images.length > 0 ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className={images.length > 0 ? "text-gray-700" : "text-yellow-600"}>
                        Imagenes ({images.length})
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      {formData.stock ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className={formData.stock ? "text-gray-700" : "text-yellow-600"}>
                        Stock ({formData.stock || "0"} unidades)
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
