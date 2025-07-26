
import { z } from "zod";

// Enhanced input sanitization utility
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/data:/gi, '') // Remove data: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/&lt;/gi, '') // Remove encoded HTML
    .replace(/&gt;/gi, '') // Remove encoded HTML
    .replace(/&#/g, '') // Remove HTML entities
    .trim();
};

// Enhanced validation schemas with stronger security requirements
export const adminLoginSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password too long")
});

export const achievementSchema = z.object({
  childName: z.string()
    .min(2, "Child's name must be at least 2 characters")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  age: z.number()
    .min(1, "Age must be at least 1")
    .max(18, "Age must be 18 or under"),
  achievement: z.string()
    .min(5, "Achievement description too short")
    .max(200, "Achievement description too long"),
  category: z.enum(["academic", "arts", "sports", "music", "science", "community"]),
  description: z.string()
    .max(1000, "Description too long")
    .optional(),
  location: z.string()
    .max(100, "Location too long")
    .optional(),
  parentName: z.string()
    .min(2, "Parent name must be at least 2 characters")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .optional(),
  parentEmail: z.string()
    .email("Invalid email format")
    .optional(),
  parentPhone: z.string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number format")
    .optional()
});

export const validateAndSanitize = <T>(schema: z.ZodSchema<T>, data: any): { success: boolean; data?: T; errors?: string[] } => {
  try {
    // Enhanced sanitization for string inputs
    const sanitizedData = Object.keys(data).reduce((acc, key) => {
      const value = data[key];
      if (typeof value === 'string') {
        acc[key] = sanitizeInput(value);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as any);

    const result = schema.parse(sanitizedData);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
    return { success: false, errors: ["Validation failed"] };
  }
};

// Enhanced rate limiting utility with security features
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number; blocked: boolean }> = new Map();

  isAllowed(key: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now();
    const record = this.attempts.get(key);

    if (!record || now > record.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + windowMs, blocked: false });
      return true;
    }

    if (record.blocked || record.count >= maxAttempts) {
      record.blocked = true;
      return false;
    }

    record.count++;
    return true;
  }

  getRemainingTime(key: string): number {
    const record = this.attempts.get(key);
    return record ? Math.max(0, record.resetTime - Date.now()) : 0;
  }

  clearAttempts(key: string): void {
    this.attempts.delete(key);
  }

  isBlocked(key: string): boolean {
    const record = this.attempts.get(key);
    return record ? record.blocked : false;
  }
}

// Content Security Policy helper
export const getCSPNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
};

// Secure token generation
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
