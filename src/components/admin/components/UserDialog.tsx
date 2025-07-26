
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { User } from "@/types/admin";

interface UserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserDialog = ({ user, open, onOpenChange }: UserDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>User Details</DialogTitle>
      </DialogHeader>
      {user && (
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <p className="text-sm text-gray-600">{user.name}</p>
          </div>
          <div>
            <Label>Email</Label>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <div>
            <Label>Phone</Label>
            <p className="text-sm text-gray-600">{user.phone}</p>
          </div>
          <div>
            <Label>Status</Label>
            <p className="text-sm text-gray-600">{user.status}</p>
          </div>
          <div>
            <Label>Join Date</Label>
            <p className="text-sm text-gray-600">{user.joinDate}</p>
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

export default UserDialog;
