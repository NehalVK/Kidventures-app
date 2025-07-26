
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";
import { validateAndSanitize } from "../utils/inputSanitizer";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required")
});

interface ForgotPasswordFormProps {
  onBack: () => void;
  isAdmin?: boolean;
}

const ForgotPasswordForm = ({ onBack, isAdmin = false }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setValidationErrors([]);

    console.log("Forgot password form submitted for:", email);

    const validation = validateAndSanitize(forgotPasswordSchema, { email });
    
    if (!validation.success) {
      setValidationErrors(validation.errors || []);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate password reset request
      console.log("Simulating password reset for:", validation.data?.email);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      console.log("Password reset simulation completed");
      
      toast({
        title: "Demo Mode - Reset Link Sent! 📧",
        description: `This is a demo. In a real app, reset instructions would be sent to ${email}`,
      });
      
    } catch (error) {
      console.error("Error in forgot password simulation:", error);
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Demo: Email Sent</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                In a real application, password reset instructions would be sent to <strong>{email}</strong>
              </p>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Demo Mode</span>
                </div>
                <p className="text-xs text-blue-700">
                  This is a demonstration. To implement real email functionality, connect to a backend service like Supabase.
                </p>
              </div>
            </div>
            <Button onClick={onBack} variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {isAdmin ? "Admin " : ""}Password Reset (Demo)
        </CardTitle>
        <p className="text-gray-600">
          Enter your email address for password reset simulation.
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">Demo Mode</span>
          </div>
          <p className="text-xs text-amber-700">
            This is a demonstration. No actual emails will be sent.
          </p>
        </div>

        {validationErrors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <ul className="text-sm text-red-700">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              autoComplete="email"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link (Demo)"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
