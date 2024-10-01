import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"
import axios from 'axios'
import BookingForm from './BookingForm'

export default function ServiceProviderDetails({ provider_id }){
  const [showForm, setShowForm] = useState(false);

  const p = {
    name: "John's Plumbing Services",
    category: "Plumbing",
    location: "New York, NY",
    rating: 4.8,
    availability: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
    description: "With over 20 years of experience, John's Plumbing Services offers top-notch plumbing solutions for residential and commercial properties. We specialize in repairs, installations, and maintenance, ensuring your plumbing systems run smoothly and efficiently."
  }
  const [provider, setProvider] = useState(p);

  useEffect(()=>{
    axios.get(`http://localhost:5001/api/providers/details/${provider_id}`).then((res)=>{
      console.log(res.data)
      if(res.data.success){
        const obj = {...res.data.provider};
        setProvider(obj);
      }
      else console.log(res.data.message);
    }).catch((err)=>{
      console.log(err);
    })
  }, [])

  if(!showForm){
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
                <span className="font-medium">{provider.rating}</span>
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
                <span>Mon-Fri: 8AM-6PM, Sat: 9AM-3PM</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{provider.about}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" onClick={()=>{setShowForm(true)}}>Book Service</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }
  else{
    return (
      <div className="container mx-auto px-4 py-8">
        <BookingForm provider_id={provider_id}/>
      </div>
    )
  }
}