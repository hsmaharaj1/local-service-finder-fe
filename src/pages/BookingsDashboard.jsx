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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { decodeJWT } from '../utils/jwtUtils'; // Import the custom JWT decode function
import ServiceProviderForm from '@/components/ServiceProviderForm';

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

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('id') // Get the token from cookies


      if (!token) {
        navigate('/login'); // Redirect to login if no token is found
        return;
      }

      const check = await axios.get(`http://localhost:5000/api/auth/hasdetails/?provider_id=${token}`)
      setShowForm(!check.data.hasDetails)

      try {
        const providerId = token

        const response = await axios.get(`http://localhost:5173/api/providers/check-bookings/${providerId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        setBookings(response.data.bookings); // Update bookings state with fetched data
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [navigate]);

  const BookingDetails = ({ booking }) => (
    <div className="space-y-2">
      <p><strong>Name:</strong> {booking.user_name}</p>
      <p><strong>Date:</strong> {format(new Date(booking.booking_datetime), 'PPP')}</p>
      <p><strong>Time:</strong> {format(new Date(booking.booking_datetime), 'p')}</p>
      <p><strong>Service:</strong> {booking.service}</p>
      <p><strong>Status:</strong> {booking.is_done ? "Completed" : "Pending"}</p>
    </div>
  );

  return (
    <>
      <HomeNavbar />
      {showForm && <ServiceProviderForm />}
      {!showForm && <Card className="w-full">
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings && bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.user_name}</TableCell>
                  <TableCell>{format(new Date(booking.booking_datetime), 'PP')}</TableCell>
                  <TableCell>{format(new Date(booking.booking_datetime), 'p')}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Booking Details</DialogTitle>
                          <DialogDescription>
                            Full information about the booking
                          </DialogDescription>
                        </DialogHeader>
                        <BookingDetails booking={booking} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      }

    </>
  );
};

export default BookingsDashboard;