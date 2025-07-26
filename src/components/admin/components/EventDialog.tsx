
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Event } from "@/types/admin";

interface EventDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventDialog = ({ event, open, onOpenChange }: EventDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Event Details</DialogTitle>
      </DialogHeader>
      {event && (
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <p className="text-sm text-gray-600">{event.title}</p>
          </div>
          <div>
            <Label>Date</Label>
            <p className="text-sm text-gray-600">{event.date}</p>
          </div>
          <div>
            <Label>Venue</Label>
            <p className="text-sm text-gray-600">{event.venue}</p>
          </div>
          <div>
            <Label>Capacity</Label>
            <p className="text-sm text-gray-600">{event.capacity}</p>
          </div>
          <div>
            <Label>Registered</Label>
            <p className="text-sm text-gray-600">{event.registered}</p>
          </div>
          <div>
            <Label>Status</Label>
            <p className="text-sm text-gray-600">{event.status}</p>
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

export default EventDialog;
