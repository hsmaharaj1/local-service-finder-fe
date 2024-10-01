import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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

    const onSubmit = (data) => {
        console.log(data)
        // Here you would typically send the data to your backend
        alert("Service provider details submitted successfully!")
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
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
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
                <Button type="submit" className="w-full" onClick={form.handleSubmit(onSubmit)}>
                    {initialData.name ? "Update" : "Add"} Service Provider
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ServiceProviderForm