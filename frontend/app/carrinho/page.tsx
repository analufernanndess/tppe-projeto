"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { useApp } from "@/lib/store"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { useEffect } from "react"

export default function CarrinhoPage() {
  const { state, dispatch } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!state.user) {
      router.push("/login")
    }
  }, [state.user, router])

  if (!state.user) {
    return null
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: productId })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } })
    }
  }

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
  }

  const totalItems = state.cart.reduce((total, item) => total + item.quantity, 0)
  const totalValue = state.cart.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h1>
            <p className="text-gray-600 mb-8">Adicione alguns produtos incríveis ao seu carrinho!</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos Produtos
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Meu Carrinho</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.product.name}</h3>
                      <p className="text-gray-600 text-sm">{item.product.manufacturer}</p>
                      <p className="text-green-600 font-bold mt-1">
                        R$ {item.product.salePrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>

                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, Number.parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min="0"
                      />

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total de itens:</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">
                    R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="space-y-2 pt-4">
                  <Link href="/">
                    <Button variant="outline" className="w-full bg-transparent">
                      Adicionar Mais Itens
                    </Button>
                  </Link>

                  <Link href="/checkout">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Finalizar Compra</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
