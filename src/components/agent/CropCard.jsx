
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Sprout } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const CropCard = ({ crop }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'flowering':
        return 'bg-blue-100 text-blue-800';
      case 'harvesting':
        return 'bg-green-100 text-green-800';
      case 'growing':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="hover:border-leaf-300 transition-all">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-leaf-50 rounded-full">
            <Sprout className="h-5 w-5 text-leaf-600" />
          </div>
          <div>
            <h3 className="font-medium">{crop.name}</h3>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className={getStatusColor(crop.stage)}>
                {crop.stage}
              </Badge>
            </div>
          </div>
        </div>
        
        {crop.quantity && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Quantity:</span>
            <span className="font-medium">{crop.quantity} kg</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <div className="text-sm text-muted-foreground w-full">
          Expected by: <span className="text-foreground font-medium">{crop.expectedDate}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CropCard;
