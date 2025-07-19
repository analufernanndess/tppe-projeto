"use client"

import Link from "next/link"
import { ShoppingBag, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/store"
import { useRouter } from "next/navigation"

export function Header() {
  const { state, dispatch } = useApp()
  const router = useRouter()

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null })
    dispatch({ type: "CLEAR_CART" })
    router.push("/login")
  }

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            TechMart
          </Link>

          {state.user && (
            <div className="flex items-center gap-4">
              <span className="text-sm">Olá, {state.user.name}</span>

              <Link href="/carrinho">
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-blue-700">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">{cartItemsCount}</Badge>
                  )}
                </Button>
              </Link>

              <Link href="/perfil">
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-blue-700">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
