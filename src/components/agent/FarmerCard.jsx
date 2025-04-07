
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, Map, Calendar } from 'lucide-react';

const FarmerCard = ({ farmer }) => {
  return (
    <Card className="hover:border-leaf-300 transition-all overflow-hidden">
      <div className="bg-gradient-to-r from-leaf-100 to-green-100 h-2" />
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="bg-leaf-50 p-2 rounded-full">
              <User className="h-5 w-5 text-leaf-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">{farmer.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Map className="h-3 w-3" />
                <span>Village {farmer.village}</span>
              </div>
            </div>
          </div>
          <div className="bg-leaf-50 text-leaf-700 px-2 py-1 rounded text-xs font-medium">
            {farmer.landSize} acres
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-sm text-muted-foreground mb-2">Crops:</div>
          <div className="flex flex-wrap gap-1">
            {farmer.crops && farmer.crops.length > 0 ? (
              farmer.crops.map((crop, index) => (
                <Badge key={index} variant="outline" className="bg-leaf-50 text-leaf-800 hover:bg-leaf-100">
                  {crop}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">No crops added yet</span>
            )}
          </div>
        </div>
        
        {farmer.lastUpdate && (
          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Last update: {farmer.lastUpdate}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Link 
          to={`/agent/farmers/${farmer.id}`}
          className="text-sm text-leaf-700 hover:text-leaf-800 flex items-center gap-1 ml-auto"
        >
          View Details <ArrowRight size={16} />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FarmerCard;
