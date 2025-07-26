
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { User } from "@/types/admin";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import UserDialog from "./components/UserDialog";

const AdminUserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      status: "active",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 234 567 8901",
      status: "inactive",
      joinDate: "2024-02-20"
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@example.com",
      phone: "+1 234 567 8902",
      status: "active",
      joinDate: "2024-03-10"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active" as const
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...newUser,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, user]);
      setNewUser({ name: "", email: "", phone: "", status: "active" });
      setShowAddForm(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
      setEditingUser(null);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleStatusToggle = (userId: number) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Inactive</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage registered users and their accounts</p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <UserForm
              user={newUser}
              onChange={(field, value) => setNewUser({ ...newUser, [field]: value })}
              onSubmit={handleAddUser}
              submitLabel="Add User"
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all-users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="active-users">Active Users</TabsTrigger>
          <TabsTrigger value="inactive-users">Inactive Users</TabsTrigger>
        </TabsList>

        <TabsContent value="all-users" className="space-y-4">
          <UserTable
            users={users}
            filteredUsers={filteredUsers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onView={handleViewUser}
            onEdit={handleEditUser}
            onToggleStatus={handleStatusToggle}
            onDelete={handleDeleteUser}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="active-users">
          <Card>
            <CardHeader>
              <CardTitle>Active Users ({users.filter(u => u.status === 'active').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Active users functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive-users">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Users ({users.filter(u => u.status === 'inactive').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Inactive users functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <UserForm
              user={editingUser}
              onChange={(field, value) => setEditingUser({ ...editingUser, [field]: value })}
              onSubmit={handleUpdateUser}
              submitLabel="Update User"
            />
          )}
        </DialogContent>
      </Dialog>

      <UserDialog
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(open) => { if (!open) setSelectedUser(null); }}
      />
    </div>
  );
};

export default AdminUserManagement;
