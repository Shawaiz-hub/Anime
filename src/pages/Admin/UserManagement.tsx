
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Search,
  Trash2,
  Edit,
  User,
  AlertTriangle,
  X,
  SaveIcon,
  Mail,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for users
const initialUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    lastLogin: "2023-04-15 14:30",
    joined: "2023-01-20",
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "user",
    status: "active",
    lastLogin: "2023-04-14 09:45",
    joined: "2023-02-10",
  },
  {
    id: "3",
    name: "David Smith",
    email: "david@example.com",
    role: "user",
    status: "inactive",
    lastLogin: "2023-03-30 16:20",
    joined: "2023-03-05",
  },
  {
    id: "4",
    name: "Shawaiz",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2023-04-15 10:15",
    joined: "2023-01-01",
  },
];

const UserManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "user",
    status: "active",
  });

  useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page",
        variant: "destructive",
      });
      navigate("/login");
    } else {
      setIsAdmin(true);
    }
  }, [navigate, toast]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditUser = (user: any) => {
    setSelectedUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsEditUserDialogOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    setUserToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      // Prevent deleting your own admin account
      const userToRemove = users.find(user => user.id === userToDelete);
      
      if (userToRemove && userToRemove.name === "Shawaiz" && userToRemove.role === "admin") {
        toast({
          title: "Cannot Delete Admin",
          description: "You cannot delete your own admin account.",
          variant: "destructive",
        });
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
        return;
      }
      
      setUsers(users.filter(user => user.id !== userToDelete));
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
      
      toast({
        title: "User Deleted",
        description: "The user has been successfully removed.",
      });
    }
  };

  const handleSubmitUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...selectedUser } : user
      ));
      
      toast({
        title: "User Updated",
        description: `User "${selectedUser.name}" has been successfully updated.`,
      });
      
      setIsSubmitting(false);
      setIsEditUserDialogOpen(false);
    }, 1000);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="mr-2 h-6 w-6" /> User Management
        </h1>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">User</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Joined</th>
                <th className="px-4 py-3 text-left font-medium">Last Login</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "admin" 
                          ? "bg-primary/20 text-primary" 
                          : "bg-secondary text-foreground"
                      }`}>
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "active" 
                          ? "bg-green-500/20 text-green-500" 
                          : "bg-red-500/20 text-red-500"
                      }`}>
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.joined}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.lastLogin}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={user.name === "Shawaiz" && user.role === "admin"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update the user details below
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitUser} className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="role">Role</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select 
                  value={selectedUser.role} 
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <div className="relative">
                <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select 
                  value={selectedUser.status} 
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, status: value })}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    <SaveIcon className="mr-2 h-4 w-4" />
                    Update User
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-500">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
