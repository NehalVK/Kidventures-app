import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Trophy, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  Award,
  Medal,
  Crown,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { Achievement } from "@/types/admin";

const AdminAchievementManagement = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      childName: "Emma Watson",
      parentName: "John Watson",
      achievement: "Completed 10 Reading Challenges",
      category: "Reading",
      date: "2024-07-01",
      status: "approved"
    },
    {
      id: 2,
      childName: "Alex Johnson",
      parentName: "Sarah Johnson",
      achievement: "Science Fair Winner",
      category: "Science",
      date: "2024-06-28",
      status: "pending"
    },
    {
      id: 3,
      childName: "Sophia Davis",
      parentName: "Mike Davis",
      achievement: "Art Competition First Place",
      category: "Arts",
      date: "2024-06-25",
      status: "approved"
    },
    {
      id: 4,
      childName: "Oliver Smith",
      parentName: "Lisa Smith",
      achievement: "Math Olympiad Bronze Medal",
      category: "Mathematics",
      date: "2024-06-20",
      status: "rejected"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [newAchievement, setNewAchievement] = useState({
    childName: "",
    parentName: "",
    achievement: "",
    category: "",
    status: "pending" as const
  });

  const filteredAchievements = achievements.filter(achievement =>
    achievement.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    achievement.achievement.toLowerCase().includes(searchTerm.toLowerCase()) ||
    achievement.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAchievement = () => {
    if (newAchievement.childName && newAchievement.achievement && newAchievement.category) {
      const achievement: Achievement = {
        id: Math.max(...achievements.map(a => a.id)) + 1,
        ...newAchievement,
        date: new Date().toISOString().split('T')[0]
      };
      setAchievements([...achievements, achievement]);
      setNewAchievement({ childName: "", parentName: "", achievement: "", category: "", status: "pending" });
      setShowAddForm(false);
    }
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setEditingAchievement(achievement);
  };

  const handleUpdateAchievement = () => {
    if (editingAchievement) {
      setAchievements(achievements.map(achievement => 
        achievement.id === editingAchievement.id ? editingAchievement : achievement
      ));
      setEditingAchievement(null);
    }
  };

  const handleViewAchievement = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
  };

  const handleStatusChange = (achievementId: number, newStatus: string) => {
    setAchievements(achievements.map(achievement =>
      achievement.id === achievementId ? { ...achievement, status: newStatus } : achievement
    ));
  };

  const handleDeleteAchievement = (achievementId: number) => {
    setAchievements(achievements.filter(achievement => achievement.id !== achievementId));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'reading':
        return <Star className="w-4 h-4 text-blue-500" />;
      case 'science':
        return <Award className="w-4 h-4 text-green-500" />;
      case 'arts':
        return <Medal className="w-4 h-4 text-purple-500" />;
      case 'mathematics':
        return <Crown className="w-4 h-4 text-orange-500" />;
      default:
        return <Trophy className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achievement Management</h1>
          <p className="text-gray-600 mt-2">Review and manage children's achievements and awards</p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Achievement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="child-name">Child Name</Label>
                <Input
                  id="child-name"
                  value={newAchievement.childName}
                  onChange={(e) => setNewAchievement({ ...newAchievement, childName: e.target.value })}
                  placeholder="Enter child's name"
                />
              </div>
              <div>
                <Label htmlFor="parent-name">Parent Name</Label>
                <Input
                  id="parent-name"
                  value={newAchievement.parentName}
                  onChange={(e) => setNewAchievement({ ...newAchievement, parentName: e.target.value })}
                  placeholder="Enter parent's name"
                />
              </div>
              <div>
                <Label htmlFor="achievement">Achievement</Label>
                <Input
                  id="achievement"
                  value={newAchievement.achievement}
                  onChange={(e) => setNewAchievement({ ...newAchievement, achievement: e.target.value })}
                  placeholder="Describe the achievement"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newAchievement.category}
                  onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value })}
                  placeholder="Enter category (e.g., Reading, Science, Arts)"
                />
              </div>
              <Button onClick={handleAddAchievement} className="w-full">
                Add Achievement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all-achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-achievements">All Achievements</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all-achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                All Achievements ({achievements.length})
              </CardTitle>
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search achievements by child name, achievement, or category..."
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
                      <th className="text-left p-4 font-medium">Child & Parent</th>
                      <th className="text-left p-4 font-medium">Achievement</th>
                      <th className="text-left p-4 font-medium">Category</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAchievements.map((achievement) => (
                      <tr key={achievement.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{achievement.childName}</div>
                          <div className="text-sm text-gray-500">Parent: {achievement.parentName}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{achievement.achievement}</div>
                          <div className="text-sm text-gray-500">ID: {achievement.id}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(achievement.category)}
                            <span className="font-medium">{achievement.category}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">{achievement.date}</div>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(achievement.status)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewAchievement(achievement)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditAchievement(achievement)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            {achievement.status === 'pending' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleStatusChange(achievement.id, 'approved')}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleStatusChange(achievement.id, 'rejected')}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteAchievement(achievement.id)}
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

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review ({achievements.filter(a => a.status === 'pending').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Pending achievements review functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Achievements ({achievements.filter(a => a.status === 'approved').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Approved achievements management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Achievements ({achievements.filter(a => a.status === 'rejected').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Rejected achievements management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingAchievement} onOpenChange={() => setEditingAchievement(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Achievement</DialogTitle>
          </DialogHeader>
          {editingAchievement && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-child-name">Child Name</Label>
                <Input
                  id="edit-child-name"
                  value={editingAchievement.childName}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, childName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-parent-name">Parent Name</Label>
                <Input
                  id="edit-parent-name"
                  value={editingAchievement.parentName}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, parentName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-achievement">Achievement</Label>
                <Input
                  id="edit-achievement"
                  value={editingAchievement.achievement}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, achievement: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={editingAchievement.category}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, category: e.target.value })}
                />
              </div>
              <Button onClick={handleUpdateAchievement} className="w-full">
                Update Achievement
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Achievement Details</DialogTitle>
          </DialogHeader>
          {selectedAchievement && (
            <div className="space-y-4">
              <div>
                <Label>Child Name</Label>
                <p className="text-sm text-gray-600">{selectedAchievement.childName}</p>
              </div>
              <div>
                <Label>Parent Name</Label>
                <p className="text-sm text-gray-600">{selectedAchievement.parentName}</p>
              </div>
              <div>
                <Label>Achievement</Label>
                <p className="text-sm text-gray-600">{selectedAchievement.achievement}</p>
              </div>
              <div>
                <Label>Category</Label>
                <p className="text-sm text-gray-600">{selectedAchievement.category}</p>
              </div>
              <div>
                <Label>Date</Label>
                <p className="text-sm text-gray-600">{selectedAchievement.date}</p>
              </div>
              <div>
                <Label>Status</Label>
                <p className="text-sm text-gray-600">{selectedAchievement.status}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAchievementManagement;
