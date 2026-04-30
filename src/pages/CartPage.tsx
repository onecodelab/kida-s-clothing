import { motion, AnimatePresence } from 'motion/react'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <h1 className="text-4xl font-light text-[#1E325A] mb-12">Your Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center border border-gray-100">
                <div className="bg-gray-50 p-6 rounded-full mb-6">
                  <ShoppingBag className="w-12 h-12 text-gray-300" />
                </div>
                <h2 className="text-2xl font-medium text-[#1E325A] mb-2">Your bag is empty</h2>
                <p className="text-[#5E6470] mb-8">Looks like you haven't added any traditional treasures yet.</p>
                <Link 
                  to="/collections" 
                  className="bg-[#1E325A] text-white rounded-full px-8 py-4 font-medium hover:bg-[#1E325A]/90 transition-all"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div 
                    key={`${item.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-[2rem] p-6 flex gap-6 items-center border border-gray-100 shadow-sm"
                  >
                    <div className="w-24 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-contain p-2" alt={item.name} />
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-medium text-[#1E325A]">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(index)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-[#5E6470] text-sm mb-4">Size: {item.size} | Color: <span className="inline-block w-3 h-3 rounded-full align-middle border border-gray-200" style={{ backgroundColor: item.color }} /></p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full px-3 py-1 gap-4">
                          <button 
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="text-[#1E325A] hover:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium text-[#1E325A] w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="text-[#1E325A] hover:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-lg font-semibold text-[#1E325A]">{item.price}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm sticky top-32">
              <h2 className="text-2xl font-medium text-[#1E325A] mb-8">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between text-[#5E6470]">
                  <span>Subtotal</span>
                  <span>{subtotal.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-[#5E6470]">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="h-[1px] bg-gray-100 my-2" />
                <div className="flex justify-between text-xl font-semibold text-[#1E325A]">
                  <span>Total</span>
                  <span>{subtotal.toLocaleString()} ETB</span>
                </div>
              </div>

              <button 
                disabled={cart.length === 0}
                className="w-full bg-[#1E325A] text-white rounded-full py-5 flex items-center justify-center gap-3 font-medium hover:bg-[#1E325A]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl"
              >
                Checkout
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-center text-xs text-[#5E6470] mt-6 leading-relaxed">
                Prices include all taxes and duties. Shipping is calculated based on local delivery in Addis Ababa.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
