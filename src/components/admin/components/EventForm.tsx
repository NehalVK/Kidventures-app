
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Event } from "@/types/admin";

interface EventFormProps {
  event: Partial<Event>;
  onChange: (field: keyof Event, value: string | number) => void;
  onSubmit: () => void;
  submitLabel: string;
}

const EventForm = ({ event, onChange, onSubmit, submitLabel }: EventFormProps) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="title">Event Title</Label>
      <Input
        id="title"
        value={event.title || ""}
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="Enter event title"
      />
    </div>
    <div>
      <Label htmlFor="date">Date</Label>
      <Input
        id="date"
        type="date"
        value={event.date || ""}
        onChange={(e) => onChange("date", e.target.value)}
      />
    </div>
    <div>
      <Label htmlFor="venue">Venue</Label>
      <Input
        id="venue"
        value={event.venue || ""}
        onChange={(e) => onChange("venue", e.target.value)}
        placeholder="Enter venue location"
      />
    </div>
    <div>
      <Label htmlFor="capacity">Capacity</Label>
      <Input
        id="capacity"
        type="number"
        value={event.capacity || 0}
        onChange={(e) => onChange("capacity", parseInt(e.target.value) || 0)}
        placeholder="Enter maximum capacity"
      />
    </div>
    <Button onClick={onSubmit} className="w-full">
      {submitLabel}
    </Button>
  </div>
);

export default EventForm;
