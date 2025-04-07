
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, User, Users, AlertCircle, PlusCircle } from 'lucide-react';

const OrderContributions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { communityOrders, consumerContributions, communityProfile, consumerProfiles, viewConsumerDetails } = useAppContext();
  
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

  const handleViewConsumerDetails = (consumerId) => {
    viewConsumerDetails(consumerId);
    navigate(`/community-head/consumers/${consumerId}`);
  };

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
            <h1 className="text-2xl font-bold mb-1">Order #{order.id} Contributions</h1>
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
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {order.items.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium">{item.crop}</h3>
                    <p className="text-xl font-bold text-leaf-700 mt-1">{item.quantity}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Consumer Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            {orderContributions.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-1">No consumer contributions found for this order</p>
                <p className="text-xs text-muted-foreground">This may be an order created directly by the community head</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orderContributions.map((contribution) => (
                  <Card key={contribution.id} className="overflow-hidden shadow-sm border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div>
                          <div className="font-medium">{contribution.consumer.name}</div>
                          <div className="text-xs text-muted-foreground">Consumer ID: {contribution.consumer.id}</div>
                        </div>
                        
                        <Badge 
                          variant="outline" 
                          className={contribution.fulfilled 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                          }
                        >
                          {contribution.fulfilled ? 'Fulfilled' : 'Pending'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mt-3">
                        {contribution.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-1 border-b last:border-0">
                            <span>{item.crop}</span>
                            <span className="font-medium">{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewConsumerDetails(contribution.consumer.id)}
                          className="w-full sm:w-auto"
                        >
                          <User size={14} className="mr-1" />
                          View Consumer Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            <div className="mt-6 flex justify-center">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => navigate(`/community-head/orders/${id}/demand`)}
              >
                View Demand Summary
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrderContributions;
