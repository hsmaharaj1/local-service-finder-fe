import React from 'react'
import bcrypt from 'bcryptjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HomeNavbar from '@/components/HomeNavbar'
import Footer from '@/components/Footer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'


const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
})

const registerSchema = loginSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
})

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      if(response.data.success){
        //Dashboard Page

        console.log("Cookie: ", response.data.provider.id)
        localStorage.setItem('id', response.data.provider.id)
        console.log(localStorage.getItem('id'))
        navigate('/dashboard')
      }

    } catch (error) {
      console.error('Login error:', error);
      alert("Error logging in. Please try again.");
    }
    
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </Form>
  )
}

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Register data:", data);
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const userData = {
      name: data.name,
      email: data.email,
      password: hashedPassword
    }

    try {
      const response = await axios.post("http://localhost:5000/api/providers/add-provider", data);

      if (response.status === 201) {
        alert("Registration submitted successfully!");
        console.log("Response from server:", response.data);
      } else {
        alert(`Failed to register: ${response.data.message}`);
        console.error("Error:", response.data);
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
        console.error("Error:", error.response.data);
      } else {
        alert("An error occurred during registration.");
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Register</Button>
      </form>
    </Form>
  );
};


export default function AuthForms() {
  return (
    <>
      <HomeNavbar />
      <Card className="w-full max-w-md mx-auto my-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Account Access</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </CardFooter>
      </Card>
      <Footer/>
    </>
  )
}