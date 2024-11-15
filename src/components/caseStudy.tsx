import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimatedLayout from "@/components/animatedLayout";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { Facebook, Linkedin } from "lucide-react";
import { getCaseStudyById } from "@/supabase";
import type { CaseStudy } from "@/supabase";

export default function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCaseStudy() {
      try {
        if (!id) throw new Error("No ID provided");
        const data = await getCaseStudyById(id);
        setCaseStudy(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching case study",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchCaseStudy();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!caseStudy) return <div>Case study not found</div>;

  return (
    <AnimatedLayout>
      <article className="max-w-4xl mx-auto">
        <div className="relative bg-blue-600 text-white mb-5">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute left-0 top-0 h-full w-full text-blue-500/20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1000 1000"
            >
              <path fill="currentColor" d="M0 0h1000v1000H0z" />
              <rect
                x="100"
                y="400"
                width="100"
                height="300"
                fill="currentColor"
              />
              <rect
                x="300"
                y="300"
                width="100"
                height="400"
                fill="currentColor"
              />
              <rect
                x="500"
                y="200"
                width="100"
                height="500"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="relative px-6 py-12 md:px-12 md:py-24">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src={caseStudy.heroImage}
                alt={caseStudy.title}
                width={200}
                height={200}
                className="rounded-full border-4 border-white"
              />
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {caseStudy.title}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a href="#" className="hover:text-blue-200">
                    <TwitterLogoIcon className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-blue-200">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-blue-200">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {caseStudy.company && (
          <section className="mb-12">
            <div className="rounded-lg p-6 bg-gray-100 dark:bg-gray-800">
              <p className="text-gray-800 dark:text-gray-200">
                <strong>Empresa:</strong> {caseStudy.company}
              </p>
              {caseStudy.industry && (
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>Industria:</strong> {caseStudy.industry}
                </p>
              )}
              {caseStudy.employees && (
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>Empleados:</strong> {caseStudy.employees}
                </p>
              )}
              {caseStudy.location && (
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>Ubicación:</strong> {caseStudy.location}
                </p>
              )}
            </div>
          </section>
        )}

        {caseStudy.context && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Contexto
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {caseStudy.context}
            </p>
          </section>
        )}

        {caseStudy.problems && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Problemas Identificados
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              {caseStudy.problems.map((problem, index) => (
                <li key={index}>{problem}</li>
              ))}
            </ul>
          </section>
        )}

        {caseStudy.challenges && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Desafíos Iniciales
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {caseStudy.challenges}
            </p>
          </section>
        )}

        {caseStudy.objectives && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Objetivos del Proyecto
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              {caseStudy.objectives.map((objective, index) => (
                <li key={index}>
                  <strong>{objective.split(":")[0]}:</strong>{" "}
                  {objective.split(":")[1]}
                </li>
              ))}
            </ul>
          </section>
        )}

        {caseStudy.solution && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Solución Implementada
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {caseStudy.solution_text}
            </p>
            <ol className="list-decimal pl-8">
              {caseStudy.solution.map((step, index) => (
                <li key={index} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {caseStudy.results && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Resultados
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              {caseStudy.results.map((result, index) => (
                <li key={index}>
                  <strong>{result.split(":")[0]}:</strong>{" "}
                  {result.split(":")[1]}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </AnimatedLayout>
  );
}
