import { useState, useEffect } from "react";
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
import { Graph } from "../Graph";
import AnimatedLayout from "../animatedLayout";

export default function Services() {
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const temporizador = setInterval(() => {
      const diferencia = +new Date("2024-12-31") - +new Date();
      setTiempoRestante({
        dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diferencia / 1000 / 60) % 60),
        segundos: Math.floor((diferencia / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(temporizador);
  }, []);

  const servicios = [
    {
      titulo: "Migración de Servidores Físicos a Linux",
      descripcion:
        "Lleva tu infraestructura al siguiente nivel con una migración fluida a sistemas Linux o a la nube. Nos encargamos de todo el proceso: desde la evaluación y planificación estratégica hasta una migración sin interrupciones y soporte post-migración especializado. ¡Asegura el futuro de tu negocio con la confiabilidad y eficiencia de Linux!",

      image: "/cloud_serv.jpg",
      link: "/services/migracion-servidores",
    },
    {
      titulo: "Optimización de Infraestructura",
      descripcion:
        "Maximiza el rendimiento de tu infraestructura y reduce costos operativos con nuestras soluciones personalizadas. Analizamos el rendimiento actual, optimizamos los recursos disponibles, escalamos tu sistema según las necesidades de tu negocio y reducimos gastos innecesarios. ¡Haz que tu infraestructura trabaje de manera más inteligente y eficiente!",
      image: "/conection.jpg",

      link: "/services/optimizacion-infraestructura",
    },
    {
      titulo: "Automatización de Tareas",
      descripcion:
        "Simplifica la gestión de tu entorno en la nube con soluciones de automatización seguras y eficientes. Aseguramos el cumplimiento normativo y la protección de tus datos mediante auditorías, evaluaciones de seguridad y la implementación de medidas robustas, junto con un monitoreo continuo para mantener tu entorno siempre protegido. ¡Automatiza y mantén la seguridad como prioridad!",

      image: "/auto.webp",
      link: "/services/automatizacion-tareas",
    },
    {
      titulo: "Capacitación en Uso de Linux y Soluciones en la Nube",
      descripcion:
        "Empodera a tu equipo con el conocimiento necesario para optimizar el desarrollo y las operaciones en la nube. Ofrecemos capacitación en pipelines CI/CD, infraestructura como código, containerización y monitoreo avanzado. ¡Acelera tus procesos y aumenta la eficiencia con herramientas y habilidades de vanguardia!",
      image: "/rack_sev.jpg",
      link: "/services/capacitacion-linux",
    },
  ];

  return (
    <AnimatedLayout>
      <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 text-gray-900 dark:text-white">
        <div className="bg-yellow-100 dark:bg-yellow-900 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4 text-yellow-800 dark:text-yellow-200">
            ¡Oferta Cyber Monday!
          </h2>
          <p className="text-lg mb-6 text-yellow-700 dark:text-yellow-300">
            ¡Aprovecha nuestras ofertas exclusivas de Cyber Monday y lleva tu
            negocio al siguiente nivel con nuestras soluciones en la nube! La
            oferta termina en:
          </p>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(tiempoRestante).map(([unidad, valor]) => (
              <Card
                key={unidad}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg"
              >
                <CardContent className="p-4 text-center">
                  <div className="text-4xl font-bold text-yellow-800 dark:text-yellow-200">
                    {valor}
                  </div>
                  <div className="text-sm uppercase text-yellow-700 dark:text-yellow-300">
                    {unidad === "dias"
                      ? "días"
                      : unidad === "horas"
                        ? "horas"
                        : unidad === "minutos"
                          ? "minutos"
                          : "segundos"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="mt-6 bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600">
            ¡APROVECHA AHORA!
          </Button>
        </div>
        <main className="container mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Nuestros Servicios
          </h1>
          <p className="text-xl mb-12">
            Soluciones integrales en la nube adaptadas a las necesidades de su
            negocio
          </p>
          <div className="flex flex-col gap-40 md:flex-row items-center mb-10">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <Graph />
            </div>

            <div className="w-full md:w-1/2 relative h-80">
              {[
                {
                  value: "28%",
                  label: "INCREMENTA VENTAS",
                  position: "top-0 left-1/4",
                },
                {
                  value: "#1",
                  label: "SOFTWARE DE GESTIÓN",
                  position: "top-1/4 right-0",
                },
                {
                  value: "$4 M",
                  label: "UNA SOLA INEERSIóN",
                  position: "bottom-1/4 left-0",
                },
                {
                  value: "60+",
                  label: "EMPLEADOS FELICES",
                  position: "bottom-0 right-1/4",
                },
                {
                  value: "4.5",
                  label: "TrustPilot",
                  position:
                    "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`absolute ${stat.position} bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-lg shadow-md`}
                >
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-purple-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center my-12">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400">
              CONOCELOS
            </span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {servicios.map((servicio, index) => (
              <Card
                key={index}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <CardHeader className="relative p-0">
                  <img
                    src={servicio.image}
                    alt={servicio.titulo}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-900/40 dark:from-black to-transparent p-4">
                    <CardTitle className="text-white">
                      {servicio.titulo}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="dark:text-gray-300 mb-4">
                    {servicio.descripcion}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6">
                  <Link to={servicio.link}>
                    <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                      Más Información
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </AnimatedLayout>
  );
}
