import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { supabase } from "@/supabase";
import { toast } from "react-toastify";
import { User } from "@supabase/supabase-js";

interface Appointment {
  id: number;
  date: string;
  time: string;
  name: string;
  description: string;
  type: string;
  user_id: string;
}

interface AppointmentListProps {
  onEdit: (appointment: Appointment) => void;
  refreshTrigger: boolean;
}

const isWithinThreeHours = (date: string, time: string): boolean => {
  const appointmentDate = new Date(`${date}T${time}`);
  const now = new Date();
  const diffInHours =
    (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  return diffInHours <= 3;
};

export default function AppointmentList({
  onEdit,
  refreshTrigger,
}: AppointmentListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(
    null,
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();
  }, []);

  const fetchAppointments = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: true });

    if (error) {
      toast.error("Error al cargar las citas");
      return;
    }

    setAppointments(data);
  };

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user, refreshTrigger]);

  const handleDelete = async (id: number) => {
    if (!user) {
      toast.error("Debes iniciar sesión");
      return;
    }

    const appointment = appointments.find((a) => a.id === id);
    if (!appointment) return;

    if (isWithinThreeHours(appointment.date, appointment.time)) {
      toast.error(
        "No se puede eliminar una cita programada para las próximas 3 horas",
      );
      setDeleteDialogOpen(false);
      return;
    }

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      toast.error("Error al eliminar la cita");
      return;
    }

    toast.success("Cita eliminada exitosamente");
    fetchAppointments();
    setDeleteDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">Mis Citas</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  {new Date(appointment.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment.type}</TableCell>
                <TableCell>{appointment.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(appointment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setAppointmentToDelete(appointment.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              tu cita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                appointmentToDelete && handleDelete(appointmentToDelete)
              }
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
