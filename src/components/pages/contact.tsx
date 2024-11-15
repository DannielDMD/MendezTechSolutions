import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import AnimatedLayout from "../animatedLayout";

export default function Contact() {
  return (
    <AnimatedLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 text-gray-900 dark:text-white">
        <main className="container mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Contáctanos</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
              <CardHeader>
                <CardTitle>Ponte en Contacto</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Completa el formulario y nos pondremos en contacto contigo lo
                  antes posible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input
                    placeholder="Tu Nombre"
                    className="bg-white dark:bg-gray-700"
                  />
                  <Input
                    type="email"
                    placeholder="Tu Email"
                    className="bg-white dark:bg-gray-700"
                  />
                  <Input
                    placeholder="Asunto"
                    className="bg-white dark:bg-gray-700"
                  />
                  <Textarea
                    placeholder="Tu Mensaje"
                    className="bg-white dark:bg-gray-700"
                  />
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div>
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg mb-6">
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span>Dirección: Calle 123, Bogotá, Colombia</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span>Teléfono: +57 123 456 7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span>Email: contacto@MendezTech Solutions.com</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle>Horario de Oficina</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </AnimatedLayout>
  );
}
