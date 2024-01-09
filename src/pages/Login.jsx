import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "axios";

const LOGIN_URL = "https://booksearch.cegital.com/api/auth/login";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [phone, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ phone, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      console.log(response);

      const token = response?.data?.token;
      setAuth({ name, password, token });
      localStorage.setItem("token", JSON.stringify(response.data.token));
      console.log(name, password, token);

      setPhone("");
      setPassword("");
      setSuccess(true);
      // navigate("/search");
    } catch (error) {
      if (!error?.response) {
        setError("No Server Response");
      } else if (error.response?.status === 400) {
        setError("Missing Phone number or Password");
      } else if (errRef.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
      // errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="text-center bg-green-400 text-stone-200 mx-auto my-24">
          <h1>Congratulations!!!🎊🎊You are logged in!</h1>
          <NavLink className="underline font-bold" to="/search">
            Click Here to Enter BooksVille &rarr;
          </NavLink>
        </section>
      ) : (
        <section>
          <p className="bg-red-500 text-center font-semibold text-stone-200 italic px-5 mt-5 mx-3">
            {error}
          </p>
          <h1 className="text-center text-2xl my-8 text-blue-100 font-bold">
            AMAZING BOOK STORE
          </h1>
          <p className="text-center text-stone-200 mb-3 font-semibold">
            Begin your journey to our amazing booksville...
          </p>

          <form
            className="bg-slate-200 px-4 py-6 space-y-5 flex flex-col my-auto  mx-2 rounded-2xl sm:w-1/2 sm:mx-auto sm:px-8 sm:py-10 sm:space-y-8 "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-3 py-4 sm:flex-row gap-0  ">
              <label
                className="text-stone-950 font-bold sm:basis-40"
                htmlFor="phone"
              >
                Phone:
              </label>
              <input
                className="input grow"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                id="phone"
                value={phone}
                required
              />
            </div>
            <div className="flex flex-col gap-3 pb-4 sm:flex-row">
              <label
                className="sm:basis-40 text-stone-950 font-bold"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="input grow"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                value={password}
                required
              />
            </div>

            <button className="px-3 py-3 border hover:bg-cyan-600 bg-cyan-500 rounded-md text-stone-100 text-xl font-semibold">
              Login
            </button>
          </form>
          <p className="text-center mt-3 text-stone-200 font-semibold italic ">
            Need an Account?{"   "}
            <span>
              <NavLink
                to="/register"
                className="not-italic underline hover:text-stone-600 hover:scale-50"
              >
                Sign Up
              </NavLink>
            </span>
          </p>
        </section>
      )}
    </>
  );
}
