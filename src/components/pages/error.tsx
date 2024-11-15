import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-4">
        Lo sentimos, ha ocurrido un error inesperado.
      </p>
      <p className="text-gray-600">
        {error?.statusText || error?.message || "Página no encontrada"}
      </p>
    </div>
  );
}
