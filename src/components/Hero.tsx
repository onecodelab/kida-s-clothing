import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import Navbar from './Navbar'
import HeroBadge from './HeroBadge'
import BottomLeftCard from './BottomLeftCard'
import BottomRightCorner from './BottomRightCorner'

const products = [
  { id: 1, image: '/avatar1.png', name: 'Abyssinia Gold Tilet', price: '$249' },
  { id: 2, image: '/avatar2.png', name: 'Crimson Night Tilet', price: '$199' },
  { id: 3, image: '/avatar3.png', name: 'Emerald Gold Tilet', price: '$229' },
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return

    // Wheel Event handling (Desktop/Trackpad)
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        
        if (isScrolling.current) return
        
        if (Math.abs(e.deltaY) > 20) {
          isScrolling.current = true
          
          let nextIndex = activeIndex
          if (e.deltaY > 0) {
            nextIndex = Math.min(activeIndex + 1, products.length - 1)
          } else {
            nextIndex = Math.max(activeIndex - 1, 0)
          }
          
          el.scrollTo({ left: nextIndex * el.clientWidth, behavior: 'smooth' })
          
          setTimeout(() => {
            isScrolling.current = false
          }, 800)
        }
      }
    }

    // Touch Event handling (Mobile Vertical Swipes)
    let touchStartY = 0
    let touchStartX = 0

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    }

    const onTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY
      const touchEndX = e.touches[0].clientX
      
      const deltaY = touchStartY - touchEndY
      const deltaX = touchStartX - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 40) {
        if (e.cancelable) e.preventDefault()
        
        if (isScrolling.current) return
        isScrolling.current = true

        let nextIndex = activeIndex
        if (deltaY > 0) {
          nextIndex = Math.min(activeIndex + 1, products.length - 1)
        } else {
          nextIndex = Math.max(activeIndex - 1, 0)
        }
        
        el.scrollTo({ left: nextIndex * el.clientWidth, behavior: 'smooth' })
        
        setTimeout(() => {
          isScrolling.current = false
        }, 800)
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
    }
  }, [activeIndex])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    // adding a small offset to ensure it snaps accurately
    const index = Math.round((scrollLeft + 10) / width);
    if (index !== activeIndex && index >= 0 && index < products.length) {
      setActiveIndex(index);
    }
  }

  const activeProduct = products[activeIndex] || products[0]

  return (
    <div className="w-full h-screen">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
      <section className="relative w-full h-full overflow-hidden flex flex-col items-center bg-white/10 group">
        
        {/* Video Background */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4"
        />

        {/* Background Text Layer (Behind Avatar) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pt-28 md:pt-36 px-6 text-center max-w-4xl z-[2] pointer-events-none">
          <HeroBadge />
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal text-[#5E6470] mb-2 tracking-tight leading-[1.05]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ethiopian Traditional Dress <br className="hidden md:block" /> & Fashion Design
          </motion.h1>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-[#5E6470] opacity-80 leading-relaxed max-w-xl font-normal hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Access exclusive collections, discover Kida's clothing, and transform your wardrobe into a masterpiece instantly.
          </motion.p>
        </div>

        {/* Avatar Carousel Layer */}
        <div 
          ref={carouselRef}
          className="absolute inset-0 z-[5] flex overflow-x-auto snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={handleScroll}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full h-full shrink-0 snap-center relative flex justify-center items-center">
              <motion.img 
                src={product.image} 
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full md:w-auto h-full object-cover object-center pointer-events-none"
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse 80% 95% at 50% 50%, black 30%, transparent 70%)',
                  maskImage: 'radial-gradient(ellipse 80% 95% at 50% 50%, black 30%, transparent 70%)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Foreground UI Layer (pointer-events-none so we can swipe the carousel) */}
        <div className="absolute inset-0 z-10 w-full h-full flex flex-col items-center pointer-events-none">
          <div className="w-full pointer-events-auto"><Navbar /></div>

          {/* Swipe Indicator (Visible on Mobile) */}
          <div className="absolute bottom-32 md:hidden z-30 flex items-center justify-center gap-2 w-full pointer-events-none">
            {products.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#5E6470] w-3' : 'bg-[#5E6470]/30'}`} />
            ))}
          </div>



          {/* Desktop Product Card */}
          <motion.div 
            key={activeProduct.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex absolute right-10 xl:right-24 top-1/2 -translate-y-[20%] bg-white/40 backdrop-blur-xl border border-white/30 p-5 pr-12 rounded-[2rem] z-30 flex-col gap-3 shadow-lg pointer-events-auto"
          >
            <div className="flex flex-col text-left">
              <span className="text-[22px] font-normal text-[#5E6470] leading-tight">{activeProduct.name}<br/>Dress - Ethio Collection</span>
              <span className="text-[20px] text-[#5E6470] opacity-90 mt-1">- {activeProduct.price}</span>
            </div>
            <button className="bg-white text-[#5E6470] font-medium py-3 px-6 rounded-full hover:bg-white/90 transition-colors w-fit text-[14px] tracking-wide mt-2 cursor-pointer pointer-events-auto">
              ADD TO CART
            </button>
          </motion.div>

          <div className="pointer-events-auto"><BottomLeftCard /></div>
        </div>

      </section>
    </div>
  )
}
