
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Users, ShoppingCart, CheckCircle2, Building, Eye } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/agent/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunityHeadDashboard = () => {
  const { communityProfile, communityOrders, newConsumers = [] } = useAppContext();
  const navigate = useNavigate();

  return (
    <DashboardLayout userType="Community Head" userName={communityProfile?.head?.name || "Community Head"}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Community Dashboard</h1>
        <div className="text-muted-foreground">
          <p>{communityProfile?.name || "Community"} | Community ID: {communityProfile?.id || "COM-ID"}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <StatCard 
          title="Community ID" 
          value={communityProfile?.id || "COM-ID"} 
          icon={<Building size={18} />} 
        />
        <StatCard 
          title="Members" 
          value={communityProfile?.membersCount || 0} 
          icon={<Users size={18} />} 
        />
        <StatCard 
          title="Pending Orders" 
          value={communityOrders.filter(order => order.status === "Processing").length} 
          icon={<ShoppingCart size={18} />} 
        />
        <StatCard 
          title="Completed Orders" 
          value={communityOrders.filter(order => order.status === "Delivered").length} 
          icon={<CheckCircle2 size={18} />} 
        />
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Community Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {communityOrders.map((order) => (
                <div key={order.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-medium text-lg">Order #{order.id}</span>
                      <span className="text-xs ml-2 text-muted-foreground">{order.date}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={order.status === 'Delivered' 
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : (order.status === 'Cancelled' 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200')
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Order Items:</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{item.crop}</span>
                            <span className="font-medium">{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      {order.status === 'Processing' ? (
                        <div>
                          <p className="text-sm text-muted-foreground">Expected delivery: {order.deliveryDate}</p>
                        </div>
                      ) : order.status === 'Delivered' ? (
                        <div>
                          <p className="text-sm text-muted-foreground">Delivered on: {order.deliveryDate}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-red-600">Cancelled</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/community-head/orders/${order.id}/contributions`)}
                      className="text-leaf-700"
                    >
                      <Eye size={14} className="mr-1" />
                      View Contributions
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/community-head/orders/${order.id}/demand`)}
                      className="text-leaf-700"
                    >
                      <Eye size={14} className="mr-1" />
                      Demand Summary
                    </Button>
                  </div>
                </div>
              ))}
              
              {communityOrders.length === 0 && (
                <div className="text-center py-5">
                  <p className="text-muted-foreground mb-3">No community orders yet.</p>
                  <Link to="/community-head/place-order">
                    <Button className="bg-leaf-600 hover:bg-leaf-700">
                      Place First Order
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            
            {communityOrders.length > 0 && (
              <div className="mt-6 flex justify-center">
                <Link to="/community-head/orders">
                  <Button variant="outline" className="w-full">View All Orders</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* New Consumers Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">New Consumers</CardTitle>
            <Link to="/community-head/new-consumers">
              <Button variant="link" className="text-leaf-700 px-0">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {newConsumers && newConsumers.length > 0 ? (
            <div className="space-y-4">
              {newConsumers.slice(0, 3).map((consumer) => (
                <div key={consumer.id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{consumer.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {consumer.id}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/community-head/consumers/${consumer.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">Recent consumers who joined your community will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CommunityHeadDashboard;
