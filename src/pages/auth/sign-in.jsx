import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";


export function SignIn() {
  return (
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
        <form className="mt-6 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
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
            />
          </div>
          <Button href="" className="mt-6 bg-blue" fullWidth>
            <Link to="/dashboard/home" >Sign in</Link>
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
  );
}

export default SignIn;
