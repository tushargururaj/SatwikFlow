
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertCircle, ShoppingBag, FileBarChart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Colors for the pie chart
const COLORS = ['#4ade80', '#facc15', '#fb923c', '#a78bfa', '#60a5fa'];

const OrderDemandSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { communityOrders, consumerContributions, communityProfile } = useAppContext();
  
  // Find the specific order
  const order = communityOrders.find(order => order.id === id);
  
  // Find contributions related to this order
  const orderContributions = consumerContributions.filter(
    contribution => contribution.orderId === id
  );
  
  if (!order) {
    return (
      <DashboardLayout userType="Community Head" userName={communityProfile?.head?.name || "Community Head"}>
        <div className="text-center py-16">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/community-head/orders')} className="bg-leaf-600 hover:bg-leaf-700">
            Back to Orders
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  // Transform order items for chart visualization
  const chartData = order.items.map(item => ({
    name: item.crop,
    value: parseFloat(item.quantity)
  }));
  
  // Calculate total demand
  const totalDemand = order.items.reduce((sum, item) => {
    // Extract numeric quantity (assuming format like "8 kg")
    const quantity = parseFloat(item.quantity);
    return sum + quantity;
  }, 0);
  
  // Count unique contributors for this order
  const uniqueContributors = new Set(
    orderContributions.map(contribution => contribution.consumer.id)
  ).size;

  return (
    <DashboardLayout userType="Community Head" userName={communityProfile?.head?.name || "Community Head"}>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4 -ml-2 text-muted-foreground" 
          onClick={() => navigate('/community-head/orders')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Order #{order.id} Demand Summary</h1>
            <p className="text-muted-foreground">Placed on {order.date}</p>
          </div>
          
          <Badge 
            variant="outline" 
            className={order.status === 'Delivered' 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : (order.status === 'Cancelled' 
                ? 'bg-red-50 text-red-700 border-red-200' 
                : 'bg-amber-50 text-amber-700 border-amber-200')
            }
            size="lg"
          >
            {order.status}
          </Badge>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingBag size={18} className="text-leaf-700" />
                Order Demand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h3 className="text-3xl font-bold mb-1 text-leaf-700">{totalDemand}kg</h3>
                      <p className="text-sm text-muted-foreground">Total Demand</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h3 className="text-3xl font-bold mb-1 text-leaf-700">{order.items.length}</h3>
                      <p className="text-sm text-muted-foreground">Crop Types</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h3 className="text-3xl font-bold mb-1 text-leaf-700">{uniqueContributors}</h3>
                      <p className="text-sm text-muted-foreground">Contributors</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Demand Breakdown</h3>
                  
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{item.crop}</span>
                      </div>
                      
                      <span className="font-medium">{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileBarChart size={18} className="text-leaf-700" />
                Crop Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto mr-2"
            onClick={() => navigate(`/community-head/orders/${id}/contributions`)}
          >
            View Contributions
          </Button>
          
          <Button 
            className="bg-leaf-600 hover:bg-leaf-700 w-full sm:w-auto"
            onClick={() => navigate('/community-head/place-order')}
          >
            Place New Order
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderDemandSummary;
