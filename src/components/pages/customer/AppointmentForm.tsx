import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  Clock,
  Calendar as CalendarIcon,
  User,
  FileText,
  CheckCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/supabase";
import { toast } from "react-toastify";
import { User as SupabaseUser } from "@supabase/supabase-js";

function StepIndicator({ step }: { step: number }) {
  const steps = [
    { title: "Fecha y Hora", icon: CalendarIcon },
    { title: "Detalles", icon: FileText },
    { title: "Confirmación", icon: CheckCircle },
  ];

  return (
    <div className="relative mb-8 px-6 pt-6">
      <div className="absolute top-11 left-6 right-6 h-0.5 bg-gray-200 dark:bg-gray-700">
        <div
          className="absolute h-full bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
      <div className="relative z-10 flex justify-between">
        {steps.map((s, i) => {
          const isCompleted = step > i + 1;
          const isCurrent = step === i + 1;
          return (
            <div key={i} className="flex flex-col items-center">
              <div
                className={cn(
                  "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                      ? "border-primary bg-white dark:bg-black text-primary"
                      : "border-gray-300 bg-background text-gray-300",
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <s.icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium",
                  isCompleted
                    ? "text-primary"
                    : isCurrent
                      ? "text-primary"
                      : "text-gray-500",
                )}
              >
                {s.title}
              </span>
              <span
                className={cn(
                  "text-xs",
                  isCompleted
                    ? "text-primary"
                    : isCurrent
                      ? "text-primary"
                      : "text-gray-400",
                )}
              >
                {isCompleted
                  ? "Completado"
                  : isCurrent
                    ? "En Progreso"
                    : "Pendiente"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface AppointmentFormProps {
  appointment?: {
    id: number;
    date: string;
    time: string;
    name: string;
    description: string;
    type: string;
  } | null;
  initialDescription?: string;
  initialType?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AppointmentForm({
  appointment,
  initialDescription,
  initialType,
  onSuccess,
  onCancel,
}: AppointmentFormProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Migration");
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.name) {
        setName(session.user.user_metadata.name);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (appointment) {
      setDate(new Date(appointment.date));
      setTime(appointment.time);
      setName(appointment.name);
      setDescription(appointment.description);
      setType(appointment.type);
    } else if (initialDescription || initialType) {
      if (initialDescription) setDescription(initialDescription);
      if (initialType) setType(initialType);
    }
  }, [appointment, initialDescription, initialType]);

  const resetForm = () => {
    setStep(1);
    setDate(new Date());
    setTime("");
    setDescription("");
    setType("Migration");

    if (user?.user_metadata?.name) {
      setName(user.user_metadata.name);
    }
  };

  useEffect(() => {
    if (appointment) {
      setDate(new Date(appointment.date));
      setTime(appointment.time);
      setDescription(appointment.description);
      setType(appointment.type);
      setStep(1);
    } else {
      resetForm();
    }
  }, [appointment]);

  const handleCancel = () => {
    resetForm();
    onCancel?.();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Debes iniciar sesión para agendar una cita");
      return;
    }

    if (!date || !time || !name || !type) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      toast.error("No puedes seleccionar una fecha pasada");
      return;
    }

    const appointmentData = {
      user_id: user.id,
      date: date?.toISOString().split("T")[0],
      time: time,
      name: name,
      description: description,
      type: type,
    };

    if (appointment) {
      const { data: existingAppointment } = await supabase
        .from("appointments")
        .select("user_id")
        .eq("id", appointment.id)
        .single();

      if (existingAppointment?.user_id !== user.id) {
        toast.error("No tienes permiso para editar esta cita");
        return;
      }

      const { error } = await supabase
        .from("appointments")
        .update(appointmentData)
        .eq("id", appointment.id)
        .eq("user_id", user.id);

      if (error) {
        toast.error(`Error al actualizar la cita: ${error.message}`);
      } else {
        toast.success("Cita actualizada exitosamente");
        resetForm();
        onSuccess?.();
      }
    } else {
      const { error } = await supabase
        .from("appointments")
        .insert([appointmentData]);

      if (error) {
        toast.error(`Error al agendar la cita: ${error.message}`);
      } else {
        toast.success(
          "Cita agendada exitosamente. Recuerda que no podrás cancelar la cita dentro de las 3 horas previas a la misma.",
        );
        resetForm();
        onSuccess?.();
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          {appointment ? "Editar Cita" : "Agendar Cita"}
        </CardTitle>
        {appointment && onCancel && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="absolute right-2 top-2 h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <StepIndicator step={step} />
      <CardContent className="px-6 pb-6">
        <form onSubmit={onSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-base font-semibold">
                    Fecha
                  </Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-base font-semibold">
                    Hora
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-500 dark:text-gray-100" />
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!date || !time}>
                  Siguiente
                </Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-base font-semibold text-gray-900 dark:text-white"
                  >
                    Nombre
                  </Label>
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="name"
                      placeholder="Tu nombre completo"
                      value={name}
                      readOnly
                      className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-base font-semibold text-gray-900 dark:text-white"
                  >
                    Descripción
                  </Label>
                  <div className="flex items-start space-x-2">
                    <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-2" />
                    <Textarea
                      id="description"
                      placeholder="Describe brevemente tu necesidad"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="flex-1 min-h-[100px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-900 dark:text-white">
                    Tipo de servicio
                  </Label>
                  <RadioGroup
                    value={type}
                    onValueChange={setType}
                    className="flex flex-col space-y-2"
                  >
                    {[
                      { value: "Migration", label: "Migración" },
                      { value: "Optimization", label: "Optimización" },
                      { value: "Automation", label: "Automatización" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                        />
                        <Label
                          htmlFor={option.value}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Anterior
                </Button>
                <Button onClick={() => setStep(3)} disabled={!name || !type}>
                  Siguiente
                </Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Confirmar Cita</h2>
                  <div className="space-y-4">
                    {[
                      {
                        icon: CalendarIcon,
                        label: "Fecha",
                        value: date?.toLocaleDateString(),
                      },
                      { icon: Clock, label: "Hora", value: time },
                      { icon: User, label: "Nombre", value: name },
                      {
                        icon: FileText,
                        label: "Descripción",
                        value: description,
                      },
                      { icon: CheckCircle, label: "Tipo", value: type },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center space-x-2"
                      >
                        <item.icon className="h-5 w-5 text-gray-500" />
                        <p className="flex flex-col sm:flex-row sm:items-center">
                          <strong className="mr-2">{item.label}:</strong>
                          <span>{item.value}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Nota: No podrás cancelar la cita dentro de las 3 horas
                      previas a la misma.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Anterior
                </Button>
                <Button type="submit">Confirmar</Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
