import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ServiceCard from '@/components/ServiceCard';
import HomeNavbar from '@/components/HomeNavbar';
import Footer from '@/components/Footer';
import axios from 'axios';
import BookingForm from '@/components/BookingForm';
import ServiceProviderDetails from '@/components/ServiceProviderDetails';

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
      <Button type="submit" variant="secondary" className="bg-slate-950 text-white hover:bg-slate-200 hover:text-slate-950">
        Search
      </Button>
    </form>
  );
};

let serviceProviders = [
  { name: "John's Plumbing", category: "Plumbing", location: "New York", rating: 4.8, provider_id: 2 },
  { name: "Quick Electricians", category: "Electrical", location: "New York", rating: 4.6, provider_id: 2 },
  { name: "Green Thumb Gardening", category: "Landscaping", location: "New York", rating: 4.9, provider_id: 2 },
  { name: "Clean & Tidy", category: "Cleaning", location: "New York", rating: 4.7, provider_id: 2 },
  { name: "Handy Home Repairs", category: "Handyman", location: "New York", rating: 4.5, provider_id: 2 },
  { name: "Perfect Paint Jobs", category: "Painting", location: "New York", rating: 4.8, provider_id: 2 },
];

export default function Home() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [sp, setsp] = useState(serviceProviders);

  useEffect(() => {
    const getLocation = () => {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/search/random`).then((res) => {
        if (res.data.success) {
          const tempProviders = res.data.providers;

          const serviceProviders2 = tempProviders.map(provider => ({
            name: provider.name,
            category: provider.category,
            location: provider.location,
            rating: 4.5,
            provider_id: provider.id
          }));

          setsp(serviceProviders2)
          console.log('Filtered Service Providers:', serviceProviders);
        } else {
          console.error('Failed to fetch providers:', res.data.message);
        }
      }).catch((error) => {
        console.error('Error fetching providers:', error);
      });

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

  const handleSearch = async (query) => {
    console.log(location);
    const search = query;
    if (query.trim() && location.latitude && location.longitude) {
      try {
        console.log(query, location.latitude, location.longitude);
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/search/query`, { search, location });
        const data = response.data.services;
        const data2 = data.map(provider => ({
          name: provider.name,
          category: provider.category,
          location: provider.location,
          rating: 4.5,
          provider_id: provider.id
        }));
        setsp(data2);
        console.log('Search results:', data);
      } catch (err) {
        console.error('Error sending search request:', err);
      }
    } else {
      console.error('Location is not available.');
    }
  };

  if (showDetails && selectedProvider) {
    return (
      <div className="min-h-screen bg-background">
        <HomeNavbar setShowDetails={setShowDetails} />
        <ServiceProviderDetails provider_id={selectedProvider.provider_id} />
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <HomeNavbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Find Local Services</h1>
          <SearchBar onSearch={handleSearch} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {(sp.length === 0) && <div className='w-full flex items-center justify-center'>No Services Found</div>}
            {sp.map((provider, index) => (
              <ServiceCard
                key={index}
                {...provider}
                onClick={() => {
                  console.log(provider);
                  setSelectedProvider(provider);
                  setShowDetails(true);
                }}
              />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
