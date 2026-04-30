import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ShoppingBag, Plus, Minus, Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === Number(id))
  const { addToCart } = useCart()
  
  const [activeImage, setActiveImage] = useState(product?.images[0] || '')
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '')
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!product) return
    setIsAdding(true)
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    })

    setTimeout(() => {
      setIsAdding(false)
      navigate('/cart')
    }, 800)
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/collections')}
          className="flex items-center gap-2 text-[#5E6470] hover:text-[#1E325A] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Collections</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {product.images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-[#1E325A] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-[4/5] bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden p-8 flex items-center justify-center shadow-sm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={activeImage}
                  className="w-full h-full object-contain"
                  alt={product.name}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-light text-[#1E325A] mb-2"
            >
              {product.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl text-[#5E6470] font-medium mb-8"
            >
              {product.price}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="h-[1px] w-full bg-gray-100 mb-8" 
            />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-[#5E6470]/80 leading-relaxed mb-10"
            >
              {product.description}
            </motion.p>

            {/* Size Selector */}
            <div className="mb-8">
              <p className="text-sm font-medium text-[#1E325A] uppercase tracking-wider mb-4">Select Size</p>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border transition-all flex items-center justify-center font-medium ${
                      selectedSize === size 
                        ? 'bg-[#1E325A] text-white border-[#1E325A]' 
                        : 'bg-white text-[#5E6470] border-gray-200 hover:border-[#1E325A]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="mb-12">
              <p className="text-sm font-medium text-[#1E325A] uppercase tracking-wider mb-4">Select Color</p>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all p-1 ${
                      selectedColor === color ? 'border-[#1E325A] scale-110' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: color }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-6 items-center">
              <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full px-4 py-2 gap-6">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-[#1E325A] hover:opacity-50"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-lg font-medium text-[#1E325A] w-4 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-[#1E325A] hover:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 flex items-center justify-center gap-3 rounded-full py-5 px-8 transition-all duration-300 ${
                  isAdding ? 'bg-green-500' : 'bg-[#1E325A]'
                } text-white shadow-xl`}
              >
                {isAdding ? <Check className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
                <span className="text-lg font-medium">
                  {isAdding ? 'Added to Bag' : 'Add to Bag'}
                </span>
              </motion.button>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
