import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Home = () => {
  const [activeTab, setActiveTab] = useState("signIn");
  const [signInData, setSignInData] = useState({ phone: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    username: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleTabSwitch = (tab) => setActiveTab(tab);

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = (data) => {
    for (const key in data) {
      if (data[key] === "") {
        setError(`Please fill in the ${key} field.`);
        return false;
      }
    }
    setError(""); // Clear error message if validation passes
    return true;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(signInData)) return;

    try {
      const response = await axios.post("http://localhost:8080/log", signInData);
      if (response.data === "success") {
        setSuccessMessage("Sign in successful");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(signUpData)) return;

    try {
      const response = await axios.post("http://localhost:8080/reg1", signUpData);
      if (response.data === "home") {
        setSuccessMessage("Sign up successful");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 p-8 bg-[#F5F7FA] flex flex-col justify-center items-center">
          <motion.h1
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-4xl font-bold mb-4 text-center"
          >
            <span className="text-[#828282]">Welcome to</span>{" "}
            <span className="text-[#4A90E2]">Comniverse</span>
          </motion.h1>
          <motion.p
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="text-lg text-center text-[#828282]"
          >
            Connect with the world instantly
          </motion.p>
        </div>
        <div className="md:w-1/2 p-8">
          <div className="flex justify-center mb-6">
          <button
              className={`w-full px-6 py-2 font-semibold border-b-2 ${
                activeTab === "signIn"
                  ? "text-gray border-[#4A90E2]"
                  : "text-white border-transparent"
              } focus:outline-none`}
              onClick={() => handleTabSwitch("signIn")}
            >
              Sign In
            </button>
            <button
              className={`w-full ml-4 px-6 py-2 font-semibold border-b-2 ${
                activeTab === "signUp"
                  ? "text-gray border-[#4A90E2]"
                  : "text-white border-transparent"
              } focus:outline-none`}
              onClick={() => handleTabSwitch("signUp")}
            >
              Sign Up
            </button>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
          {activeTab === "signIn" && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSignInSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="signInPhone"
                >
                  Phone Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signInPhone"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={signInData.phone}
                  onChange={handleSignInChange}
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="signInPassword"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="signInPassword"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="w-full bg-[#4A90E2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </motion.form>
          )}
          {activeTab === "signUp" && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSignUpSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="signUpUsername"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signUpUsername"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={signUpData.username}
                  onChange={handleSignUpChange}
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="signUpPhone"
                >
                  Phone Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signUpPhone"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={signUpData.phone}
                  onChange={handleSignUpChange}
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="signUpPassword"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="signUpPassword"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="w-full bg-[#4A90E2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>

  );
};
export default Home;
