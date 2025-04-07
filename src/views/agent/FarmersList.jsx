
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext'; 
import DashboardLayout from '@/components/DashboardLayout';
import FarmerCard from '@/components/agent/FarmerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, Users, Filter } from 'lucide-react';

const FarmersList = () => {
  const { farmers } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredFarmers = farmers.filter(farmer => 
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (farmer.crops && farmer.crops.some(crop => 
      crop.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  return (
    <DashboardLayout userType="Agent" userName="Ravi Kumar">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Farmers</h1>
          <p className="text-muted-foreground">Manage and view farmer information</p>
        </div>
        
        <Link to="/agent/farmers/add">
          <Button className="bg-leaf-600 hover:bg-leaf-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Farmer
          </Button>
        </Link>
      </div>
      
      <div className="bg-gradient-to-r from-leaf-50 to-green-50 p-6 rounded-lg mb-6 border border-leaf-100">
        <div className="flex items-center gap-3">
          <div className="bg-white p-3 rounded-full">
            <Users className="h-6 w-6 text-leaf-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-leaf-700">Manage Your Farmer Network</h2>
            <p className="text-muted-foreground">
              Track crops, updates, and manage information for all registered farmers.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search farmers by name, village, or crop..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredFarmers.map(farmer => (
          <FarmerCard key={farmer.id} farmer={farmer} />
        ))}
        
        {filteredFarmers.length === 0 && (
          <div className="col-span-full">
            <Card className="bg-gray-50">
              <CardContent className="py-10 flex flex-col items-center">
                <Users className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-muted-foreground text-center mb-4">No farmers found matching your search criteria.</p>
                {searchTerm ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                    className="mt-2"
                  >
                    Clear Search
                  </Button>
                ) : (
                  <Link to="/agent/farmers/add">
                    <Button className="bg-leaf-600 hover:bg-leaf-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Farmer
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FarmersList;
