"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { useApp } from "@/lib/store"
import { ArrowLeft, Copy, CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const { state, dispatch } = useApp()
  const router = useRouter()
  const [pixCode] = useState(
    "00020126580014BR.GOV.BCB.PIX013636c4b8c4-4c4c-4c4c-4c4c-4c4c4c4c4c4c5204000053039865802BR5925TECHMART COMERCIO ELETRON6009SAO PAULO62070503***6304A1B2",
  )
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!state.user) {
      router.push("/login")
    }
    if (state.cart.length === 0) {
      router.push("/")
    }
  }, [state.user, state.cart, router])

  if (!state.user || state.cart.length === 0) {
    return null
  }

  const totalValue = state.cart.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
  const totalItems = state.cart.reduce((total, item) => total + item.quantity, 0)

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFinalizePurchase = () => {
    dispatch({ type: "CLEAR_CART" })
    alert("Compra finalizada com sucesso! Você receberá um e-mail de confirmação.")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/carrinho">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Carrinho
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Endereço de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {state.user ? (
                    <>
                      <p className="font-semibold">{state.user.name}</p>
                      <p className="text-gray-600">{state.user.address}</p>
                      <p className="text-gray-600">{state.user.phone}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Usuário Visitante</p>
                      <p className="text-gray-600">Endereço será solicitado após o pagamento</p>
                      <p className="text-gray-600">Telefone: A definir</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {state.cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600">
                          Qtd: {item.quantity} x R${" "}
                          {item.product.salePrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <p className="font-semibold">
                        R${" "}
                        {(item.product.salePrice * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total ({totalItems} itens):</span>
                      <span className="text-green-600">
                        R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Pagamento via PIX
                  <Badge variant="secondary">Único método disponível</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Instruções para pagamento:</strong>
                  </p>
                  <ol className="text-sm text-blue-700 space-y-1">
                    <li>1. Copie o código PIX abaixo</li>
                    <li>2. Abra o app do seu banco</li>
                    <li>3. Escolha a opção PIX Copia e Cola</li>
                    <li>4. Cole o código e confirme o pagamento</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Código PIX:</label>
                  <div className="flex gap-2">
                    <div className="flex-1 p-3 bg-gray-100 rounded border text-sm font-mono break-all">{pixCode}</div>
                    <Button onClick={copyPixCode} variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
                      {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  {copied && <p className="text-sm text-green-600">Código copiado!</p>}
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> Após realizar o pagamento, clique em "Confirmar Compra" abaixo. Seu
                    pedido será processado em até 2 horas úteis.
                  </p>
                </div>

                <Button
                  onClick={handleFinalizePurchase}
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                >
                  Confirmar Compra
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
