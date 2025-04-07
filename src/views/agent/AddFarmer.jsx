
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { ArrowLeft, CalendarIcon, Plus, X, Leaf } from 'lucide-react';

const commonCrops = [
  "Rice",
  "Wheat",
  "Potato",
  "Tomato",
  "Onion",
  "Chili",
  "Brinjal",
  "Corn",
  "Sugarcane",
  "Cotton"
];

const growthStages = [
  "Germination",
  "Seedling",
  "Vegetative",
  "Budding",
  "Flowering",
  "Ripening",
  "Harvesting"
];

const AddFarmer = () => {
  const navigate = useNavigate();
  const { addFarmer, addCrop } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    landSize: '',
    notes: ''
  });
  
  const [crops, setCrops] = useState([]);
  const [currentCrop, setCurrentCrop] = useState({
    name: '',
    growthStage: '',
    expectedQuantity: '',
    expectedHarvestDate: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCropChange = (name, value) => {
    setCurrentCrop(prev => ({ ...prev, [name]: value }));
  };

  const addCropToList = () => {
    if (!currentCrop.name) {
      toast.error("Please enter a crop name");
      return;
    }
    
    if (!currentCrop.growthStage) {
      toast.error("Please select a growth stage");
      return;
    }
    
    setCrops(prev => [...prev, { ...currentCrop }]);
    setCurrentCrop({
      name: '',
      growthStage: '',
      expectedQuantity: '',
      expectedHarvestDate: null
    });
  };

  const removeCrop = (index) => {
    setCrops(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add farmer using context function
    const newFarmer = addFarmer(formData);
    
    // Add crops if any
    if (crops.length > 0) {
      crops.forEach(crop => {
        addCrop({
          farmerId: newFarmer.id,
          cropName: crop.name,
          growthStage: crop.growthStage,
          expectedQuantity: crop.expectedQuantity,
          expectedHarvestDate: crop.expectedHarvestDate,
          notes: ''
        });
      });
    }
    
    toast.success("Farmer added successfully!");
    navigate(`/agent/farmers/${newFarmer.id}`);
  };

  return (
    <DashboardLayout userType="Agent" userName="Ravi Kumar">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/agent/farmers')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Add New Farmer</h1>
        </div>
        
        <div className="bg-leaf-50 p-6 rounded-lg mb-6 border border-leaf-100">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="h-6 w-6 text-leaf-600" />
            <h2 className="text-lg font-medium text-leaf-700">Register a new farmer and their crops</h2>
          </div>
          <p className="text-muted-foreground">
            Adding a farmer with their initial crops helps track production and streamline order fulfillment.
            Make sure to include as much detail as possible for better tracking.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Farmer Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter farmer name"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="village">Village</Label>
                <Input
                  id="village"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  placeholder="Enter village name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="landSize">Land Size (acres)</Label>
                <Input
                  id="landSize"
                  name="landSize"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.landSize}
                  onChange={handleChange}
                  placeholder="Land size in acres"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes about the farmer"
                rows={4}
              />
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-3">Add Initial Crops (Optional)</h3>
              
              <div className="space-y-3 mb-4">
                <div>
                  <Label htmlFor="cropName">Crop Name</Label>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Input
                        id="cropName"
                        value={currentCrop.name}
                        onChange={(e) => handleCropChange('name', e.target.value)}
                        placeholder="Enter crop name"
                        list="crop-suggestions"
                      />
                      <datalist id="crop-suggestions">
                        {commonCrops.map(crop => (
                          <option key={crop} value={crop} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="growthStage">Growth Stage</Label>
                    <Select 
                      value={currentCrop.growthStage} 
                      onValueChange={(value) => handleCropChange('growthStage', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select growth stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {growthStages.map(stage => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="expectedQuantity">Expected Quantity (kg)</Label>
                    <Input
                      id="expectedQuantity"
                      type="number"
                      min="0"
                      step="0.1"
                      value={currentCrop.expectedQuantity}
                      onChange={(e) => handleCropChange('expectedQuantity', e.target.value)}
                      placeholder="Expected quantity in kg"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="expectedHarvestDate">Expected Harvest Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentCrop.expectedHarvestDate ? format(currentCrop.expectedHarvestDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={currentCrop.expectedHarvestDate}
                        onSelect={(date) => handleCropChange('expectedHarvestDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <Button 
                  type="button" 
                  onClick={addCropToList}
                  className="w-full bg-leaf-600 hover:bg-leaf-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Crop
                </Button>
              </div>
              
              {crops.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Added Crops:</h4>
                  <div className="space-y-2">
                    {crops.map((crop, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div>
                          <span className="font-medium">{crop.name}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            {crop.growthStage}, {crop.expectedQuantity}kg
                            {crop.expectedHarvestDate && `, Harvest: ${format(crop.expectedHarvestDate, "MMM d, yyyy")}`}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeCrop(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/agent/farmers')}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-leaf-600 hover:bg-leaf-700">
              Add Farmer
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddFarmer;
