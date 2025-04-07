
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Building, User, Users, MapPin, Save } from 'lucide-react';

const CommunityProfile = () => {
  const { communityProfile, updateCommunityProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: communityProfile?.name || "",
    address: communityProfile?.address || "",
    headName: communityProfile?.head?.name || "",
    headPhone: communityProfile?.head?.phone || "",
    headEmail: communityProfile?.head?.email || "",
    alternateContact: communityProfile?.head?.alternateContact || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update community profile in context
    updateCommunityProfile({
      name: formData.name,
      address: formData.address,
      head: {
        name: formData.headName,
        phone: formData.headPhone,
        email: formData.headEmail,
        alternateContact: formData.alternateContact
      }
    });
    
    toast.success("Community profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <DashboardLayout userType="Community Head" userName={formData.headName}>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Community Profile</h1>
            <p className="text-muted-foreground">View and update your community information</p>
          </div>
          
          {!isEditing && (
            <Button 
              onClick={() => setIsEditing(true)} 
              className="w-full sm:w-auto bg-leaf-600 hover:bg-leaf-700"
            >
              Edit Profile
            </Button>
          )}
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building size={18} className="text-leaf-700" />
                Community Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Community Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Community Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label className="text-muted-foreground">Community Name</Label>
                    <p className="font-medium">{communityProfile?.name}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Community ID</Label>
                    <p className="font-medium">{communityProfile?.id}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Address</Label>
                    <p className="font-medium">{communityProfile?.address}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Region</Label>
                    <p className="font-medium">{communityProfile?.region}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Established</Label>
                    <p className="font-medium">{communityProfile?.established}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Members</Label>
                    <p className="font-medium">{communityProfile?.membersCount}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User size={18} className="text-leaf-700" />
                Community Head & Contact Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="headName">Head Name</Label>
                    <Input
                      id="headName"
                      name="headName"
                      value={formData.headName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="headPhone">Phone Number</Label>
                    <Input
                      id="headPhone"
                      name="headPhone"
                      value={formData.headPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="headEmail">Email Address</Label>
                    <Input
                      id="headEmail"
                      name="headEmail"
                      type="email"
                      value={formData.headEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="alternateContact">Alternate Contact</Label>
                    <Input
                      id="alternateContact"
                      name="alternateContact"
                      value={formData.alternateContact}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-leaf-600 hover:bg-leaf-700"
                      onClick={handleSubmit}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label className="text-muted-foreground">Head Name</Label>
                    <p className="font-medium">{communityProfile?.head?.name}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Phone Number</Label>
                    <p className="font-medium">{communityProfile?.head?.phone}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Email Address</Label>
                    <p className="font-medium">{communityProfile?.head?.email}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Alternate Contact</Label>
                    <p className="font-medium">{communityProfile?.head?.alternateContact}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users size={18} className="text-leaf-700" />
                Assigned Agent Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-muted-foreground">Agent Name</Label>
                  <p className="font-medium">{communityProfile?.agent?.name}</p>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Agent ID</Label>
                  <p className="font-medium">{communityProfile?.agent?.id}</p>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Contact Number</Label>
                  <p className="font-medium">{communityProfile?.agent?.contact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommunityProfile;
