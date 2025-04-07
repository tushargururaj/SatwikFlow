
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
import { Calendar as CalendarIcon, ArrowLeft, Leaf } from 'lucide-react';

const growthStages = [
  "Germination",
  "Seedling",
  "Vegetative",
  "Budding",
  "Flowering",
  "Ripening",
  "Harvesting"
];

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

const AddCrop = () => {
  const navigate = useNavigate();
  const { farmers, addCrop } = useAppContext();
  const [formData, setFormData] = useState({
    farmerId: '',
    cropName: '',
    growthStage: '',
    expectedQuantity: '',
    expectedHarvestDate: null,
    notes: ''
  });
  const [date, setDate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (date) => {
    setDate(date);
    setFormData(prev => ({ ...prev, expectedHarvestDate: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.farmerId) {
      toast.error("Please select a farmer");
      return;
    }
    
    if (!formData.cropName) {
      toast.error("Please enter a crop name");
      return;
    }
    
    if (!formData.growthStage) {
      toast.error("Please select a growth stage");
      return;
    }
    
    // Add the crop using context
    addCrop({
      farmerId: parseInt(formData.farmerId),
      cropName: formData.cropName,
      growthStage: formData.growthStage,
      expectedQuantity: formData.expectedQuantity,
      expectedHarvestDate: formData.expectedHarvestDate,
      notes: formData.notes
    });
    
    // Success message and redirect
    toast.success("Crop added successfully!");
    navigate('/agent/active-crops');
  };

  return (
    <DashboardLayout userType="Agent" userName="Ravi Kumar">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/agent/active-crops')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Add New Crop</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="space-y-4">
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
            
            <div>
              <Label htmlFor="cropName">Crop Name</Label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    id="cropName"
                    name="cropName"
                    value={formData.cropName}
                    onChange={handleChange}
                    placeholder="Enter crop name"
                    list="crop-suggestions"
                    required
                  />
                  <datalist id="crop-suggestions">
                    {commonCrops.map(crop => (
                      <option key={crop} value={crop} />
                    ))}
                  </datalist>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="growthStage">Growth Stage</Label>
                <Select 
                  value={formData.growthStage} 
                  onValueChange={(value) => handleSelectChange('growthStage', value)}
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
                  name="expectedQuantity"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.expectedQuantity}
                  onChange={handleChange}
                  placeholder="Expected quantity in kg"
                  required
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
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes about the crop"
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/agent/active-crops')}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-leaf-600 hover:bg-leaf-700">
              <Leaf className="h-4 w-4 mr-2" />
              Add Crop
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddCrop;
