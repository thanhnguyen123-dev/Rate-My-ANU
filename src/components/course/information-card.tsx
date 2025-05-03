import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DescriptionCardProps {
  courseCode: string;
  name: string;
  units: number;
  modeOfDelivery: string;
  year: number;
  prerequisites: string[];
  description: string[];
}

const InformationCard = ({ 
  courseCode, 
  name, 
  units, 
  modeOfDelivery, 
  year, 
  prerequisites, 
  description 
}: DescriptionCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Function to determine if description is too long
  // We can define "too long" as more than 3 paragraphs or any paragraph longer than 150 characters
  const isDescriptionLong = description.length > 3 || 
    description.some(desc => desc.length > 150);
  
  // Get the truncated description (first 2 paragraphs)
  const truncatedDescription = isDescriptionLong 
    ? description.slice(0, 2) 
    : description;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">{name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Units: <span className="font-normal">{units}</span></p>
          <p className="text-sm font-medium">Mode of Delivery: <span className="font-normal">{modeOfDelivery}</span></p>
          <p className="text-sm font-medium">Year: <span className="font-normal">{year}</span></p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Prerequisites:</p>
          {prerequisites.length > 0 ? (
            <ul className="list-disc list-inside text-sm">
              {prerequisites.map((prerequisite) => (
                <li key={prerequisite}>{prerequisite}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">None</p>
          )}
        </div>
      </div>
      
      <div className="mt-4">
        <h2 className="text-sm font-medium mb-2">Description:</h2>
        <div className="space-y-2">
          {truncatedDescription.map((desc, index) => (
            <p key={index} className="text-sm">{desc}</p>
          ))}
          
          {isDescriptionLong && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsDialogOpen(true)}
              className="mt-2"
            >
              View more
            </Button>
          )}
        </div>
      </div>

      {/* Dialog for full description */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] p-6 pt-6 pb-6 pl-6 pr-2">
          <DialogHeader className="pr-6">
            <DialogTitle>
              Course Description - {courseCode}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh] pr-0 mr-0">
            <div className="space-y-4 pr-6">
              {description.map((desc, index) => (
                <p key={index} className="text-sm">{desc}</p>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InformationCard;