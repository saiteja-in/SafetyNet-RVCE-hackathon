import React from "react";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { formData } from "./Signin";
// import OAuth from "../components/OAuth";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formData>({username:"", email: "", password: ""});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("All fields are required");
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage(""); //to clear the previous error message
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.message === "User created successfully") {
        toast.success("Account created successfully");
        toast.success("Redirecting to Login Page.", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        setTimeout(() => {
          navigate("/sign-in");
        }, 500);
      }
      if (data.success === false) {
        toast.error("User already exists");
      }
      setLoading(false);
    } catch (error:any) {
      toast.error("Server error");
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign up
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Already have an account?{" "}
                <a
                  href="/sign-in"
                  title=""
                  className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                >
                  Login
                </a>
              </p>

              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="username"
                      className="text-base font-medium text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your Username"
                        onChange={handleChange}
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email to get started"
                        onChange={handleChange}
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      gradientDuoTone="purpleToPink"
                      className="w-full py-2"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner size="sm" color="white" />
                      ) : (
                        "Create free account"
                      )}
                    </Button>
                  </div>
                </div>
                {/* <OAuth/> */}
                {/* <div>{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div> */}
              </form>

            </div>
          </div>

          <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
            <div>
              <img
                className="w-full mx-auto"
                // src={blog}
                alt=""
                style={{ maxWidth: "400px" }} // Set maximum width to 300px
              />

              <div className="w-full max-w-md mx-auto xl:max-w-xl">
              <h3 className="text-4xl font-bold text-center text-black">
                Disaster Avoidance
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
