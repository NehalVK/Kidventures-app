import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Event } from "@/types/admin";
import EventForm from "./components/EventForm";
import EventTable from "./components/EventTable";
import EventDialog from "./components/EventDialog";

const AdminEventManagement = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Kids Art Workshop",
      date: "2024-07-15",
      venue: "Community Center",
      capacity: 50,
      registered: 35,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Science Fair",
      date: "2024-07-20",
      venue: "School Auditorium",
      capacity: 100,
      registered: 78,
      status: "upcoming"
    },
    {
      id: 3,
      title: "Reading Marathon",
      date: "2024-06-30",
      venue: "Public Library",
      capacity: 30,
      registered: 30,
      status: "completed"
    },
    {
      id: 4,
      title: "Music Recital",
      date: "2024-08-05",
      venue: "Music Hall",
      capacity: 80,
      registered: 25,
      status: "cancelled"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    venue: "",
    capacity: 0,
    status: "upcoming" as const
  });

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.venue && newEvent.capacity > 0) {
      const event: Event = {
        id: Math.max(...events.map(e => e.id)) + 1,
        ...newEvent,
        registered: 0
      };
      setEvents([...events, event]);
      setNewEvent({ title: "", date: "", venue: "", capacity: 0, status: "upcoming" });
      setShowAddForm(false);
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
  };

  const handleUpdateEvent = () => {
    if (editingEvent) {
      setEvents(events.map(event => event.id === editingEvent.id ? editingEvent : event));
      setEditingEvent(null);
    }
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleStatusChange = (eventId: number, newStatus: string) => {
    setEvents(events.map(event =>
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Upcoming</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800"><AlertCircle className="w-3 h-3 mr-1" />Unknown</Badge>;
    }
  };

  const getRegistrationStatus = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 100) return "Full";
    if (percentage >= 80) return "Almost Full";
    if (percentage >= 50) return "Half Full";
    return "Available";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-600 mt-2">Manage events, workshops, and activities</p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <EventForm
              event={newEvent}
              onChange={(field, value) => setNewEvent({ ...newEvent, [field]: value })}
              onSubmit={handleAddEvent}
              submitLabel="Create Event"
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all-events" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-events">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all-events" className="space-y-4">
          <EventTable
            events={events}
            filteredEvents={filteredEvents}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onView={handleViewEvent}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            getStatusBadge={getStatusBadge}
            getRegistrationStatus={getRegistrationStatus}
          />
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events ({events.filter(e => e.status === 'upcoming').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Upcoming events management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Events ({events.filter(e => e.status === 'completed').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Completed events management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Events ({events.filter(e => e.status === 'cancelled').length})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Cancelled events management will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {editingEvent && (
            <EventForm
              event={editingEvent}
              onChange={(field, value) => setEditingEvent({ ...editingEvent, [field]: value })}
              onSubmit={handleUpdateEvent}
              submitLabel="Update Event"
            />
          )}
        </DialogContent>
      </Dialog>

      <EventDialog
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={(open) => { if (!open) setSelectedEvent(null); }}
      />
    </div>
  );
};

export default AdminEventManagement;
