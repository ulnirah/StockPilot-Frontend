import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "@/services/auth/login"; 
import { useNavigate } from "react-router-dom"; // Untuk navigasi setelah login
import { AlertLogin } from "./AlertLogin";


export function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  
  const [showAlert, setShowAlert] = useState(false); // Untuk kontrol alert

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const credentials = { username, password };
      const response = await loginUser(credentials);

      // Simpan token ke localStorage
      localStorage.setItem("authToken", response.token);

      // Redirect ke dashboard atau halaman lain
      setShowAlert(true);
      setMessage("Login Berhasil");
      setTimeout(() => setShowAlert(false), 2000);
      navigate("/dashboard/home"); // Sesuaikan dengan rute aplikasi Anda
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertLogin show={showAlert} InputText={message} />
      <section className="m-8 flex gap-4">
        <div className="w-full lg:w-3/5 ">
          <div className="flex justify-center">
            <img
                  className="mt-5 mb-4 flex justify-center"
                  src="/img/stockpilot-logo.svg"
                  alt="nature image"
                />
          </div>
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          </div>

          {error && <Alert color="red">{error}</Alert>}
          <form className="mt-6 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium" >
                Username
              </Typography>
              <Input
                size="lg"
                placeholder="username"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button             
              type="submit"
              color="blue"
              disabled={loading}
              className="mt-6 bg-blue" 
              fullWidth>
              {/* <Link to="" >Sign in</Link> */}
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="flex items-center justify-between gap-2 mt-2">
            <Typography variant="small" className="font-medium text-gray-900">
                <a href="#">
                  Copyright &copy; 2014
                </a>
              </Typography>
              <Typography variant="small" className="font-medium text-gray-900">
                <a href="#">
                  Forgot Password
                </a>
              </Typography>
            </div>
          </form>

        </div>
        <div className="w-2/5 hidden lg:block">
          <img
            src="/img/image.png"
            className="rounded-3xl "
          />
        </div>

      </section>

      </>
  );
}

export default Login;
