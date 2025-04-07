
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { Users, Sprout, CheckSquare, Leaf, TrendingUp, Calendar, Activity } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/agent/StatCard';
import FarmerCard from '@/components/agent/FarmerCard';
import CropCard from '@/components/agent/CropCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AgentDashboard = () => {
  const { farmers, activeCrops, farmerUpdates } = useAppContext();
  
  // Agent information
  const agentInfo = {
    name: "Ravi Kumar",
    id: "AG-34",
    region: "West Nashik Agricultural Zone"
  };

  return (
    <DashboardLayout userType="Agent" userName={agentInfo.name}>
      <div className="mb-6">
        <div className="bg-gradient-to-r from-leaf-50 to-green-50 p-6 rounded-lg border border-leaf-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Agent Dashboard</h1>
              <div className="text-muted-foreground">
                <p>ID: {agentInfo.id} | Region: {agentInfo.region}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/agent/farmers/add">
                <Button className="bg-leaf-600 hover:bg-leaf-700">
                  <Users className="mr-2 h-4 w-4" /> Add Farmer
                </Button>
              </Link>
              <Link to="/agent/active-crops">
                <Button variant="outline" className="border-leaf-200 text-leaf-700">
                  <Sprout className="mr-2 h-4 w-4" /> View Crops
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <StatCard 
          title="Total Farmers" 
          value={farmers.length.toString()} 
          icon={<Users size={18} />} 
        />
        <StatCard 
          title="Active Crops" 
          value={activeCrops.length.toString()} 
          icon={<Sprout size={18} />} 
        />
        <StatCard 
          title="Fulfilled Orders" 
          value="27" 
          icon={<CheckSquare size={18} />} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-leaf-700" /> Recent Farmers
            </h2>
            <Link to="/agent/farmers">
              <Button variant="link" className="text-leaf-700">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {farmers.slice(0, 2).map(farmer => (
              <FarmerCard key={farmer.id} farmer={farmer} />
            ))}
            {farmers.length === 0 && (
              <Card className="bg-gray-50">
                <CardContent className="py-6 text-center">
                  <p className="text-muted-foreground">No farmers added yet.</p>
                  <Link to="/agent/farmers/add" className="mt-2 inline-block">
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-1" /> Add Farmer
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Sprout className="h-5 w-5 text-leaf-700" /> Active Crops
            </h2>
            <Link to="/agent/active-crops">
              <Button variant="link" className="text-leaf-700">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {activeCrops.slice(0, 2).map(crop => (
              <Card key={crop.id} className="overflow-hidden hover:border-leaf-300 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-leaf-600" />
                        <h3 className="font-medium text-lg">{crop.cropName}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{crop.farmerName}</p>
                    </div>
                    <div className="bg-leaf-50 text-leaf-700 px-2 py-1 rounded text-xs font-medium">
                      {crop.growthStage}
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Expected Quantity:</span>
                      <span>{crop.expectedQuantity} kg</span>
                    </div>
                    {crop.expectedHarvestDate && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Harvest Date:</span>
                        <span>{new Date(crop.expectedHarvestDate).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {activeCrops.length === 0 && (
              <Card className="bg-gray-50">
                <CardContent className="py-6 text-center">
                  <p className="text-muted-foreground">No active crops yet.</p>
                  <Link to="/agent/farmers/add" className="mt-2 inline-block">
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-1" /> Add Crops
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Activity className="h-5 w-5 text-leaf-700" /> Recent Updates
          </h2>
          <Link to="/agent/updates">
            <Button variant="link" className="text-leaf-700">View All</Button>
          </Link>
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {farmerUpdates.length > 0 ? (
              <div>
                {farmerUpdates.slice(0, 3).map((update, index) => (
                  <div key={update.id} className={`p-4 ${index !== farmerUpdates.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium">
                          {farmers.find(f => f.id === update.farmerId)?.name || 'Unknown Farmer'}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">{update.date}</span>
                      </div>
                      {update.crops && update.crops.length > 0 && (
                        <div className="flex gap-1">
                          {update.crops.map((crop, i) => (
                            <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {crop.name}: {crop.quantity} kg
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-sm">{update.notes}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No updates available.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
