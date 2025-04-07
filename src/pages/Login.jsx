
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import Logo from '@/components/Logo';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('agent');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!userId || !password) {
      toast.error("Please enter both ID and password");
      return;
    }
    
    // In a real app, this would validate credentials against an API
    // For this demo, we'll simulate successful login for any input
    
    // Based on role, redirect to appropriate dashboard
    switch (selectedRole) {
      case 'agent':
        navigate('/agent');
        break;
      case 'consumer':
        navigate('/consumer');
        break;
      case 'community-head':
        navigate('/community-head');
        break;
      default:
        navigate('/agent');
    }
    
    toast.success(`Logged in as ${selectedRole}`);
  };

  return (
    <div className="h-screen w-full bg-pattern flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo className="text-leaf-700" />
        </div>
        
        <Card className="border-leaf-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Choose your role and sign in to continue
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                <RadioGroup
                  id="role"
                  value={selectedRole}
                  onValueChange={setSelectedRole}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="agent" id="agent" />
                    <Label htmlFor="agent" className="flex-1 cursor-pointer">
                      <span className="font-medium">Agent</span>
                      <p className="text-sm text-muted-foreground">
                        Manage farmers & record crops
                      </p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="community-head" id="community-head" />
                    <Label htmlFor="community-head" className="flex-1 cursor-pointer">
                      <span className="font-medium">Community Head</span>
                      <p className="text-sm text-muted-foreground">
                        Oversee community demand & orders
                      </p>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="consumer" id="consumer" />
                    <Label htmlFor="consumer" className="flex-1 cursor-pointer">
                      <span className="font-medium">Consumer</span>
                      <p className="text-sm text-muted-foreground">
                        Submit crop needs & view orders
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  placeholder="Enter your ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-leaf-700 hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full bg-leaf-600 hover:bg-leaf-700">
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          Need support? Contact your local coordinator or call 
          <span className="text-leaf-700"> 1800-SATVIK</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
