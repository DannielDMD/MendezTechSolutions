import { Button } from "@/components/ui/button";
import AnimatedLayout from "../animatedLayout";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <AnimatedLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 text-gray-900 dark:text-white relative">
        <div className="absolute top-0 left-0 w-2/3 h-2/4 bg-gradient-to-br from-purple-600 to-indigo-500 opacity-50 rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-500 to-purple-600 opacity-50 rounded-tl-full"></div>
        <main className="container mx-auto px-6 py-12">
          <div className="flex flex-col gap-20 md:flex-row items-center mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0 z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                SOBRE NOSOTROS
              </h1>
              <p className="text-xl mb-6">
                En MendezTech Solutions, ofrecemos soluciones avanzadas de
                <strong> consultoría en la nube</strong> para optimizar tus
                operaciones, reducir costos y garantizar la continuidad del
                negocio. Aprovechamos la{" "}
                <strong>tecnología de código abierto</strong> y la
                <strong>automatización</strong> para impulsar la eficiencia y la
                innovación.
              </p>
              <Link to="/auth/signup">
                <Button className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                  REGÍSTRATE AHORA
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 z-10">
              <img
                src="/meet.jpg"
                alt="Consultoría Tecnológica"
                width={800}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-lg mb-6">
              En MendezTech Solutions, nuestra misión es empoderar a las
              pequeñas y medianas empresas mediante la implementación de
              soluciones tecnológicas avanzadas en la nube. Nos esforzamos por
              ofrecer servicios de alta calidad que optimicen la eficiencia,
              reduzcan costos y fomenten la innovación, asegurando que nuestros
              clientes puedan competir y prosperar en el mercado global.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  100+
                </div>
                <div>Clientes Atendidos</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  500+
                </div>
                <div>Proyectos Completados</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  50+
                </div>
                <div>Expertos en la Nube</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  24/7
                </div>
                <div>Soporte</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
              <p className="text-lg mb-6">
                Desde sus inicio en 2024, MendezTech se ha compremetido a
                ofrecer servicios de alta calidad en consultoria, migracion a la
                nube y soporte tecnico, con un enfoque especial en Linus y
                software libere, con el objetivo de proporcionar soluciones
                inovadoras y accesibles para el crecimiento de PYMES
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestra vision</h2>
              <p className="text-lg mb-6">
                Ser líderes en la democratización del acceso a tecnologías
                avanzadas, impulsando el crecimiento de las PYMES mediante
                soluciones innovadoras, accesibles y sostenibles basadas en
                software libre y Linux. En MendezTech, creemos en un futuro
                donde las tecnologías abiertas y colaborativas permiten a las
                empresas prosperar en un entorno en constante evolución.
              </p>
            </div>
          </div>
        </main>
      </div>
    </AnimatedLayout>
  );
}
