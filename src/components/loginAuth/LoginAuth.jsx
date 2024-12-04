import React, { useContext } from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from '@/config/BaseUrl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { ContextPanel } from '@/lib/ContextPanel';

const LoginAuth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // const { isPanelUp } = useContext(ContextPanel);
    const navigate = useNavigate();
    const {formattedDate} = useContext(ContextPanel)
    const {toast} = useToast()
  
    const handleSumbit = async (e) => {
      e.preventDefault();
      // if (!isPanelUp) {
      //   navigate("/maintenance");
      //   return;
      // }
  
      setLoading(true);

  
      //create a formData object and append state values
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
  
      try {
        // Send POST request to login API with form data
        const res = await axios.post(`${BASE_URL}/api/panel-login`, formData);
        console.log("user device id",res.data)
        if (res.status === 200 && res.data?.msg === "success.") {
          const token = res.data.UserInfo?.token;
          if (token ) {
            // Store the token in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("id", res.data.UserInfo.user.id);
            localStorage.setItem("name", res.data.UserInfo.user.name);
            localStorage.setItem("username", res.data.UserInfo.user.mobile);
            localStorage.setItem("email", res.data.UserInfo.user.email);
            
  
            navigate("/home");
            toast({
              title: "Login Successfully",
              description: formattedDate,
            });
          } else {
            
            toast({
              title: "Login Failed, Token not received.",
              description: formattedDate,
            });
          }
        } else {
          toast({
            title: "Login Failed, Please check your credentials.",
            description: formattedDate,
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "An error occurred during login.",
          description: formattedDate,
        });
      }
  
      setLoading(false);
    };
  return (
     <div >
        <Card className=" "  >
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent >
            <form  onSubmit={handleSumbit}>

         
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            
                <Button type="submit" className="w-full">
                  Login
                </Button>
          
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div> 
  )
}

export default LoginAuth