// src/pages/LoginPage.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const onSubmit = async (data) => {
    const success = await login(data);
    if (success) {
      navigate("/");
    }
    // Error is displayed via the context state
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="email">Username</Label>
            <Input
              id="email"
              type="text"
              {...register("email", { required: true })}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
