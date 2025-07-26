
import { z } from "zod";

// Secure password hashing using Web Crypto API
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Secure session encryption
export const encryptSessionData = async (data: any): Promise<string> => {
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encodedData
  );
  
  // For demo purposes, we'll use base64 encoding
  // In production, use proper key management
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  
  return btoa(String.fromCharCode(...combined));
};

// Input sanitization with enhanced security
export const sanitizeSecureInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data URLs
    .replace(/vbscript:/gi, '') // Remove vbscript
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .trim();
};

// Security headers utility
export const getSecurityHeaders = () => ({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
});

// CSRF token generation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Secure session validation
export const validateSession = (sessionData: any): boolean => {
  if (!sessionData || !sessionData.expiry || !sessionData.timestamp) {
    return false;
  }
  
  const now = Date.now();
  const sessionAge = now - sessionData.timestamp;
  const maxAge = 30 * 60 * 1000; // 30 minutes
  
  return sessionAge < maxAge && now < sessionData.expiry;
};

// Rate limiting with exponential backoff
export class SecureRateLimiter {
  private attempts: Map<string, { count: number; resetTime: number; backoffTime: number }> = new Map();

  isAllowed(key: string, maxAttempts: number = 5): boolean {
    const now = Date.now();
    const record = this.attempts.get(key);

    if (!record || now > record.resetTime) {
      this.attempts.set(key, { 
        count: 1, 
        resetTime: now + (15 * 60 * 1000), // 15 minutes
        backoffTime: 1000 // Start with 1 second
      });
      return true;
    }

    if (record.count >= maxAttempts) {
      // Exponential backoff
      record.backoffTime = Math.min(record.backoffTime * 2, 900000); // Max 15 minutes
      record.resetTime = now + record.backoffTime;
      return false;
    }

    record.count++;
    return true;
  }

  getRemainingTime(key: string): number {
    const record = this.attempts.get(key);
    return record ? Math.max(0, record.resetTime - Date.now()) : 0;
  }

  clear(key: string): void {
    this.attempts.delete(key);
  }
}
