import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"

export default function ServiceCard({ name, category, location, rating, provider_id, onClick }) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{category}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {location}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mt-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground text-sm ml-1">
            ({Math.floor(rating * 20)} reviews)
          </span>
        </div>
        <div className="flex items-center text-muted-foreground mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick} className="w-full bg-slate-950 text-slate-50 hover:bg-slate-100 hover:text-slate-950">Book Now</Button>
      </CardFooter>
    </Card>
  )
}
