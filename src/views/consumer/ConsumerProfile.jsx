
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User, Home, Calendar, Save } from 'lucide-react';

const ConsumerProfile = () => {
  const { consumerProfile, updateConsumerProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: consumerProfile.name || "",
    email: consumerProfile.email || "",
    phone: consumerProfile.phone || "",
    community: consumerProfile.community || "",
    address: consumerProfile.address || ""
  });
  
  useEffect(() => {
    // Update local state when context changes
    setProfile({
      name: consumerProfile.name || "",
      email: consumerProfile.email || "",
      phone: consumerProfile.phone || "",
      community: consumerProfile.community || "",
      address: consumerProfile.address || ""
    });
  }, [consumerProfile]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateConsumerProfile(profile);
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <DashboardLayout userType="Consumer" userName={profile.name}>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">View and update your profile information</p>
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
                <User size={18} className="text-leaf-700" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Full Name</Label>
                    <p className="font-medium">{consumerProfile.name}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Email Address</Label>
                    <p className="font-medium">{consumerProfile.email}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Phone Number</Label>
                    <p className="font-medium">{consumerProfile.phone}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Home size={18} className="text-leaf-700" />
                Community & Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="community">Community/Village</Label>
                    <Input
                      id="community"
                      name="community"
                      value={profile.community}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      rows={4}
                      value={profile.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Community/Village</Label>
                    <p className="font-medium">{consumerProfile.community}</p>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Address</Label>
                    <p className="font-medium">{consumerProfile.address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {isEditing && (
          <div className="flex justify-end gap-3 mt-6">
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
        )}
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar size={18} className="text-leaf-700" />
              Membership Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-muted-foreground">Community ID</Label>
                <p className="font-medium">{consumerProfile.communityId}</p>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Joined Date</Label>
                <p className="font-medium">{consumerProfile.joinedDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ConsumerProfile;
