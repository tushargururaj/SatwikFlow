
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Check, X } from 'lucide-react';

const FarmerUpdates = () => {
  const navigate = useNavigate();
  const { farmers, farmerUpdates, addFarmerUpdate } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    farmerId: '',
    notes: '',
    crops: [{ name: '', quantity: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCropChange = (index, field, value) => {
    setFormData(prev => {
      const newCrops = [...prev.crops];
      newCrops[index] = { ...newCrops[index], [field]: value };
      return { ...prev, crops: newCrops };
    });
  };

  const addCropField = () => {
    setFormData(prev => ({
      ...prev,
      crops: [...prev.crops, { name: '', quantity: '' }]
    }));
  };

  const removeCropField = (index) => {
    setFormData(prev => {
      const newCrops = [...prev.crops];
      newCrops.splice(index, 1);
      return { ...prev, crops: newCrops.length ? newCrops : [{ name: '', quantity: '' }] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that at least notes or one crop is provided
    const hasCrops = formData.crops.some(crop => crop.name && crop.quantity);
    if (!formData.notes && !hasCrops) {
      toast.error("Please provide crop details or notes");
      return;
    }

    // Find the selected farmer
    const selectedFarmer = farmers.find(f => f.id === parseInt(formData.farmerId));
    if (!selectedFarmer) {
      toast.error("Please select a valid farmer");
      return;
    }
    
    // Filter out empty crops
    const validCrops = formData.crops.filter(crop => crop.name && crop.quantity);
    
    // Create the update object
    const newUpdate = {
      farmerId: parseInt(formData.farmerId),
      farmerName: selectedFarmer.name,
      date: new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}),
      crops: validCrops,
      notes: formData.notes
    };
    
    // Add the update to context
    addFarmerUpdate(newUpdate);
    
    // Success message and form reset
    toast.success("Farmer update added successfully!");
    setShowAddForm(false);
    setFormData({
      farmerId: '',
      notes: '',
      crops: [{ name: '', quantity: '' }]
    });
  };

  const filteredUpdates = farmerUpdates.filter(update => 
    update.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    update.crops.some(crop => crop.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (update.notes && update.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const allCrops = [
    "Rice", "Wheat", "Potato", "Tomato", "Onion", "Chili", "Brinjal", "Corn"
  ];

  return (
    <DashboardLayout userType="Agent" userName="Ravi Kumar">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Farmer Updates</h1>
            <p className="text-muted-foreground">Track crop deliveries and farmer status</p>
          </div>
          
          <Button 
            className="bg-leaf-600 hover:bg-leaf-700"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Update
          </Button>
        </div>
        
        {showAddForm && (
          <Card className="mb-6 border-leaf-200">
            <CardHeader>
              <CardTitle>Add New Update</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="farmerId">Select Farmer</Label>
                  <Select 
                    value={formData.farmerId} 
                    onValueChange={(value) => handleSelectChange('farmerId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a farmer" />
                    </SelectTrigger>
                    <SelectContent>
                      {farmers.map(farmer => (
                        <SelectItem key={farmer.id} value={farmer.id.toString()}>
                          {farmer.name} - Village {farmer.village}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Crop Deliveries</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addCropField}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Crop
                    </Button>
                  </div>
                  
                  {formData.crops.map((crop, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1">
                        <Select 
                          value={crop.name} 
                          onValueChange={(value) => handleCropChange(index, 'name', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select crop" />
                          </SelectTrigger>
                          <SelectContent>
                            {allCrops.map(cropName => (
                              <SelectItem key={cropName} value={cropName}>
                                {cropName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="w-24">
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="kg"
                          value={crop.quantity}
                          onChange={(e) => handleCropChange(index, 'quantity', e.target.value)}
                        />
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeCropField(index)}
                        className="text-gray-500 hover:text-red-500"
                        disabled={formData.crops.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Add notes about crop quality, issues, etc."
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-leaf-600 hover:bg-leaf-700"
                    disabled={!formData.farmerId}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Update
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search updates by farmer name or crop..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredUpdates.map(update => (
            <Card key={update.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">{update.farmerName}</div>
                  <div className="text-sm text-muted-foreground">{update.date}</div>
                </div>
                
                {update.crops.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {update.crops.map((crop, i) => (
                      <Badge key={i} variant="outline" className="bg-leaf-50 text-leaf-800 border-leaf-200">
                        {crop.name}: {crop.quantity} kg
                      </Badge>
                    ))}
                  </div>
                )}
                
                {update.notes && (
                  <div className="text-sm mt-2">
                    <span className="font-medium">Notes:</span> {update.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {filteredUpdates.length === 0 && (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-muted-foreground">No updates found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerUpdates;
