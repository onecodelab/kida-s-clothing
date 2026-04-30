import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const menuItems = [
    { label: 'All Collections', href: '/collections', hasDropdown: false },
    { label: 'Men', href: '#', hasDropdown: false },
    { label: 'Women', href: '#', hasDropdown: false },
    { label: 'About Us', href: '#', hasDropdown: false },
  ]

  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-10 w-full relative z-50">
      <div className="flex-1 hidden md:flex items-center">
        {/* Desktop Logo */}
        <Link to="/">
          <img src="/logo.png" alt="Kida's Clothing Logo" className="h-16 md:h-20 object-contain cursor-pointer" />
        </Link>
      </div>
      
      <ul className="hidden md:flex items-center gap-8 text-[rgb(45,45,45)] font-normal text-sm">
        {menuItems.map((item, i) => (
          <li key={i}>
            <Link 
              to={item.href} 
              className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group"
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="md:hidden flex-1">
        <Link to="/">
          <img src="/logo.png" alt="Kida's Clothing Logo" className="h-14 object-contain" />
        </Link>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        <motion.button 
          onClick={() => navigate('/collections')}
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          className="hidden md:flex items-center bg-[rgba(30,50,90,0.8)] text-white rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 gap-2 md:gap-3 hover:bg-[rgba(30,50,90,1)] transition-colors group cursor-pointer pointer-events-auto"
        >
          <div className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="text-xs md:text-sm font-normal">Shop Now</span>
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-[#5E6470] pointer-events-auto"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-white/30 backdrop-blur-[40px] flex flex-col items-center justify-center z-[100] md:hidden"
          >
            {/* Close Button Inside Fullscreen Menu */}
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 p-2 text-[#5E6470]"
            >
              <X className="w-10 h-10" />
            </button>

            <motion.div 
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="flex flex-col items-center gap-8"
            >
              {menuItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 }
                  }}
                >
                  <Link 
                    to={item.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl md:text-5xl font-light text-[#5E6470] hover:text-[#1E325A] transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0, scale: 1 },
                  closed: { opacity: 0, y: 20, scale: 0.9 }
                }}
                className="mt-8"
              >
                <motion.button 
                  onClick={() => { navigate('/collections'); setIsMenuOpen(false); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-[#1E325A] text-white rounded-full px-10 py-5 gap-4 shadow-xl"
                >
                  <ArrowUpRight className="w-6 h-6" />
                  <span className="text-xl font-medium">Shop Now</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Bottom Branding / Socials in Menu */}
            <div className="absolute bottom-12 flex flex-col items-center gap-4">
              <img src="/logo.png" alt="Logo" className="h-12 opacity-30" />
              <p className="text-sm text-[#5E6470]/40 font-light">ETHIOPIAN TRADITIONAL DRESS</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
