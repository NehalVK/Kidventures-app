import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Reply, 
  Trash2, 
  Eye, 
  Mail,
  MailOpen,
  Star,
  Archive,
  Send
} from "lucide-react";
import { Message } from "@/types/admin";

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "John Watson",
      email: "john@example.com",
      subject: "Question about Reading Program",
      message: "I'd like to know more about the reading program for my daughter Emma. What are the requirements and how can she participate?",
      date: "2024-07-02",
      status: "unread"
    },
    {
      id: 2,
      from: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "Event Registration Issue",
      message: "I'm having trouble registering my son Alex for the Science Fair. The registration form seems to be not working properly.",
      date: "2024-07-01",
      status: "read"
    },
    {
      id: 3,
      from: "Mike Davis",
      email: "mike@example.com",
      subject: "Achievement Submission",
      message: "I would like to submit my daughter's art competition win for recognition on the platform. Please let me know the process.",
      date: "2024-06-30",
      status: "replied"
    },
    {
      id: 4,
      from: "Lisa Smith",
      email: "lisa@example.com",
      subject: "Technical Support",
      message: "The mobile app is not loading properly on my device. I've tried refreshing but the issue persists.",
      date: "2024-06-29",
      status: "archived"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [composeMessage, setComposeMessage] = useState({
    to: "",
    subject: "",
    message: ""
  });

  const filteredMessages = messages.filter(message =>
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (composeMessage.to && composeMessage.subject && composeMessage.message) {
      // In a real app, this would send an email
      console.log("Sending message:", composeMessage);
      setComposeMessage({ to: "", subject: "", message: "" });
      setShowComposeForm(false);
    }
  };

  const handleReplyToMessage = (message: Message) => {
    setReplyingTo(message);
    setComposeMessage({
      to: message.email,
      subject: `Re: ${message.subject}`,
      message: ""
    });
    setShowComposeForm(true);
  };

  const handleSendReply = () => {
    if (replyingTo && composeMessage.message) {
      handleStatusChange(replyingTo.id, 'replied');
      console.log("Sending reply to:", replyingTo.email, composeMessage);
      setComposeMessage({ to: "", subject: "", message: "" });
      setReplyingTo(null);
      setShowComposeForm(false);
    }
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      handleStatusChange(message.id, 'read');
    }
  };

  const handleStatusChange = (messageId: number, newStatus: string) => {
    setMessages(messages.map(message =>
      message.id === messageId ? { ...message, status: newStatus } : message
    ));
  };

  const handleDeleteMessage = (messageId: number) => {
    setMessages(messages.filter(message => message.id !== messageId));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <Badge className="bg-blue-100 text-blue-800"><Mail className="w-3 h-3 mr-1" />Unread</Badge>;
      case 'read':
        return <Badge className="bg-gray-100 text-gray-800"><MailOpen className="w-3 h-3 mr-1" />Read</Badge>;
      case 'replied':
        return <Badge className="bg-green-100 text-green-800"><Reply className="w-3 h-3 mr-1" />Replied</Badge>;
      case 'archived':
        return <Badge className="bg-yellow-100 text-yellow-800"><Archive className="w-3 h-3 mr-1" />Archived</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getPriorityIcon = (subject: string) => {
    if (subject.toLowerCase().includes('urgent') || subject.toLowerCase().includes('emergency')) {
      return <Star className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Message Center</h1>
          <p className="text-gray-600 mt-2">Manage messages and communications from users</p>
        </div>
        <Dialog open={showComposeForm} onOpenChange={setShowComposeForm}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Compose Message
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{replyingTo ? 'Reply to Message' : 'Compose Message'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  value={composeMessage.to}
                  onChange={(e) => setComposeMessage({ ...composeMessage, to: e.target.value })}
                  placeholder="Enter recipient email"
                  disabled={!!replyingTo}
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={composeMessage.subject}
                  onChange={(e) => setComposeMessage({ ...composeMessage, subject: e.target.value })}
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={composeMessage.message}
                  onChange={(e) => setComposeMessage({ ...composeMessage, message: e.target.value })}
                  placeholder="Enter your message"
                  rows={6}
                />
              </div>
              <Button 
                onClick={replyingTo ? handleSendReply : handleSendMessage} 
                className="w-full"
              >
                {replyingTo ? 'Send Reply' : 'Send Message'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all-messages" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all-messages">All Messages</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="replied">Replied</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all-messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                All Messages ({messages.length})
              </CardTitle>
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search messages by sender, subject, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Sender</th>
                      <th className="text-left p-4 font-medium">Subject</th>
                      <th className="text-left p-4 font-medium">Message Preview</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMessages.map((message) => (
                      <tr key={message.id} className={`border-b hover:bg-gray-50 ${message.status === 'unread' ? 'bg-blue-50' : ''}`}>
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{message.from}</div>
                          <div className="text-sm text-gray-500">{message.email}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getPriorityIcon(message.subject)}
                            <span className="font-medium">{message.subject}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {message.message}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">{message.date}</div>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(message.status)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewMessage(message)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReplyToMessage(message)}
                            >
                              <Reply className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStatusChange(message.id, 'archived')}
                            >
                              <Archive className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteMessage(message.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Messages ({messages.filter(m => m.status === 'unread').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Unread messages management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="read">
          <Card>
            <CardHeader>
              <CardTitle>Read Messages ({messages.filter(m => m.status === 'read').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Read messages management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="replied">
          <Card>
            <CardHeader>
              <CardTitle>Replied Messages ({messages.filter(m => m.status === 'replied').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Replied messages management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardHeader>
              <CardTitle>Archived Messages ({messages.filter(m => m.status === 'archived').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Archived messages management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Message Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>From</Label>
                  <p className="text-sm text-gray-600">{selectedMessage.from}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                </div>
              </div>
              <div>
                <Label>Subject</Label>
                <p className="text-sm text-gray-600">{selectedMessage.subject}</p>
              </div>
              <div>
                <Label>Date</Label>
                <p className="text-sm text-gray-600">{selectedMessage.date}</p>
              </div>
              <div>
                <Label>Status</Label>
                <div className="mt-1">{getStatusBadge(selectedMessage.status)}</div>
              </div>
              <div>
                <Label>Message</Label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{selectedMessage.message}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleReplyToMessage(selectedMessage)}>
                  <Reply className="w-4 h-4 mr-2" />
                  Reply
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleStatusChange(selectedMessage.id, 'archived')}
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;
