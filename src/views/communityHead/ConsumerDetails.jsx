
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, ShoppingCart, Calendar, AlertCircle } from 'lucide-react';

const ConsumerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { consumerProfiles, consumerContributions, communityProfile } = useAppContext();
  
  // Find the consumer details
  const consumer = consumerProfiles.find(profile => profile.id === id);
  
  // Find consumer's contributions
  const contributions = consumerContributions.filter(
    contribution => contribution.consumer.id === id
  );
  
  if (!consumer) {
    return (
      <DashboardLayout userType="Community Head" userName={communityProfile?.head?.name || "Community Head"}>
        <div className="text-center py-16">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Consumer Not Found</h2>
          <p className="text-muted-foreground mb-6">The consumer you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/community-head')} className="bg-leaf-600 hover:bg-leaf-700">
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout userType="Community Head" userName={communityProfile?.head?.name || "Community Head"}>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4 -ml-2 text-muted-foreground" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold mb-4">Consumer Details</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User size={18} className="text-leaf-700" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Full Name</div>
                  <div className="font-medium">{consumer.name}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Consumer ID</div>
                  <div className="font-medium">{consumer.id}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">{consumer.email}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="font-medium">{consumer.phone}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User size={18} className="text-leaf-700" />
                Community Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Community</div>
                  <div className="font-medium">{consumer.community}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Address</div>
                  <div className="font-medium">{consumer.address}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Joined Date</div>
                  <div className="font-medium">{consumer.joinedDate}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart size={18} className="text-leaf-700" />
              Recent Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contributions.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No contributions found for this consumer.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contributions.slice(0, 3).map((contribution) => (
                  <div key={contribution.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{contribution.date}</span>
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
                    
                    <div className="space-y-1 mt-2">
                      {contribution.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{item.crop}</span>
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ConsumerDetails;
