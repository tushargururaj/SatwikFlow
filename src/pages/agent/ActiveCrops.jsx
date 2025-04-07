
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Search, Plus, Calendar, User, ArrowUpRight } from 'lucide-react';

const ActiveCrops = () => {
  const navigate = useNavigate();
  const { activeCrops } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [growthStageFilter, setGrowthStageFilter] = useState('all');
  
  // Filter crops based on search term and growth stage
  const filteredCrops = activeCrops.filter(crop => {
    // First check growth stage filter
    if (growthStageFilter !== 'all' && crop.growthStage !== growthStageFilter) {
      return false;
    }
    
    // Then check search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        crop.cropName.toLowerCase().includes(searchLower) ||
        crop.farmerName.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Get unique growth stages for filter dropdown
  const growthStages = [...new Set(activeCrops.map(crop => crop.growthStage))];
  
  // Function to format date or handle null
  const formatDate = (date) => {
    if (!date) return "Not specified";
    return date instanceof Date 
      ? format(date, "MMM d, yyyy")
      : date;
  };
  
  return (
    <DashboardLayout userType="Agent" userName="Ravi Kumar">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Active Crops</h1>
            <p className="text-muted-foreground">Tracking all crops currently in cultivation</p>
          </div>
          
          <Button
            className="bg-leaf-600 hover:bg-leaf-700 w-full sm:w-auto"
            onClick={() => navigate('/agent/add-crop')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Crop
          </Button>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by crop or farmer name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full sm:w-64">
            <Select value={growthStageFilter} onValueChange={setGrowthStageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by growth stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Growth Stages</SelectItem>
                {growthStages.map(stage => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCrops.map(crop => (
            <Card key={crop.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-lg">{crop.cropName}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      {crop.farmerName}
                    </div>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={
                      crop.growthStage === 'Harvesting' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }
                  >
                    {crop.growthStage}
                  </Badge>
                </div>
                
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Expected Quantity:</span>
                    <span className="font-medium">{crop.expectedQuantity} kg</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      Expected Harvest:
                    </div>
                    <span className="font-medium">{formatDate(crop.expectedHarvestDate)}</span>
                  </div>
                </div>
                
                {crop.notes && (
                  <div className="mt-3 pt-3 border-t text-sm">
                    <span className="font-medium">Notes:</span> {crop.notes}
                  </div>
                )}
                
                <div className="mt-3 pt-3 border-t flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    className="text-xs hover:bg-leaf-50 hover:text-leaf-700 p-0 h-auto" 
                    onClick={() => navigate('/agent/updates')}
                  >
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    Add Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredCrops.length === 0 && (
            <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-muted-foreground mb-4">No active crops found matching your criteria.</p>
              <Button onClick={() => navigate('/agent/add-crop')} className="bg-leaf-600 hover:bg-leaf-700">
                Add Your First Crop
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActiveCrops;
