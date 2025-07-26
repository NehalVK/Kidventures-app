
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save } from "lucide-react";
import { AdminConfigurations as ConfigurationsType } from "@/types/admin";

interface AdminConfigurationsProps {
  configurations: ConfigurationsType;
  setConfigurations: React.Dispatch<React.SetStateAction<ConfigurationsType>>;
}

const AdminConfigurations = ({ configurations, setConfigurations }: AdminConfigurationsProps) => {
  const { toast } = useToast();

  const handleConfigSave = (section: string) => {
    toast({
      title: "Configuration Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            System Configurations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="ui">UI/Theme</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    value={configurations.general.siteName}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      general: { ...prev.general, siteName: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    type="email"
                    value={configurations.general.contactEmail}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      general: { ...prev.general, contactEmail: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input 
                    id="contactPhone"
                    value={configurations.general.contactPhone}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      general: { ...prev.general, contactPhone: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxUsers">Max Users Per Event</Label>
                  <Input 
                    id="maxUsers" 
                    type="number"
                    value={configurations.general.maxUsersPerEvent}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      general: { ...prev.general, maxUsersPerEvent: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea 
                  id="siteDescription"
                  value={configurations.general.siteDescription}
                  onChange={(e) => setConfigurations(prev => ({
                    ...prev,
                    general: { ...prev.general, siteDescription: e.target.value }
                  }))}
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="maintenance"
                    checked={configurations.general.maintenanceMode}
                    onCheckedChange={(checked) => setConfigurations(prev => ({
                      ...prev,
                      general: { ...prev.general, maintenanceMode: checked }
                    }))}
                  />
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="registration"
                    checked={configurations.general.registrationEnabled}
                    onCheckedChange={(checked) => setConfigurations(prev => ({
                      ...prev,
                      general: { ...prev.general, registrationEnabled: checked }
                    }))}
                  />
                  <Label htmlFor="registration">User Registration Enabled</Label>
                </div>
              </div>
              <Button onClick={() => handleConfigSave("General")} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save General Settings
              </Button>
            </TabsContent>

            <TabsContent value="ui" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="primaryColor" 
                      type="color"
                      value={configurations.ui.primaryColor}
                      onChange={(e) => setConfigurations(prev => ({
                        ...prev,
                        ui: { ...prev.ui, primaryColor: e.target.value }
                      }))}
                      className="w-20"
                    />
                    <Input 
                      value={configurations.ui.primaryColor}
                      onChange={(e) => setConfigurations(prev => ({
                        ...prev,
                        ui: { ...prev.ui, primaryColor: e.target.value }
                      }))}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="secondaryColor" 
                      type="color"
                      value={configurations.ui.secondaryColor}
                      onChange={(e) => setConfigurations(prev => ({
                        ...prev,
                        ui: { ...prev.ui, secondaryColor: e.target.value }
                      }))}
                      className="w-20"
                    />
                    <Input 
                      value={configurations.ui.secondaryColor}
                      onChange={(e) => setConfigurations(prev => ({
                        ...prev,
                        ui: { ...prev.ui, secondaryColor: e.target.value }
                      }))}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input 
                    id="logoUrl"
                    value={configurations.ui.logoUrl}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      ui: { ...prev.ui, logoUrl: e.target.value }
                    }))}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <Label htmlFor="faviconUrl">Favicon URL</Label>
                  <Input 
                    id="faviconUrl"
                    value={configurations.ui.faviconUrl}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      ui: { ...prev.ui, faviconUrl: e.target.value }
                    }))}
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea 
                  id="welcomeMessage"
                  value={configurations.ui.welcomeMessage}
                  onChange={(e) => setConfigurations(prev => ({
                    ...prev,
                    ui: { ...prev.ui, welcomeMessage: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea 
                  id="customCSS"
                  value={configurations.ui.customCSS}
                  onChange={(e) => setConfigurations(prev => ({
                    ...prev,
                    ui: { ...prev.ui, customCSS: e.target.value }
                  }))}
                  placeholder="/* Custom CSS styles */"
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="showWelcome"
                  checked={configurations.ui.showWelcomeMessage}
                  onCheckedChange={(checked) => setConfigurations(prev => ({
                    ...prev,
                    ui: { ...prev.ui, showWelcomeMessage: checked }
                  }))}
                />
                <Label htmlFor="showWelcome">Show Welcome Message</Label>
              </div>
              <Button onClick={() => handleConfigSave("UI/Theme")} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save UI Settings
              </Button>
            </TabsContent>

            <TabsContent value="email" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input 
                    id="smtpHost"
                    value={configurations.email.smtpHost}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      email: { ...prev.email, smtpHost: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input 
                    id="smtpPort"
                    value={configurations.email.smtpPort}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      email: { ...prev.email, smtpPort: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input 
                    id="smtpUsername"
                    value={configurations.email.smtpUsername}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      email: { ...prev.email, smtpUsername: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input 
                    id="smtpPassword" 
                    type="password"
                    value={configurations.email.smtpPassword}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      email: { ...prev.email, smtpPassword: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input 
                    id="fromEmail" 
                    type="email"
                    value={configurations.email.fromEmail}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      email: { ...prev.email, fromEmail: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="fromName">From Name</Label>
                  <Input 
                    id="fromName"
                    value={configurations.email.fromName}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      email: { ...prev.email, fromName: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <Button onClick={() => handleConfigSave("Email")} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Email Settings
              </Button>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input 
                    id="sessionTimeout" 
                    type="number"
                    value={configurations.security.sessionTimeout}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input 
                    id="maxLoginAttempts" 
                    type="number"
                    value={configurations.security.maxLoginAttempts}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      security: { ...prev.security, maxLoginAttempts: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Input 
                    id="lockoutDuration" 
                    type="number"
                    value={configurations.security.lockoutDuration}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      security: { ...prev.security, lockoutDuration: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="passwordMinLength">Min Password Length</Label>
                  <Input 
                    id="passwordMinLength" 
                    type="number"
                    value={configurations.security.passwordMinLength}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      security: { ...prev.security, passwordMinLength: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="emailVerification"
                    checked={configurations.security.requireEmailVerification}
                    onCheckedChange={(checked) => setConfigurations(prev => ({
                      ...prev,
                      security: { ...prev.security, requireEmailVerification: checked }
                    }))}
                  />
                  <Label htmlFor="emailVerification">Require Email Verification</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="twoFactor"
                    checked={configurations.security.twoFactorEnabled}
                    onCheckedChange={(checked) => setConfigurations(prev => ({
                      ...prev,
                      security: { ...prev.security, twoFactorEnabled: checked }
                    }))}
                  />
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                </div>
              </div>
              <Button onClick={() => handleConfigSave("Security")} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Security Settings
              </Button>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Communication Channels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="emailNotifications"
                        checked={configurations.notifications.emailNotifications}
                        onCheckedChange={(checked) => setConfigurations(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, emailNotifications: checked }
                        }))}
                      />
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="pushNotifications"
                        checked={configurations.notifications.pushNotifications}
                        onCheckedChange={(checked) => setConfigurations(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, pushNotifications: checked }
                        }))}
                      />
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="smsNotifications"
                        checked={configurations.notifications.smsNotifications}
                        onCheckedChange={(checked) => setConfigurations(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, smsNotifications: checked }
                        }))}
                      />
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="achievementNotifications"
                        checked={configurations.notifications.achievementNotifications}
                        onCheckedChange={(checked) => setConfigurations(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, achievementNotifications: checked }
                        }))}
                      />
                      <Label htmlFor="achievementNotifications">Achievement Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="eventReminders"
                        checked={configurations.notifications.eventReminders}
                        onCheckedChange={(checked) => setConfigurations(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, eventReminders: checked }
                        }))}
                      />
                      <Label htmlFor="eventReminders">Event Reminders</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="newsletter"
                        checked={configurations.notifications.newsletterEnabled}
                        onCheckedChange={(checked) => setConfigurations(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, newsletterEnabled: checked }
                        }))}
                      />
                      <Label htmlFor="newsletter">Newsletter Enabled</Label>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={() => handleConfigSave("Notifications")} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Notification Settings
              </Button>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input 
                    id="googleAnalyticsId"
                    value={configurations.analytics.googleAnalyticsId}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      analytics: { ...prev.analytics, googleAnalyticsId: e.target.value }
                    }))}
                    placeholder="GA-XXXXXXXXX-X"
                  />
                </div>
                <div>
                  <Label htmlFor="dataRetention">Data Retention (days)</Label>
                  <Input 
                    id="dataRetention" 
                    type="number"
                    value={configurations.analytics.dataRetentionDays}
                    onChange={(e) => setConfigurations(prev => ({
                      ...prev,
                      analytics: { ...prev.analytics, dataRetentionDays: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="trackingEnabled"
                    checked={configurations.analytics.trackingEnabled}
                    onCheckedChange={(checked) => setConfigurations(prev => ({
                      ...prev,
                      analytics: { ...prev.analytics, trackingEnabled: checked }
                    }))}
                  />
                  <Label htmlFor="trackingEnabled">Analytics Tracking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="cookieConsent"
                    checked={configurations.analytics.cookieConsentRequired}
                    onCheckedChange={(checked) => setConfigurations(prev => ({
                      ...prev,
                      analytics: { ...prev.analytics, cookieConsentRequired: checked }
                    }))}
                  />
                  <Label htmlFor="cookieConsent">Cookie Consent Required</Label>
                </div>
              </div>
              <Button onClick={() => handleConfigSave("Analytics")} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Analytics Settings
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminConfigurations;
