
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Calendar, Eye } from 'lucide-react';

const CommunityOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const { communityOrders, communityProfile } = useAppContext();
  
  const filteredOrders = communityOrders.filter(order => {
    // Filter by status if active tab is not "all"
    if (activeTab !== 'all' && order.status.toLowerCase() !== activeTab) {
      return false;
    }
    
    // Then filter by search term
    if (searchTerm) {
      return order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
             order.items.some(item => 
               item.crop.toLowerCase().includes(searchTerm.toLowerCase())
             );
    }
    
    return true;
  });

  const getStatusBadgeStyles = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleViewContributions = (orderId) => {
    navigate(`/community-head/orders/${orderId}/contributions`);
  };

  const handleViewDemand = (orderId) => {
    navigate(`/community-head/orders/${orderId}/demand`);
  };

  return (
    <DashboardLayout userType="Community Head" userName={communityProfile?.head?.name || "Community Head"}>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Community Orders</h1>
            <p className="text-muted-foreground">View all orders placed by the community</p>
          </div>
          
          <Link to="/community-head/place-order">
            <Button className="bg-leaf-600 hover:bg-leaf-700 w-full sm:w-auto">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Place New Order
            </Button>
          </Link>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or crop..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-4">
          {filteredOrders.map(order => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <div className="font-medium">Order #{order.id}</div>
                    <div className="text-xs text-muted-foreground">Placed on {order.date}</div>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={getStatusBadgeStyles(order.status)}
                  >
                    {order.status}
                  </Badge>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <Label className="text-xs text-muted-foreground mb-2 block">Order Items</Label>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium">{item.crop}</span>
                        <span>{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  {order.status === 'Processing' && (
                    <div className="flex gap-2 items-center text-amber-700">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Expected delivery by {order.deliveryDate}</span>
                    </div>
                  )}
                  
                  {order.status === 'Delivered' && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Delivered on {order.deliveryDate}</span>
                    </div>
                  )}
                  
                  {order.status === 'Cancelled' && (
                    <div className="text-sm text-red-600">
                      Reason: {order.reason}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-leaf-700"
                    onClick={() => handleViewContributions(order.id)}
                  >
                    <Eye size={14} className="mr-1" />
                    View Contributions
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-leaf-700"
                    onClick={() => handleViewDemand(order.id)}
                  >
                    <Eye size={14} className="mr-1" />
                    Demand Summary
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-muted-foreground">No orders found matching your search criteria.</p>
              <Link to="/community-head/place-order" className="mt-4 inline-block">
                <Button className="bg-leaf-600 hover:bg-leaf-700">
                  Place New Order
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

// Adding this component to the file because it's used in this component
const Label = ({ className, children, ...props }) => (
  <div className={className} {...props}>{children}</div>
);

export default CommunityOrders;
