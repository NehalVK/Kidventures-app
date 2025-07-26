
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { hashPassword, validateSession, SecureRateLimiter } from "@/utils/securityUtils";

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string; role: string } | null;
  sessionExpiry: number | null;
}

export const useSecureAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    sessionExpiry: null
  });
  const [isLocked, setIsLocked] = useState(false);
  const { toast } = useToast();

  const rateLimiter = new SecureRateLimiter();
  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  useEffect(() => {
    checkExistingSession();
  }, []);

  // Auto logout when session expires
  useEffect(() => {
    if (authState.sessionExpiry) {
      const timeout = setTimeout(() => {
        logout();
        toast({
          title: "Session Expired",
          description: "Please log in again for security",
          variant: "destructive"
        });
      }, authState.sessionExpiry - Date.now());

      return () => clearTimeout(timeout);
    }
  }, [authState.sessionExpiry]);

  const checkExistingSession = () => {
    try {
      const sessionData = sessionStorage.getItem('admin_session');
      const lockoutTime = localStorage.getItem('lockout_time');

      if (lockoutTime && Date.now() < parseInt(lockoutTime)) {
        setIsLocked(true);
        return;
      }

      if (sessionData) {
        const session = JSON.parse(sessionData);
        if (validateSession(session)) {
          setAuthState({
            isAuthenticated: true,
            user: session.user,
            sessionExpiry: session.expiry
          });
        } else {
          clearSession();
        }
      }
    } catch (error) {
      // Don't log sensitive errors
      clearSession();
    }
  };

  const validateCredentials = async (username: string, password: string): Promise<boolean> => {
    // Simulate secure credential validation with delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Get stored password hash or default
      const storedPasswordHash = localStorage.getItem('admin_password_hash');
      const defaultPasswordHash = await hashPassword('admin123');
      const targetHash = storedPasswordHash || defaultPasswordHash;
      
      const providedHash = await hashPassword(password);
      const isValidAdmin = username.toLowerCase() === "admin" && providedHash === targetHash;
      
      return isValidAdmin;
    } catch (error) {
      return false;
    }
  };

  const clearSession = () => {
    sessionStorage.removeItem('admin_session');
    setAuthState({
      isAuthenticated: false,
      user: null,
      sessionExpiry: null
    });
  };

  const clearAllAuthData = () => {
    localStorage.removeItem('lockout_time');
    localStorage.removeItem('admin_password_hash');
    sessionStorage.removeItem('admin_session');
    rateLimiter.clear('admin_login');
    setIsLocked(false);
    setAuthState({
      isAuthenticated: false,
      user: null,
      sessionExpiry: null
    });
  };

  const resetLockout = () => {
    localStorage.removeItem('lockout_time');
    rateLimiter.clear('admin_login');
    setIsLocked(false);
    toast({
      title: "Account Unlocked",
      description: "You can now try logging in again.",
    });
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    if (isLocked) {
      const lockoutTime = localStorage.getItem('lockout_time');
      const remainingTime = lockoutTime ? Math.ceil((parseInt(lockoutTime) - Date.now()) / 60000) : 0;
      toast({
        title: "Account Locked",
        description: `Too many failed attempts. Try again in ${remainingTime} minutes.`,
        variant: "destructive"
      });
      return false;
    }

    if (!rateLimiter.isAllowed('admin_login')) {
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime('admin_login') / 60000);
      setIsLocked(true);
      localStorage.setItem('lockout_time', (Date.now() + LOCKOUT_DURATION).toString());
      toast({
        title: "Too Many Attempts",
        description: `Account locked for security. Try again in ${remainingTime} minutes.`,
        variant: "destructive"
      });
      return false;
    }

    try {
      const isValid = await validateCredentials(username, password);

      if (isValid) {
        const expiry = Date.now() + SESSION_DURATION;
        const sessionData = {
          user: { username, role: 'admin' },
          expiry,
          timestamp: Date.now()
        };

        sessionStorage.setItem('admin_session', JSON.stringify(sessionData));
        setAuthState({
          isAuthenticated: true,
          user: sessionData.user,
          sessionExpiry: expiry
        });

        // Clear lockout on successful login
        rateLimiter.clear('admin_login');
        localStorage.removeItem('lockout_time');
        setIsLocked(false);

        return true;
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid credentials provided.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Authentication service temporarily unavailable.",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    clearSession();
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      // Validate current password
      const isCurrentValid = await validateCredentials('admin', currentPassword);
      if (!isCurrentValid) {
        return false;
      }

      // Hash and store new password
      const newPasswordHash = await hashPassword(newPassword);
      localStorage.setItem('admin_password_hash', newPasswordHash);
      
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    login,
    logout,
    resetLockout,
    clearAllAuthData,
    updatePassword,
    isLocked
  };
};
