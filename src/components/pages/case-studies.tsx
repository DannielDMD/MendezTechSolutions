import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedLayout from "../animatedLayout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCaseStudies } from "@/supabase";

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  employees: number;
  location: string;
  context: string;
  problems: string[];
  challenges: string;
  objectives: string[];
  solution: {
    title: string;
    description: string;
  }[];
  solution_text: string;
  results: string[];
  heroImage: string;
  shortDescription: string;
  link: string;
}

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await getCaseStudies();
        setCaseStudies(data);
      } catch (err) {
        console.error("Error fetching case studies:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AnimatedLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 text-gray-900 dark:text-white">
        <main className="container mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Casos de Estudio
          </h1>
          <p className="text-xl mb-12">
            Descubra cómo hemos ayudado a empresas a transformar su
            infraestructura en la nube
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((estudio, index) => (
              <Card
                key={index}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg"
              >
                <img
                  src={estudio.heroImage}
                  alt={estudio.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle>{estudio.title}</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    {estudio.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{estudio.shortDescription}</p>
                </CardContent>
                <CardFooter>
                  <Link to={estudio.link}>
                    <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                      Leer Caso de Estudio Completo
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
