
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Pencil, 
  User, 
  Map, 
  Leaf,
  ClipboardList
} from 'lucide-react';

const FarmerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { farmers, farmerUpdates } = useAppContext();
  const farmerId = parseInt(id);
  
  // Find the farmer by ID
  const farmer = farmers.find(f => f.id === farmerId);
  
  // Find updates for this farmer
  const updates = farmerUpdates.filter(update => update.farmerId === farmerId);
  
  // If farmer not found
  if (!farmer) {
    return (
      <DashboardLayout userType="Agent" userName="Ravi Kumar">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold mb-4">Farmer Not Found</h1>
          <p className="mb-6">The farmer you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/agent/farmers')}>
            Return to Farmers List
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout userType="Agent" userName="Ravi Kumar">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/agent/farmers')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{farmer.name}</h1>
              <p className="text-muted-foreground">Farmer ID: {farmer.id}</p>
            </div>
          </div>
          
          <Button 
            className="bg-leaf-600 hover:bg-leaf-700 w-full sm:w-auto"
            onClick={() => navigate(`/agent/farmers/${farmer.id}/edit`)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit Farmer
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <User size={18} className="text-leaf-700" />
                Basic Information
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Village:</span>
                  <span className="font-medium">{farmer.village}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Land Size:</span>
                  <span className="font-medium">{farmer.landSize} acres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Update:</span>
                  <span className="font-medium">{farmer.lastUpdate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Leaf size={18} className="text-leaf-700" />
                Current Crops
              </h2>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {farmer.crops.map(crop => (
                  <Badge key={crop} variant="outline" className="bg-leaf-50 text-leaf-800 hover:bg-leaf-100">
                    {crop}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Map size={18} className="text-leaf-700" />
                Notes
              </h2>
              
              <p className="text-sm">{farmer.notes || "No notes available."}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <ClipboardList size={18} className="text-leaf-700" />
              Recent Updates
            </h2>
            
            <Button 
              variant="outline" 
              className="text-leaf-700" 
              onClick={() => navigate('/agent/updates')}
            >
              Add Update
            </Button>
          </div>
          
          {updates.length > 0 ? (
            <div className="space-y-4">
              {updates.map(update => (
                <Card key={update.id} className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{update.date}</div>
                      {update.crops && update.crops.length > 0 && update.crops.map((crop, index) => (
                        <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200">
                          {crop.name}: {crop.quantity} kg
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm">
                      {update.notes}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="py-6 text-center">
                <p className="text-muted-foreground">No updates available for this farmer.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerDetail;
