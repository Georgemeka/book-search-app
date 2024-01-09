import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const REG_URL = "https://booksearch.cegital.com/api/auth/register";
export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the registration endpoint
      const response = await axios.post(REG_URL, formData);

      console.log(response);

      // Check if the registration was successful
      if (response.status === 200) {
        setSuccessMessage("Registration successful!");
        setError(null);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/search");
      } else {
        setSuccessMessage(null);
        setError(
          "Registration failed. Please check your information and try again.",
        );
      }
    } catch (error) {
      // Handle different types of errors (network error, server error, etc.)
      if (error.response) {
        // The request was made and the server responded with a status code
        setError(`Server error: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an error
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <h1 className="text-center font-bold uppercase text-2xl text-stone-200 mt-5">
        Book Search App
      </h1>
      <div className="bg-slate-200 mx-3 sm:mx-auto my-20 sm:w-1/2 rounded-lg shadow-2xl  ">
        <h1 className="text-center font-bold uppercase pt-12  text-xl">
          Registration Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  px-6 pt-10 pb-20 space-y-5"
        >
          <div className="  flex flex-col sm:flex-row gap-3  md:justify-center md:items-center">
            <label className="sm:basis-40 font-semibold">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input grow"
              required
            />
          </div>

          <div className="  flex sm:flex-row gap-3 flex-col  md:justify-center md:items-center">
            <label htmlFor="phone" className="font-semibold sm:basis-40">
              Phone Number:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input grow"
              required
            />
          </div>

          <div className="  flex flex-col sm:flex-row gap-3  sm:justify-center sm:items-center mb-4 ">
            <label className="sm:basis-40 font-semibold">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input grow"
              required
            />
          </div>

          {error && <p className="text-red-700">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <button
            type="submit"
            className="inline-block text-sm rounded-full bg-cyan-400  font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-cyan-300 focus:bg-cyan-300 focus:outline-none focus:ring focus:ring-cyan-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4 "
          >
            Submit
          </button>
          <p className=" text-center  text-stone-950 font-semibold italic">
            Have an account,{" "}
            <NavLink
              to="/"
              className=" not-italic underline hover:text-stone-600 hover:scale-100"
            >
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}
