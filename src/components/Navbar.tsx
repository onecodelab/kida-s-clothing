import { motion } from 'motion/react'
import { ChevronRight, ArrowUpRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const menuItems = [
    { label: 'All Collections', href: '/collections', hasDropdown: false },
    { label: 'Men', href: '#', hasDropdown: false },
    { label: 'Women', href: '#', hasDropdown: false },
    { label: 'About Us', href: '#', hasDropdown: false },
  ]

  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-10 w-full relative z-10">
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

      <div className="flex-1 flex justify-end">
        <motion.button 
          onClick={() => navigate('/collections')}
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          className="flex items-center bg-[rgba(30,50,90,0.8)] text-white rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 gap-2 md:gap-3 hover:bg-[rgba(30,50,90,1)] transition-colors group cursor-pointer pointer-events-auto"
        >
          <div className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="text-xs md:text-sm font-normal">Shop Now</span>
        </motion.button>
      </div>
    </nav>
  )
}
