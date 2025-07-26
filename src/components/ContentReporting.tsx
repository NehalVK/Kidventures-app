
import { useState } from "react";
import { AlertTriangle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ContentReportingProps {
  contentId?: string;
  contentType?: string;
  onClose: () => void;
}

const ContentReporting = ({ contentId, contentType, onClose }: ContentReportingProps) => {
  const [reportReason, setReportReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const reportReasons = [
    "Inappropriate content for children",
    "Bullying or harassment", 
    "Spam or unwanted content",
    "Technical issue or bug",
    "Privacy concern",
    "Safety concern",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would send to a moderation system
      const reportData = {
        contentId,
        contentType,
        reason: reportReason,
        description,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };

      console.log("Content report submitted:", reportData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Report Submitted",
        description: "Thank you for helping keep Kidventures safe. We'll review this report within 24 hours.",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">Report Content</h2>
          </div>
          <Button 
            onClick={onClose} 
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What's the issue?
            </label>
            <select 
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a reason...</option>
              {reportReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional details (optional)
            </label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide more details about the issue..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Your safety matters:</strong> All reports are reviewed by our moderation team within 24 hours. 
              For urgent safety concerns, please contact us directly at kidventuresapp@gmail.com
            </p>
          </div>

          <div className="flex space-x-3">
            <Button 
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!reportReason || isSubmitting}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentReporting;
