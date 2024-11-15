import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AutomatizacionTareas() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 text-gray-900 dark:text-white">
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Automatización de Tareas
        </h1>
        <p className="text-xl mb-12">
          Asegure que su entorno en la nube sea seguro y cumpla con las
          normativas.
        </p>
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Características</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Evaluación de seguridad, Auditorías de cumplimiento,
              Implementación de medidas de seguridad, Monitoreo continuo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "Evaluación de seguridad",
                "Auditorías de cumplimiento",
                "Implementación de medidas de seguridad",
                "Monitoreo continuo",
              ].map((caracteristica, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
                  {caracteristica}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Link to="/contact" className="w-full">
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                Contáctanos para más información
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
