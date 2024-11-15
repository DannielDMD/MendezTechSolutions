import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { supabase } from "@/supabase";
import { useState } from "react";
import { toast } from "react-toastify";
import favicon from "/favicon.jpeg";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });
    if (error) {
      console.error("Error al registrarse:", error.message);
      toast.error(`Error al registrarse: ${error.message}`);
    } else {
      toast.success("Registro exitoso. Por favor, verifica tu email.");
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <div className="relative hidden w-1/2 bg-blue-600 lg:block">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <h2 className="mb-2 text-3xl font-bold">Bienvenido a</h2>
          <div className="mb-4">
            <img src={favicon} alt="M" className="h-96 w-96" />
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="max-w-md space-y-8 px-4 text-center sm:px-0">
          <div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Create your account
            </h2>
          </div>
          <form
            onSubmit={handleSignup}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="name" className="sr-only">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-start">
              <Checkbox id="terms" />
              <Label
                htmlFor="terms"
                className="ml-2 text-sm text-gray-900 dark:text-gray-300"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Terms & Conditions
                </a>
              </Label>
            </div>
            <div className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
