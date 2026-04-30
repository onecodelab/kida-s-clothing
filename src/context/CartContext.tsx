import React, { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('kida_cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('kida_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      // Check if item with same id, size, and color exists
      const existing = prev.findIndex(i => i.id === item.id && i.size === item.size && i.color === item.color)
      if (existing !== -1) {
        const newCart = [...prev]
        newCart[existing].quantity += item.quantity
        return newCart
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, quantity: number) => {
    setCart(prev => {
      const newCart = [...prev]
      newCart[index].quantity = Math.max(1, quantity)
      return newCart
    })
  }

  const clearCart = () => setCart([])

  const subtotal = cart.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''))
    return acc + (priceNum * item.quantity)
  }, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
