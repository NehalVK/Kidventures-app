
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Event } from "@/types/admin";

interface EventTableProps {
  events: Event[];
  filteredEvents: Event[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onView: (event: Event) => void;
  onEdit: (event: Event) => void;
  onDelete: (eventId: number) => void;
  getStatusBadge: (status: string) => JSX.Element;
  getRegistrationStatus: (registered: number, capacity: number) => string;
}

const EventTable = ({
  events,
  filteredEvents,
  searchTerm,
  setSearchTerm,
  onView,
  onEdit,
  onDelete,
  getStatusBadge,
  getRegistrationStatus
}: EventTableProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        All Events ({events.length})
      </CardTitle>
      <div className="flex items-center gap-4 mt-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events by title or venue..."
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
              <th className="text-left p-4 font-medium">Event</th>
              <th className="text-left p-4 font-medium">Date & Venue</th>
              <th className="text-left p-4 font-medium">Registration</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-medium text-gray-900">{event.title}</div>
                  <div className="text-sm text-gray-500">ID: {event.id}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{event.venue}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{event.registered}/{event.capacity}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getRegistrationStatus(event.registered, event.capacity)}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(event.status)}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => onView(event)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onEdit(event)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(event.id)}
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
);

export default EventTable;
