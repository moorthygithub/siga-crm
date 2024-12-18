import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import BASE_URL from '@/config/BaseUrl';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [logos, setLogos] = useState([]);
  

  // const images = useMemo(() => {
  //   return Array.from({ length: 10 }).map(() => ({
  //     src: "https://agsrebuild.store/public/assets/images/logo.png",
  //     style: {
  //       width: `${Math.random() * 60 + 200}px`,
  //       top: `${Math.random() * 100}%`,
  //       left: `${Math.random() * 100}%`,
  //       transform: `rotate(${Math.random() * 360}deg)`,
  //     },
  //   }));
  // }, []);

   // Initialize logos with random positions and rotation
   useEffect(() => {
    const initialLogos = Array.from({ length: 10 }).map(() => ({
      src: "https://agsrebuild.store/public/assets/images/logo.png",
      style: {
        width: `${Math.random() * 60 + 200}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        transform: `rotate(${Math.random() * 360}deg)`,
      },
    }));
    setLogos(initialLogos);
  }, []);

  // Handle logo click to move it away
  const handleLogoClick = (index) => {
    setLogos((prevLogos) =>
      prevLogos.map((logo, i) =>
        i === index
          ? {
              ...logo,
              style: {
                ...logo.style,
                top: `${Math.random() * 100}%`, // New random position
                left: `${Math.random() * 100}%`,
                rotate: Math.random() * 360,
              },
            }
          : logo
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const res = await axios.post(`${BASE_URL}/api/panel-login`, formData);
      
      if (res.status == 200 && res.data?.msg == "success.") {
        const token = res.data.UserInfo?.token;
        
        if (token) {
          // Store user information in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("id", res.data.UserInfo.user.id);
          localStorage.setItem("name", res.data.UserInfo.user.name);
          localStorage.setItem("username", res.data.UserInfo.user.mobile);
          localStorage.setItem("email", res.data.UserInfo.user.email);
          localStorage.setItem("userType", res.data.UserInfo.user.user_type);
          const userType = localStorage.getItem("userType");
          console.log('Stored userType:', userType);
          switch(userType) {
            case "1":
              navigate("/home");
              break;
            case "2":
              navigate("/amount");
              break;
            case "3":
              navigate("/home");
            case "4":
              navigate("/participation");
              break;
            default:
              navigate("/home");
          }
       
          // Show success toast
          toast({
            title: "Login Successful",
            description: "Welcome back to your dashboard.",
          });
        } else {
          throw new Error("No token received");
        }
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      // Handle login errors
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.response?.data?.message || "Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen  bg-gray-100"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {logos.map((logo, index) => (
          <motion.img
            key={index}
            src={logo.src}
            alt="Logo"
            className="absolute opacity-30 grayscale cursor-pointer pointer-events-auto"
            style={{
              width: logo.style.width,
            }}
            initial={{
              top: logo.style.top,
              left: logo.style.left,
              rotate: logo.style.rotate,
            }}
            animate={{
              top: logo.style.top,
              left: logo.style.left,
              rotate: logo.style.rotate,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            onMouseEnter={() => handleLogoClick(index)} 
          />
        ))}
      </div>
     

      <Card className="w-80 max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your UserName and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">UserName</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link 
                    to="#" 
                    tabIndex={-1} 
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Forgot password?
                  </Link> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="*******"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in
              </Button>
              
              
            </div>
          </form>
        </CardContent>
        {/* <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link 
              to="/signup" 
              className="text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter> */}
      </Card>
    </div>
  )
}