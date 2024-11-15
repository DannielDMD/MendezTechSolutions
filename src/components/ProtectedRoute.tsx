import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { Navigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
