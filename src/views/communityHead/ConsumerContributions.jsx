
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Users, AlertCircle, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

const ConsumerContributions = () => {
  const { consumerContributions, createCommunityOrder } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredContributions = consumerContributions.filter(contribution => {
    // Filter by status if not "all"
    if (statusFilter !== 'all') {
      const status = statusFilter === 'fulfilled' ? true : false;
      if (contribution.fulfilled !== status) {
        return false;
      }
    }
    
    // Then filter by search term
    if (searchTerm) {
      return contribution.consumer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             contribution.items.some(item => 
               item.crop.toLowerCase().includes(searchTerm.toLowerCase())
             );
    }
    
    return true;
  });
  
  const handleCreateCommunityOrder = () => {
    const success = createCommunityOrder();
    if (success) {
      toast.success("Community order created successfully!");
    } else {
      toast.error("No pending contributions to create an order from.");
    }
  };

  return (
    <DashboardLayout userType="Community Head" userName="Rajesh Singh">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Consumer Contributions</h1>
            <p className="text-muted-foreground">View and manage individual consumer orders</p>
          </div>
          
          <Button 
            className="bg-leaf-600 hover:bg-leaf-700 w-full sm:w-auto"
            onClick={handleCreateCommunityOrder}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Community Order
          </Button>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by consumer or crop..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full sm:w-64">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contributions</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredContributions.map(contribution => (
            <Card key={contribution.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <div className="font-medium">{contribution.consumer.name}</div>
                    <div className="text-xs text-muted-foreground">Order #{contribution.id} | {contribution.date}</div>
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
                
                <div className="flex items-center gap-1 text-sm mt-4">
                  <Users size={16} className="text-leaf-700" />
                  <span>Consumer ID: {contribution.consumer.id}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredContributions.length === 0 && (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No consumer contributions found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConsumerContributions;
