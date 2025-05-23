import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import  HoverRating from "@/components/ui/hover-rating";
import { type Dispatch, type SetStateAction } from "react";

interface ReviewDialogProps {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  courseCode: string
  userName: string;
  userEmail: string;
  userAvatarUrl: string;
}

const ReviewDialog = ({ 
  isOpen, 
  onOpenChange, 
  courseCode, 
  userName, 
  userEmail, 
  userAvatarUrl }: ReviewDialogProps) => {

  const utils = api.useUtils();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [workloadRating, setWorkloadRating] = useState(0);
  const [teachingRating, setTeachingRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setDifficultyRating(0);
    setWorkloadRating(0);
    setTeachingRating(0);
    setIsAnonymous(false);
  }

  const { mutate: createReview } = api.review.createReview.useMutation({
    onSuccess: async () => {
      toast.success("Review has been created", {
        description: isAnonymous ? "Submitted anonymously" : `Submitted on behalf of ${userName}`,
      });
      resetForm();
      onOpenChange(false);
      await utils.review.getReviews.invalidate();
    },
    onError: (error) => {
      toast.error("Failed to create review", {
        description: error.message,
      });
    }
  })

  const handleSubmit = () => {
    if (!title) {
      toast.error("Your title cannot be empty", {
        description: "Please enter a title",
      });
      return;
    }
    if (!content) {
      toast.error("Your review cannot be empty", {
        description: "Please enter a review",
      });
      return;
    }

    if (difficultyRating === 0) {
      toast.error("Your difficulty rating cannot be empty", {
        description: "Please give a rating for difficulty",
      });
      return;
    }
    
    if (workloadRating === 0) {
      toast.error("Your workload rating cannot be empty", {
        description: "Please give a rating for workload",
      });
      return;
    }

    if (teachingRating === 0) {
      toast.error("Your teaching rating cannot be empty", {
        description: "Please give a rating for teaching",
      });
      return;
    }

    createReview({
      courseCode,
      title,
      content,
      difficultyRating,
      workloadRating,
      teachingRating,
      userName: isAnonymous ? "Anonymous" : userName,
      userEmail: isAnonymous ? "Anonymous" : userEmail,
      userAvatarUrl: isAnonymous ? "Anonymous" : userAvatarUrl,
      isAnonymous,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Submit a Review</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600">
            Please write your review below; make sure you read the terms and conditions before posting.
          </p>
          
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // className="max-w-full"
          />
          
          <Textarea
            placeholder="Feel free to discuss your experience with the assessments, labs, final exams, the difficulty of core concepts/managing workload, your overall enjoyability or how strongly you recommend it as an elective."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className=""
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
            <HoverRating 
              value={difficultyRating} 
              onChange={setDifficultyRating} 
              label="Difficulty"
            />
            
            <HoverRating 
              value={workloadRating} 
              onChange={setWorkloadRating} 
              label="Workload" 
            />
            
            <HoverRating 
              value={teachingRating} 
              onChange={setTeachingRating} 
              label="Teaching" 
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="anonymous" 
              checked={isAnonymous} 
              onCheckedChange={(checked) => setIsAnonymous(!!checked)} 
            />
            <label role="button" htmlFor="anonymous" className="text-sm font-medium">
              Display as Anonymous
            </label>
          </div>
          
          <p className="text-xs text-gray-500">
            By clicking Submit, you have agreed to the{" "}
            <a href="#" className="text-amber-500 hover:underline">
              Terms and Conditions
            </a>
          </p>
        </div>
        
        <DialogFooter>
          <Button
            variant="default"
            onClick={handleSubmit}
            className="text-white"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewDialog;