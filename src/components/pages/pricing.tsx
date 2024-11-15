import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import AnimatedLayout from "../animatedLayout";
import { Link } from "react-router-dom";

export default function PaginaPrecios() {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const planes = [
    {
      nombre: "Inicial",
      precio: "$ 700k",
      descripcion: "Para pequeñas empresas que comienzan su viaje en la nube",
      caracteristicas: [
        "Evaluación de preparación para la nube",
        "Soporte básico de migración",
        "5 horas de consultoría",
        "Soporte por correo electrónico",
        "Acceso a recursos básicos",
        "Informes mensuales",
      ],
    },
    {
      nombre: "Profesional",
      precio: "$ 3.5M",
      descripcion: "Para empresas en crecimiento con necesidades complejas",
      caracteristicas: [
        "Evaluación de preparación para la nube",
        "Soporte básico de migración",
        "5 horas de consultoría",
        "Soporte por correo electrónico",
        "Acceso a recursos básicos",
        "Informes mensuales",
        "Migración completa a la nube",
        "Optimización de infraestructura",
        "20 horas de consultoría",
        "Soporte prioritario por correo y teléfono",
        "Acceso a recursos avanzados",
        "Informes semanales",
        "Auditoría de seguridad básica",
      ],
    },
    {
      nombre: "Empresarial",
      precio: "Personalizado",
      descripcion: "Para grandes organizaciones con requisitos avanzados",
      caracteristicas: [
        "Estrategia de nube personalizada",
        "Seguridad y cumplimiento avanzados",
        "Consultoría ilimitada",
        "Soporte dedicado 24/7",
        "Acceso completo a todos los recursos",
        "Informes diarios y en tiempo real",
        "Auditoría de seguridad completa",
        "Gestión de múltiples nubes",
        "Optimización de costes avanzada",
        "Evaluación de preparación para la nube",

        "Soporte básico de migración",
        "5 horas de consultoría",
        "Soporte por correo electrónico",
        "Acceso a recursos básicos",
        "Informes mensuales",
        "Migración completa a la nube",
        "Optimización de infraestructura",
        "20 horas de consultoría",
        "Soporte prioritario por correo y teléfono",
        "Acceso a recursos avanzados",
        "Informes semanales",
        "Auditoría de seguridad básica",
      ],
    },
  ];

  const todasLasCaracteristicas = Array.from(
    new Set(planes.flatMap((plan) => plan.caracteristicas)),
  );

  const toggleExpand = (planName: string) => {
    setExpandedPlan(expandedPlan === planName ? null : planName);
  };

  return (
    <AnimatedLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 text-gray-900 dark:text-white">
        <main className="container mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Planes de Precios
          </h1>
          <p className="text-xl mb-12 text-center">
            Elija el plan perfecto para las necesidades de su negocio
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {planes.map((plan, index) => (
              <Card
                key={index}
                className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg ${
                  index === 1 ? "border-purple-500 border-2" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>{plan.nombre}</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    {plan.descripcion}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-4">{plan.precio}</p>
                  <ul className="space-y-2">
                    {plan.caracteristicas
                      .slice(0, 4)
                      .map((caracteristica, caracteristicaIndex) => (
                        <li
                          key={caracteristicaIndex}
                          className="flex items-center"
                        >
                          <Check className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
                          {caracteristica}
                        </li>
                      ))}
                  </ul>
                  {plan.caracteristicas.length > 4 && (
                    <Button
                      variant="link"
                      onClick={() => toggleExpand(plan.nombre)}
                      className="mt-4 p-0"
                    >
                      {expandedPlan === plan.nombre ? (
                        <>
                          <ChevronUp className="mr-2 h-4 w-4" />
                          Ver menos
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-2 h-4 w-4" />
                          Ver más
                        </>
                      )}
                    </Button>
                  )}
                  {expandedPlan === plan.nombre && (
                    <ul className="space-y-2 mt-4">
                      {plan.caracteristicas
                        .slice(4)
                        .map((caracteristica, caracteristicaIndex) => (
                          <li
                            key={caracteristicaIndex + 4}
                            className="flex items-center"
                          >
                            <Check className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
                            {caracteristica}
                          </li>
                        ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter>
                  <Link to={`/contact?plan=${plan.nombre}`}>
                    <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                      Empezar
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-8 text-center">
            Comparación de Características
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="py-3 px-4 text-left">Característica</th>
                  {planes.map((plan, index) => (
                    <th key={index} className="py-3 px-4 text-center">
                      {plan.nombre}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {todasLasCaracteristicas.map((caracteristica, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-700"
                        : "bg-white dark:bg-gray-800"
                    }
                  >
                    <td className="py-2 px-4">{caracteristica}</td>
                    {planes.map((plan, planIndex) => (
                      <td key={planIndex} className="py-2 px-4 text-center">
                        {plan.caracteristicas.includes(caracteristica) ? (
                          <Check className="mx-auto h-5 w-5 text-green-500 dark:text-green-400" />
                        ) : (
                          <span className="text-red-500">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AnimatedLayout>
  );
}
