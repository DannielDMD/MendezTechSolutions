import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  List,
  Server,
  Cog,
  Terminal,
  BookOpen,
  LucideIcon,
} from "lucide-react";
import AppointmentList from "./AppointmentList";
import AppointmentForm from "./AppointmentForm";
import AnimatedLayout from "@/components/animatedLayout";

interface Appointment {
  id: number;
  date: string;
  time: string;
  name: string;
  description: string;
  type: string;
}

interface ServicePackage {
  title: string;
  description: string;
  icon: LucideIcon;
  price: string;
  features: string[];
  color: string;
  type: string;
}

const servicePackages: ServicePackage[] = [
  {
    title: "Migración de Servidores",
    description: "Migración completa de infraestructura a Linux",
    icon: Server,
    price: "100k",
    features: ["Evaluación inicial", "Plan de migración", "Soporte 24/7"],
    color: "from-blue-500 to-cyan-500",
    type: "Migration", // Debe coincidir con los tipos del formulario
  },
  {
    title: "Optimización de Sistema",
    description: "Mejora el rendimiento de tu infraestructura",
    icon: Cog,
    price: "200k",
    features: [
      "Análisis de rendimiento",
      "Optimización de recursos",
      "Monitoreo",
    ],
    color: "from-purple-500 to-pink-500",
    type: "Optimization",
  },
  {
    title: "Automatización",
    description: "Automatiza tus procesos y tareas",
    icon: Terminal,
    price: "100M",
    features: ["Scripts personalizados", "CI/CD", "Documentación"],
    color: "from-green-500 to-emerald-500",
    type: "Automation",
  },
  {
    title: "Capacitación",
    description: "Formación en Linux y Cloud Computing",
    icon: BookOpen,
    price: "50k",
    features: ["Workshops", "Material didáctico", "Certificación"],
    color: "from-orange-500 to-yellow-500",
    type: "Migration", // Puedes ajustar el tipo según necesites
  },
];

export default function Dashboard() {
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(
    null,
  );

  const handleSuccess = () => {
    setShouldRefresh((prev) => !prev);
    setEditingAppointment(null);
    setShowMobileForm(false);
  };

  const handlePackageSelect = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setShowMobileForm(true);
  };

  return (
    <AnimatedLayout>
      <div className="bg-white dark:bg-[#0c0c13] min-w-dvw min-h-dvh">
        <div className="container mx-auto p-4 pb-10">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Paquetes de Servicios
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {servicePackages.map((pkg, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-black/30 p-1 hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 opacity-30 dark:opacity-50 bg-gradient-to-br ${pkg.color} blur-xl group-hover:opacity-50 dark:group-hover:opacity-75 transition-opacity duration-500`}
                />

                <div className="relative bg-white/80 dark:bg-black/90 p-6 rounded-lg h-full flex flex-col backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <pkg.icon className="h-8 w-8 text-gray-900 dark:text-white" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {pkg.price}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {pkg.description}
                  </p>

                  <ul className="space-y-2 mb-6 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-700 dark:text-gray-300"
                      >
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full bg-gradient-to-r ${pkg.color} text-white hover:opacity-90 transition-opacity`}
                    onClick={() => handlePackageSelect(pkg)}
                  >
                    Agendar Ahora
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Panel de Citas
          </h1>

          {!editingAppointment && (
            <div className="md:hidden mb-4 flex space-x-2">
              <Button
                variant={showMobileForm ? "outline" : "default"}
                onClick={() => setShowMobileForm(false)}
                className="flex-1"
              >
                <List className="h-4 w-4 mr-2" />
                Ver Citas
              </Button>
              <Button
                variant={showMobileForm ? "default" : "outline"}
                onClick={() => setShowMobileForm(true)}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cita
              </Button>
            </div>
          )}

          <div className="md:hidden">
            {editingAppointment || showMobileForm ? (
              <AppointmentForm
                appointment={editingAppointment}
                initialDescription={selectedPackage?.description}
                initialType={selectedPackage?.type}
                onSuccess={() => {
                  handleSuccess();
                  setSelectedPackage(null);
                }}
                onCancel={() => {
                  setEditingAppointment(null);
                  setShowMobileForm(false);
                  setSelectedPackage(null);
                }}
              />
            ) : (
              <AppointmentList
                onEdit={setEditingAppointment}
                refreshTrigger={shouldRefresh}
              />
            )}
          </div>

          <div className="hidden md:grid md:grid-cols-2 gap-6">
            <div className="w-full">
              <AppointmentForm
                appointment={editingAppointment}
                initialDescription={selectedPackage?.description}
                initialType={selectedPackage?.type}
                onSuccess={() => {
                  handleSuccess();
                  setSelectedPackage(null);
                }}
                onCancel={() => {
                  setEditingAppointment(null);
                  setSelectedPackage(null);
                }}
              />
            </div>
            <div className="w-full">
              <AppointmentList
                onEdit={setEditingAppointment}
                refreshTrigger={shouldRefresh}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedLayout>
  );
}
