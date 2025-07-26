import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  FileText,
  Image,
  Video,
  Music,
  Gamepad2,
  Upload,
  Download
} from "lucide-react";

interface ContentItem {
  id: number;
  title: string;
  type: string;
  category: string;
  status: string;
  author: string;
  dateCreated: string;
  lastModified: string;
  views: number;
}

const AdminContentManagement = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: 1,
      title: "ABC Learning Adventures",
      type: "video",
      category: "Early Learning",
      status: "published",
      author: "Admin",
      dateCreated: "2024-06-15",
      lastModified: "2024-07-01",
      views: 245
    },
    {
      id: 2,
      title: "Fun Math Games Collection",
      type: "game",
      category: "Mathematics",
      status: "draft",
      author: "Admin",
      dateCreated: "2024-06-20",
      lastModified: "2024-06-25",
      views: 0
    },
    {
      id: 3,
      title: "Animal Sounds Quiz",
      type: "audio",
      category: "Science",
      status: "published",
      author: "Admin",
      dateCreated: "2024-06-10",
      lastModified: "2024-06-15",
      views: 189
    },
    {
      id: 4,
      title: "Bedtime Stories Collection",
      type: "text",
      category: "Stories",
      status: "published",
      author: "Admin",
      dateCreated: "2024-05-30",
      lastModified: "2024-06-05",
      views: 567
    },
    {
      id: 5,
      title: "Coloring Pages Bundle",
      type: "image",
      category: "Arts",
      status: "review",
      author: "Admin",
      dateCreated: "2024-06-25",
      lastModified: "2024-06-28",
      views: 23
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [newContent, setNewContent] = useState({
    title: "",
    type: "text",
    category: "",
    status: "draft" as const,
    author: "Admin"
  });

  const filteredContent = contentItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContent = () => {
    if (newContent.title && newContent.category) {
      const content: ContentItem = {
        id: Math.max(...contentItems.map(c => c.id)) + 1,
        ...newContent,
        dateCreated: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        views: 0
      };
      setContentItems([...contentItems, content]);
      setNewContent({ title: "", type: "text", category: "", status: "draft", author: "Admin" });
      setShowAddForm(false);
    }
  };

  const handleEditContent = (content: ContentItem) => {
    setEditingContent(content);
  };

  const handleUpdateContent = () => {
    if (editingContent) {
      setContentItems(contentItems.map(item => 
        item.id === editingContent.id 
          ? { ...editingContent, lastModified: new Date().toISOString().split('T')[0] }
          : item
      ));
      setEditingContent(null);
    }
  };

  const handleViewContent = (content: ContentItem) => {
    setSelectedContent(content);
  };

  const handleStatusChange = (contentId: number, newStatus: string) => {
    setContentItems(contentItems.map(item =>
      item.id === contentId ? { ...item, status: newStatus, lastModified: new Date().toISOString().split('T')[0] } : item
    ));
  };

  const handleDeleteContent = (contentId: number) => {
    setContentItems(contentItems.filter(item => item.id !== contentId));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case 'review':
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>;
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <Video className="w-4 h-4 text-red-500" />;
      case 'audio':
        return <Music className="w-4 h-4 text-purple-500" />;
      case 'image':
        return <Image className="w-4 h-4 text-blue-500" />;
      case 'text':
        return <FileText className="w-4 h-4 text-green-500" />;
      case 'game':
        return <Gamepad2 className="w-4 h-4 text-orange-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-2">Manage educational content, media, and resources</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Content
          </Button>
          <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create New Content
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Content</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newContent.title}
                    onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    placeholder="Enter content title"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    value={newContent.type}
                    onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="text">Text</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                    <option value="image">Image</option>
                    <option value="game">Game</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newContent.category}
                    onChange={(e) => setNewContent({ ...newContent, category: e.target.value })}
                    placeholder="Enter category"
                  />
                </div>
                <Button onClick={handleAddContent} className="w-full">
                  Create Content
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all-content" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all-content">All Content</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="review">Under Review</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all-content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                All Content ({contentItems.length})
              </CardTitle>
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search content by title, category, or type..."
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
                      <th className="text-left p-4 font-medium">Content</th>
                      <th className="text-left p-4 font-medium">Type</th>
                      <th className="text-left p-4 font-medium">Category</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Views</th>
                      <th className="text-left p-4 font-medium">Last Modified</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContent.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">Created: {item.dateCreated}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(item.type)}
                            <span className="capitalize">{item.type}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-medium">{item.category}</span>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-medium">{item.views}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">{item.lastModified}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewContent(item)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditContent(item)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteContent(item.id)}
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

        <TabsContent value="published">
          <Card>
            <CardHeader>
              <CardTitle>Published Content ({contentItems.filter(c => c.status === 'published').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Published content management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft">
          <Card>
            <CardHeader>
              <CardTitle>Draft Content ({contentItems.filter(c => c.status === 'draft').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Draft content management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>Under Review ({contentItems.filter(c => c.status === 'review').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Content review management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardHeader>
              <CardTitle>Archived Content ({contentItems.filter(c => c.status === 'archived').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Archived content management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Content Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Content analytics and performance metrics will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingContent} onOpenChange={() => setEditingContent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>
          {editingContent && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingContent.title}
                  onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={editingContent.category}
                  onChange={(e) => setEditingContent({ ...editingContent, category: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  value={editingContent.status}
                  onChange={(e) => setEditingContent({ ...editingContent, status: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="draft">Draft</option>
                  <option value="review">Under Review</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <Button onClick={handleUpdateContent} className="w-full">
                Update Content
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedContent} onOpenChange={() => setSelectedContent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Content Details</DialogTitle>
          </DialogHeader>
          {selectedContent && (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <p className="text-sm text-gray-600">{selectedContent.title}</p>
              </div>
              <div>
                <Label>Type</Label>
                <p className="text-sm text-gray-600">{selectedContent.type}</p>
              </div>
              <div>
                <Label>Category</Label>
                <p className="text-sm text-gray-600">{selectedContent.category}</p>
              </div>
              <div>
                <Label>Status</Label>
                <p className="text-sm text-gray-600">{selectedContent.status}</p>
              </div>
              <div>
                <Label>Author</Label>
                <p className="text-sm text-gray-600">{selectedContent.author}</p>
              </div>
              <div>
                <Label>Views</Label>
                <p className="text-sm text-gray-600">{selectedContent.views}</p>
              </div>
              <div>
                <Label>Created</Label>
                <p className="text-sm text-gray-600">{selectedContent.dateCreated}</p>
              </div>
              <div>
                <Label>Last Modified</Label>
                <p className="text-sm text-gray-600">{selectedContent.lastModified}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContentManagement;
