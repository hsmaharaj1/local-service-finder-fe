import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Menu } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { decodeJWT } from '../utils/jwtUtils'; // Import the custom JWT decode function
import ServiceProviderForm from '@/components/ServiceProviderForm';
import Footer from '@/components/Footer';

const HomeNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login'); // Navigate to the login page
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
      <div className="text-xl font-bold">Local Service Finder</div>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-6 w-6" />
      </Button>
      <div className="hidden md:flex space-x-4">
        <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
        <Button variant="ghost" onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
};


const BookingsDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(null);
  const navigate = useNavigate();

  // Define fetchBookings function
  const fetchBookings = async () => {
    const token = localStorage.getItem('id');

    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
      return;
    }

    const check = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/hasdetails/?provider_id=${token}`);
    setShowForm(!check.data.hasDetails);

    try {
      const providerId = token;
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/check-bookings/${providerId}`);
      setBookings(response.data.bookings); // Update bookings state with fetched data
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const markDone = async (bookingId) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/mark-task-done/${bookingId}`);
      console.log('Marked as done:', response);
  
      // Fetch updated bookings after marking the task as done
      const updatedBookingsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/check-bookings/${localStorage.getItem('id')}`);
      const updatedBookings = updatedBookingsResponse.data.bookings;
      console.log(updatedBookings.length)
      if (updatedBookings.length === 0) {
        // If there are no bookings left, clear the bookings array explicitly
        setBookings([]);
      } else {
        // Otherwise, update the bookings with the refreshed list
        setBookings(updatedBookings);
      }
    } catch (error) {
      console.error('Error marking booking as done:', error);
    }
  };
  

  useEffect(() => {
    fetchBookings(); // Fetch bookings on component mount
  }, [navigate]);

  return (
    <>
      <HomeNavbar />
      {showForm && <ServiceProviderForm />}
      {!showForm && (
        <>
          <div className='w-full flex items-center justify-center mt-[5%]'>
            <Card className="w-[70%]">
              <CardHeader>
                <CardTitle>Bookings Dashboard</CardTitle>
                <CardDescription>View and manage all your bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Mark As Done</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(bookings.length === 0) && <>No bookings yet</>}
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.user_name}</TableCell>
                        <TableCell>{format(new Date(booking.booking_datetime), 'PP')}</TableCell>
                        <TableCell>{format(new Date(booking.booking_datetime), 'p')}</TableCell>
                        <TableCell>{booking.phone_number}</TableCell>
                        <TableCell>
                          <Button className="bg-slate-950 text-slate-50 hover:bg-slate-100 hover:text-slate-950" onClick={() => markDone(booking.id)}>DONE</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <Footer/>
        </>
      )}
    </>
  );
};

export default BookingsDashboard;