import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AbstractDesign from "../abstractDesign";
import { Link } from "react-router-dom";
import AnimatedLayout from "../animatedLayout";

export default function LandingPage() {
  return (
    <AnimatedLayout>
      <main className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center pt-24 h-[calc(100vh-84px)]">
        <div className="md:w-1/2 mb-10 md:mb-0 z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-16">
            Consultoría TIC para Pymes en Bogotá.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-16">
            Proporcionamos herramientas y conocimientos para optimizar
            operaciones, reducir costos y garantizar la continuidad del negocio
            a través de la tecnología de código abierto y la automatización.
          </p>
          <div className="space-x-4">
            <Link to="/auth/login">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size={"lg"}
              >
                Consulta Gratuita
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size={"lg"}>
                Saber Más
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="w-full h-[400px] bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20 absolute"></div>
        </div>

        <div className="absolute w-full max-w-7xl h-full">
          <AbstractDesign />
        </div>
      </main>

      <section
        className="w-full py-12 md:py-24 lg:py-32 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-white mb-12">
            Nuestros Servicios Principales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Migración de Servidores Físicos a Linux",
                icon: "server",
                description:
                  "Soluciones expertas para mejorar su infraestructura en la nube y optimizar el uso de recursos.",
                image: "/linux.jpg",
              },
              {
                title: "Optimización de Infraestructura",
                icon: "tools",
                description:
                  "Mejore la eficiencia y rendimiento de su infraestructura tecnológica.",
                image: "/InfraestructuraTI.jpeg",
              },
              {
                title: "Automatización de Tareas",
                icon: "robot",
                description:
                  "Automatice procesos repetitivos para ahorrar tiempo y reducir errores.",
                image: "/task-automation.jpg",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 overflow-hidden"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <i
                      className={`fas fa-${service.icon} text-4xl text-blue-600 mr-4`}
                    ></i>
                    <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <Link
                    to={"/services"}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                      Más Información
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Clientes Satisfechos</h2>
          <Carousel>
            <CarouselContent>
              {[
                "/google.webp",
                "/hp.png",
                "/mcdonalds.png",
                "/microsoft.png",
                "/starbucks.webp",
              ].map((logo, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/3 flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt={`Logo del cliente ${index + 1}`}
                    width={120}
                    height={60}
                    className="filter invert-0 dark:invert opacity-50 hover:opacity-100 transition-opacity"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </AnimatedLayout>
  );
}
