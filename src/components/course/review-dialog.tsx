import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import StarRating from "@/components/ui/star-rating";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/trpc/react";
import { toast } from "sonner";

interface ReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
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
  const [grade, setGrade] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setDifficultyRating(0);
    setWorkloadRating(0);
    setTeachingRating(0);
    setGrade("");
    setIsAnonymous(false);
  }

  const { mutate: createReview } = api.review.createReview.useMutation({
    onSuccess: async () => {
      toast("Comment has been created", {
        description: "Submitted on behalf of " + userName,
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
    if (!content) {
      toast.error("Your review cannot be empty", {
        description: "Please enter a comment",
      });
      return;
    }

    if (difficultyRating === 0 || workloadRating === 0 || teachingRating === 0) {
      toast.error("Please rate the course", {
        description: "Please rate the course on difficulty, workload, and teaching",
      });
      return;
    }

    createReview({
      courseCode,
      content,
      difficultyRating,
      workloadRating,
      teachingRating,
      userName,
      userEmail,
      userAvatarUrl,
    })
  }
}

export default ReviewDialog;