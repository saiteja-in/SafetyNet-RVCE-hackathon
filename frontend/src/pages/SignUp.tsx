import React from "react";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { formData } from "./Signin";
import OAuth from "../components/OAuth";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formData>({username:"", email: "", password: ""});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(errorMessage);
  
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
      const res = await fetch("http://localhost:3217/api/auth/signup", {
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
                <OAuth/>
                {/* <div>{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div> */}
              </form>

            </div>
          </div>

          <div className="flex flex-col items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
  <div className="text-center">
    {/* <img
      className="w-full mx-auto mb-8 animate-pulse"
      src="https://example.com/path-to-disaster-management-icon.svg" // Replace with an actual disaster management icon
      alt="Disaster Management Icon"
      style={{ maxWidth: "200px" }}
    /> */}

    <h3 className="text-4xl font-bold text-blue-700 mb-4">
      Disaster Preparedness
    </h3>

    <p className="text-2xl font-semibold text-gray-800 mb-6">
      "Readiness Today, Resilience Tomorrow"
    </p>

    <div className="space-y-4 max-w-md mx-auto">
      <p className="text-lg text-gray-600 transition-all duration-300 hover:text-blue-600">
        🏠 Protect your home and loved ones
      </p>
      <p className="text-lg text-gray-600 transition-all duration-300 hover:text-blue-600">
        🚨 Stay informed, stay safe
      </p>
      <p className="text-lg text-gray-600 transition-all duration-300 hover:text-blue-600">
        🤝 Build community resilience together
      </p>
    </div>

    <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
      Learn More About Preparedness
    </button>
  </div>
</div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
