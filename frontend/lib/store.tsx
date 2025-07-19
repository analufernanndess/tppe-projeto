"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { User, Product, CartItem } from "./types"

interface AppState {
  user: User | null
  cart: CartItem[]
  products: Product[]
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_PRODUCTS"; payload: Product[] }

const initialState: AppState = {
  user: null,
  cart: [],
  products: [
    {
      id: "1",
      name: "Smartphone S25",
      manufacturer: "Samsung",
      costPrice: 800,
      salePrice: 1200,
      image: "/samsung-s25.png",
    },
    {
      id: "2",
      name: "Notebook Dell Inspiron",
      manufacturer: "Dell",
      costPrice: 2000,
      salePrice: 2800,
      image: "/dell-notebook.png",
    },
    {
      id: "3",
      name: "Fone Bluetooth Sony",
      manufacturer: "Sony",
      costPrice: 150,
      salePrice: 250,
      image: "/fone-bluetooth.png",
    },
    {
      id: "4",
      name: 'Smart TV LG 55"',
      manufacturer: "LG",
      costPrice: 1500,
      salePrice: 2200,
      image: "/lg.png",
    },
    {
      id: "5",
      name: "Tablet iPad Air",
      manufacturer: "Apple",
      costPrice: 1800,
      salePrice: 2500,
      image: "/ipad-air.png",
    },
    {
      id: "6",
      name: "Console PlayStation 5",
      manufacturer: "Sony",
      costPrice: 2500,
      salePrice: 3200,
      image: "/ps5.png",
    },
  ],
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "ADD_TO_CART":
      const existingItem = state.cart.find((item) => item.product.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }],
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.product.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item,
          )
          .filter((item) => item.quantity > 0),
      }
    case "CLEAR_CART":
      return { ...state, cart: [] }
    case "SET_PRODUCTS":
      return { ...state, products: action.payload }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load user from localStorage on app initialization
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        dispatch({ type: "SET_USER", payload: user })
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
      }
    }
  }, [])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
