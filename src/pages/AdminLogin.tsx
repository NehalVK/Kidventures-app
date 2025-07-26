
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Shield, Eye, EyeOff, AlertTriangle, RotateCcw, Trash2 } from "lucide-react";
import { useSecureAuth } from "../hooks/useSecureAuth";
import { validateAndSanitize, adminLoginSchema } from "../utils/inputSanitizer";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import PasswordResetDialog from "../components/admin/PasswordResetDialog";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, login, resetLockout, clearAllAuthData, isLocked } = useSecureAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <ForgotPasswordForm 
          onBack={() => setShowForgotPassword(false)} 
          isAdmin={true}
        />
      </div>
    );
  }

  if (showPasswordReset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <PasswordResetDialog 
          open={showPasswordReset} 
          onOpenChange={setShowPasswordReset}
        />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setValidationErrors([]);

    // Validate and sanitize input
    const validation = validateAndSanitize(adminLoginSchema, credentials);
    
    if (!validation.success) {
      setValidationErrors(validation.errors || []);
      setIsLoading(false);
      return;
    }

    if (isLocked) {
      toast({
        title: "Account Locked",
        description: "Too many failed attempts. Please try again later.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(validation.data!.username, validation.data!.password);
      
      if (success) {
        toast({
          title: "Authentication Successful",
          description: "Redirecting to admin panel...",
        });
        // Force navigation
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 100);
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleClearData = () => {
    clearAllAuthData();
    toast({
      title: "Data Cleared",
      description: "All authentication data has been reset.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Secure Admin Access
          </CardTitle>
          <p className="text-sm text-gray-600">
            Enhanced security authentication system
          </p>
        </CardHeader>
        
        <CardContent>
          {isLocked && (
            <div className="mb-4 space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">Account temporarily locked for security</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={resetLockout}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Lockout
                </Button>
                <Button 
                  onClick={handleClearData}
                  variant="outline"
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Data
                </Button>
              </div>
            </div>
          )}

          {validationErrors.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <ul className="text-sm text-red-700">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <Input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                placeholder="Enter admin username"
                disabled={isLocked}
                required
                autoComplete="username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Enter admin password"
                  disabled={isLocked}
                  required
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              disabled={isLoading || isLocked}
            >
              {isLoading ? "Authenticating..." : "Secure Login"}
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-800 underline block w-full"
                disabled={isLocked}
              >
                Forgot your password?
              </button>
              
              <button
                type="button"
                onClick={() => setShowPasswordReset(true)}
                className="text-sm text-purple-600 hover:text-purple-800 underline block w-full"
                disabled={isLocked}
              >
                Reset Admin Password
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-700 text-center">
              <strong>Security Notice:</strong> Enhanced authentication with rate limiting and secure session management.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
