
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  joinDate: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  venue: string;
  capacity: number;
  registered: number;
  status: string;
}

export interface Achievement {
  id: number;
  childName: string;
  parentName: string;
  achievement: string;
  category: string;
  date: string;
  status: string;
}

export interface Message {
  id: number;
  from: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: string;
}

export interface AdminConfigurations {
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    maintenanceMode: boolean;
    registrationEnabled: boolean;
    maxUsersPerEvent: number;
  };
  ui: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    faviconUrl: string;
    customCSS: string;
    showWelcomeMessage: boolean;
    welcomeMessage: string;
  };
  email: {
    smtpHost: string;
    smtpPort: string;
    smtpUsername: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  security: {
    sessionTimeout: number;
    maxLoginAttempts: number;
    lockoutDuration: number;
    requireEmailVerification: boolean;
    twoFactorEnabled: boolean;
    passwordMinLength: number;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    achievementNotifications: boolean;
    eventReminders: boolean;
    newsletterEnabled: boolean;
  };
  analytics: {
    googleAnalyticsId: string;
    trackingEnabled: boolean;
    cookieConsentRequired: boolean;
    dataRetentionDays: number;
  };
}
