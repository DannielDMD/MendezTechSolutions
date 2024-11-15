import { ModeToggle } from "@/components/mode-toggle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import favicon from "/favicon.jpeg";
import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { UserIcon, CalendarIcon } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path
      ? "text-purple-600 dark:text-purple-400"
      : "hover:text-purple-600 dark:hover:text-purple-400";
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-6 z-50 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src={favicon} alt="MendezTech Solutions" className="h-8 w-8" />
            <span className="font-bold text-xl">MendezTech Solutions</span>
          </Link>
        </div>
        {user ? (
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`flex items-center ${isActiveRoute("/dashboard")}`}
            >
              <CalendarIcon className="h-5 w-5 mr-1" />
              ¡Agenda!
            </Link>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 focus:outline-none">
                  <UserIcon className="h-6 w-6" />
                  <span>{user.user_metadata.name || user.email}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6">
              <Link to="/about" className={isActiveRoute("/about")}>
                Sobre Nosotros
              </Link>
              <Link to="/services" className={isActiveRoute("/services")}>
                Servicios
              </Link>
              <Link to="/pricing" className={isActiveRoute("/pricing")}>
                Precios
              </Link>
              <Link
                to="/case-studies"
                className={isActiveRoute("/case-studies")}
              >
                Casos de Estudio
              </Link>
              <Link to="/contact" className={isActiveRoute("/contact")}>
                Contacto
              </Link>
            </div>
            <Link to="/auth/login">
              <Button variant="outline" className="hidden md:inline-flex">
                Iniciar Sesión
              </Button>
            </Link>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Empezar
            </Button>
            <ModeToggle />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
