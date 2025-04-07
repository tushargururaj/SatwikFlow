
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, History, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const consumerInfo = {
  name: "Sunita Sharma",
  community: "Village B",
  communityId: "COM-102"
};

const recentOrders = [
  { 
    id: 'ORD-005', 
    date: 'April 2, 2025', 
    items: [{ crop: 'Tomato', quantity: '5 kg' }],
    status: 'Processing'
  },
  { 
    id: 'ORD-004', 
    date: 'March 27, 2025', 
    items: [{ crop: 'Potato', quantity: '3 kg' }, { crop: 'Onion', quantity: '2 kg' }],
    status: 'Delivered'
  },
  { 
    id: 'ORD-003', 
    date: 'March 15, 2025', 
    items: [{ crop: 'Brinjal', quantity: '2 kg' }],
    status: 'Delivered'
  }
];

const ConsumerDashboard = () => {
  return (
    <DashboardLayout userType="Consumer" userName={consumerInfo.name}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, {consumerInfo.name}</h1>
        <div className="text-muted-foreground">
          <p>Community: {consumerInfo.community} | Community ID: {consumerInfo.communityId}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="border-leaf-200 hover:border-leaf-300 transition-all">
          <CardContent className="pt-6 pb-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-leaf-100 flex items-center justify-center mb-4">
              <ShoppingCart className="h-6 w-6 text-leaf-700" />
            </div>
            <h3 className="font-medium mb-1">Place New Order</h3>
            <p className="text-sm text-muted-foreground mb-4">Request for fresh produce directly from farms</p>
            <Link to="/consumer/new-order" className="mt-auto">
              <Button className="w-full bg-leaf-600 hover:bg-leaf-700">New Order</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="border-leaf-200 hover:border-leaf-300 transition-all">
          <CardContent className="pt-6 pb-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-leaf-100 flex items-center justify-center mb-4">
              <History className="h-6 w-6 text-leaf-700" />
            </div>
            <h3 className="font-medium mb-1">My Orders</h3>
            <p className="text-sm text-muted-foreground mb-4">View status and history of your orders</p>
            <Link to="/consumer/orders" className="mt-auto">
              <Button variant="outline" className="w-full">View Orders</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="border-leaf-200 hover:border-leaf-300 transition-all">
          <CardContent className="pt-6 pb-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-leaf-100 flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-leaf-700" />
            </div>
            <h3 className="font-medium mb-1">My Profile</h3>
            <p className="text-sm text-muted-foreground mb-4">View and update your personal details</p>
            <Link to="/consumer/profile" className="mt-auto">
              <Button variant="outline" className="w-full">View Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="border-b pb-3 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium">Order #{order.id}</span>
                    <span className="text-xs ml-2 text-muted-foreground">{order.date}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      order.status === 'Delivered' 
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : order.status === 'Processing' 
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="text-sm space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.crop}</span>
                      <span>{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Link to="/consumer/orders" className="w-full">
            <Button variant="outline" className="w-full">View All Orders</Button>
          </Link>
        </CardFooter>
      </Card>
    </DashboardLayout>
  );
};

export default ConsumerDashboard;
