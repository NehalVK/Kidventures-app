
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/admin";

interface UserFormProps {
  user: Partial<User>;
  onChange: (field: keyof User, value: string) => void;
  onSubmit: () => void;
  submitLabel: string;
}

const UserForm = ({ user, onChange, onSubmit, submitLabel }: UserFormProps) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        value={user.name || ""}
        onChange={(e) => onChange("name", e.target.value)}
        placeholder="Enter user name"
      />
    </div>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={user.email || ""}
        onChange={(e) => onChange("email", e.target.value)}
        placeholder="Enter email address"
      />
    </div>
    <div>
      <Label htmlFor="phone">Phone</Label>
      <Input
        id="phone"
        value={user.phone || ""}
        onChange={(e) => onChange("phone", e.target.value)}
        placeholder="Enter phone number"
      />
    </div>
    <Button onClick={onSubmit} className="w-full">
      {submitLabel}
    </Button>
  </div>
);

export default UserForm;
