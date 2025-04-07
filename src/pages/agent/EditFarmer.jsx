
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

const EditFarmer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { farmers, updateFarmer } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    landSize: '',
    notes: ''
  });
  
  useEffect(() => {
    // Find the farmer by ID
    const farmerId = parseInt(id);
    const farmer = farmers.find(f => f.id === farmerId);
    
    // If farmer found, populate the form
    if (farmer) {
      setFormData({
        name: farmer.name,
        village: farmer.village,
        landSize: farmer.landSize,
        notes: farmer.notes || ''
      });
    } else {
      // If farmer not found, show an error and redirect
      toast.error("Farmer not found");
      navigate('/agent/farmers');
    }
  }, [id, navigate, farmers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update farmer using context function
    updateFarmer(id, {
      name: formData.name,
      village: formData.village,
      landSize: formData.landSize,
      notes: formData.notes,
      lastUpdate: new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
    });
    
    toast.success("Farmer details updated successfully!");
    navigate(`/agent/farmers/${id}`);
  };

  return (
    <DashboardLayout userType="Agent" userName="Ravi Kumar">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(`/agent/farmers/${id}`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Farmer Details</h1>
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
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(`/agent/farmers/${id}`)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-leaf-600 hover:bg-leaf-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditFarmer;
