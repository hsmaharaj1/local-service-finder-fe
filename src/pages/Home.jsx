import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ServiceCard from '@/components/ServiceCard';
import HomeNavbar from '@/components/HomeNavbar';
import Footer from '@/components/Footer';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);  // Send the query back to the parent component (Home)
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-2 relative max-w-md w-full mx-auto mt-8">
      <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for services..."
        className="pl-8"
      />
      <Button type="submit" variant="secondary" >
        Search
      </Button>
    </form>
  );
};

const serviceProviders = [
  { name: "John's Plumbing", category: "Plumbing", location: "New York", rating: 4.8 },
  { name: "Quick Electricians", category: "Electrical", location: "New York", rating: 4.6 },
  { name: "Green Thumb Gardening", category: "Landscaping", location: "New York", rating: 4.9 },
  { name: "Clean & Tidy", category: "Cleaning", location: "New York", rating: 4.7 },
  { name: "Handy Home Repairs", category: "Handyman", location: "New York", rating: 4.5 },
  { name: "Perfect Paint Jobs", category: "Painting", location: "New York", rating: 4.8 },
];

export default function Home() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
              default:
                setError("An unknown error occurred.");
            }
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  // Function to handle the search submission
  const handleSearch = async (query) => {
    if (query.trim() && location.latitude && location.longitude) {
      try {
        console.log(query, location.latitude, location.longitude)
        // Sending the query, latitude, and longitude to the backend
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            latitude: location.latitude,
            longitude: location.longitude,
          }),
        });

        const data = await response.json();
        console.log('Search results:', data);

        // Optionally, handle the search results (e.g., display them on the page)
      } catch (err) {
        console.error('Error sending search request:', err);
      }
    } else {
      console.error('Location is not available.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Find Local Services</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {serviceProviders.map((provider, index) => (
            <ServiceCard key={index} {...provider} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
