import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"

const ServiceProviderDetails = () => {
  const provider = {
    name: "John's Plumbing Services",
    category: "Plumbing",
    location: "New York, NY",
    rating: 4.8,
    availability: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
    description: "With over 20 years of experience, John's Plumbing Services offers top-notch plumbing solutions for residential and commercial properties. We specialize in repairs, installations, and maintenance, ensuring your plumbing systems run smoothly and efficiently."
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-3xl font-bold">{provider.name}</CardTitle>
              <p className="text-lg text-muted-foreground mt-1">{provider.category}</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {provider.location}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{provider.rating.toFixed(1)}</span>
              <span className="text-muted-foreground text-sm ml-1">
                ({Math.floor(provider.rating * 20)} reviews)
              </span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{provider.location}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Availability</h3>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>{provider.availability}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-muted-foreground">{provider.description}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg">Book Service</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ServiceProviderDetails