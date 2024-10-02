import React from 'react'
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useNavigate } from 'react-router-dom'

function HomeNavbar({setShowDetails}) {
    const navigate = useNavigate();
    return (
      <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <div className="text-xl font-bold">Local Service Finder</div>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="hidden md:flex space-x-4">
          <Button variant="ghost" onClick={() => {setShowDetails(false); navigate('/')}}>Home</Button>
          <Button variant="ghost" onClick={() => navigate('/login')}>Service Provider</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Contact</Button>
        </div>
      </nav>
    )
}

export default HomeNavbar
