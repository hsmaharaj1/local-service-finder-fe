import React from 'react'
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function HomeNavbar({ setShowDetails }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleHomeClick = () => {
    if (setShowDetails && typeof setShowDetails === 'function') {
      setShowDetails(false); // Call setShowDetails if it's a function
    }
    navigate('/'); // Navigate to the home page
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };
  return (
    <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
            <div className="text-xl font-bold">Local Service Finder</div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                <Menu className="h-6 w-6" />
            </Button>
            <div className={`hidden md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <Button variant="ghost" onClick={handleHomeClick}>Home</Button>
                <Button variant="ghost" onClick={() => navigate('/login')}>Service Provider</Button>
                <Button variant="ghost">About</Button>
                <Button variant="ghost">Contact</Button>
            </div>
            {/* Responsive Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-primary text-primary-foreground shadow-lg">
                    <Button variant="ghost" onClick={handleHomeClick}>Home</Button>
                    <Button variant="ghost" onClick={() => navigate('/login')}>Service Provider</Button>
                    <Button variant="ghost">About</Button>
                    <Button variant="ghost">Contact</Button>
                </div>
            )}
        </nav>
  )
}

export default HomeNavbar
