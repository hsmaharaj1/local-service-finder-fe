import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WidthIcon } from '@radix-ui/react-icons'

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    about: z.string().min(10, { message: "About section must be at least 10 characters." }).max(500, { message: "About section must not exceed 500 characters." }),
    location: z.string().min(2, { message: "Location must be at least 2 characters." }),
    category: z.string().min(1, { message: "Please select a category." }),
})

const categories = [
    "Plumbing",
    "Electrical",
    "Cleaning",
    "Gardening",
    "Painting",
    "Carpentry",
    "Home Repair",
    "Moving",
    "Pet Care",
    "Other"
]

// Function to fetch coordinates
async function getCoordinates(address) {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length > 0) {
            const location = data[0];
            const coordinates = {
                latitude: parseFloat(location.lat),
                longitude: parseFloat(location.lon)
            };
            return coordinates;
        } else {
            throw new Error('Unable to geocode address');
        }
    } catch (error) {
        throw new Error('Error fetching geocoding data: ' + error.message);
    }
}

const ServiceProviderForm = ({ initialData = {} }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData.name || "",
            about: initialData.about || "",
            location: initialData.location || "",
            category: initialData.category || "",
        },
    })

    // Submit form data
    const onSubmit = async (data) => {
        try {
            const { location, about, category } = data;
            const coordinates = await getCoordinates(location);

            // Assuming user_id is coming from the session or some other source
            const user_id = localStorage.getItem('id'); // Replace with actual user ID

            const requestBody = {
                location,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                about,
                category,
                user_id
            };

            // Send data to the backend
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/providers/add-provider-details`, requestBody);
            alert("Service provider details submitted successfully!");
            window.location.reload()

        } catch (error) {
            console.error("Error submitting provider details:", error);
            alert("Failed to submit provider details.");
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    {initialData.name ? "Update" : "Add"} Service Provider Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John's Plumbing Services" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the name of your service or business.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="about"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>About</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your services and experience..."
                                            {...field}
                                            rows={5}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a brief description of your services and experience.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="New York, NY" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the city and state where you provide services.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category} className="bg-white hover:bg-gray-100">
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose the category that best describes your services.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full bg-slate-950 text-slate-50 hover:bg-slate-100 hover:text-slate-950" onClick={form.handleSubmit(onSubmit)}>
                    {initialData.name ? "Update" : "Add"} Service Provider
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ServiceProviderForm
