import React, { useState } from 'react'
import { format } from 'date-fns'
import { ChevronDown, ChevronUp } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const bookings = [
  { id: 1, name: "John Doe", date: new Date(2023, 5, 15, 10, 30), service: "Plumbing", status: "Confirmed" },
  { id: 2, name: "Jane Smith", date: new Date(2023, 5, 16, 14, 0), service: "Electrical", status: "Pending" },
  { id: 3, name: "Bob Johnson", date: new Date(2023, 5, 17, 11, 15), service: "Cleaning", status: "Completed" },
  { id: 4, name: "Alice Brown", date: new Date(2023, 5, 18, 9, 0), service: "Gardening", status: "Confirmed" },
  { id: 5, name: "Charlie Wilson", date: new Date(2023, 5, 19, 16, 30), service: "Painting", status: "Pending" },
]

const BookingDetails = ({ booking }) => (
  <div className="space-y-2">
    <p><strong>Name:</strong> {booking.name}</p>
    <p><strong>Date:</strong> {format(booking.date, 'PPP')}</p>
    <p><strong>Time:</strong> {format(booking.date, 'p')}</p>
    <p><strong>Service:</strong> {booking.service}</p>
    <p><strong>Status:</strong> {booking.status}</p>
  </div>
)

const BookingsDashboard = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedBookings = React.useMemo(() => {
    let sortableBookings = [...bookings];
    if (sortConfig.key !== null) {
      sortableBookings.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBookings;
  }, [bookings, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'ascending' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bookings Dashboard</CardTitle>
        <CardDescription>View and manage all your bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => requestSort('name')}>
                Name {<SortIcon columnKey="name" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('date')}>
                Date {<SortIcon columnKey="date" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('date')}>
                Time {<SortIcon columnKey="date" />}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{format(booking.date, 'PP')}</TableCell>
                <TableCell>{format(booking.date, 'p')}</TableCell>
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
  )
}

export default BookingsDashboard