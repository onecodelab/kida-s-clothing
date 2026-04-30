import { motion } from 'motion/react'
import Navbar from '../components/Navbar'
import BottomLeftCard from '../components/BottomLeftCard'

const products = [
  { id: 1, name: "Authentic Habesha Kemis", price: "18,500 ETB", image: "/p1.png", colors: ['#FFFFFF', '#8E44AD', '#F1C40F'] },
  { id: 2, name: "Men's Habesha Shirt, Classic", price: "11,200 ETB", image: "/p2.png" },
  { id: 3, name: "Modern Red-Belt Dress", price: "16,800 ETB", image: "/p3.png" },
  { id: 4, name: "Emerald Habesha Gown", price: "19,500 ETB", image: "/p4.png" },
  { id: 5, name: "Golden Tilet Dress", price: "17,400 ETB", image: "/p5.png" },
]

export default function ProductsPage() {
  return (
    <div className="w-full h-screen">
      <section className="relative w-full h-full overflow-hidden flex flex-col bg-white/10">
        
        {/* Video Background (Same as Hero) */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4"
        />

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col">
          <Navbar />

          <div className="flex-1 overflow-y-auto px-6 md:px-12 py-4 hide-scrollbar">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h1 className="text-3xl md:text-4xl font-normal text-[#5E6470]">New Collections</h1>
              <div className="text-sm text-[#5E6470]/70 flex flex-wrap gap-4">
                <span>Filters: Material, Color, Size</span>
                <span className="hidden md:inline">|</span>
                <span>Sort by: Featured, Newest</span>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {products.map((product, i) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-[2.5rem] flex flex-col group p-4 shadow-sm"
                >
                  {/* Inner Image Box */}
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-white/60 flex items-center justify-center p-6 group-hover:bg-white/80 transition-colors duration-500">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                    />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col gap-0.5 mt-3 px-1">
                    <h3 className="text-[17px] font-normal text-[#5E6470] leading-tight">
                      {product.name} - {product.price}
                    </h3>
                    {product.colors && (
                      <div className="flex gap-1.5 mt-2">
                        {product.colors.map((color, idx) => (
                          <div 
                            key={idx} 
                            className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Shared UI elements in corners */}
          <div className="absolute bottom-0 left-0 w-full pointer-events-none flex justify-between items-end">
            <div className="pointer-events-auto scale-90 origin-bottom-left"><BottomLeftCard /></div>
          </div>
        </div>
      </section>
    </div>
  )
}
