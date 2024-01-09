import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import { createUser } from "../../service/authservice/AuthAPI";
import { useNavigate } from "react-router-dom";

interface FormType {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormType>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormType>>({});
  const navigate = useNavigate();

  const getUserInputs = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    //for clearing the error
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErros: Partial<FormType> = {};
    if (!formData.username.trim()) {
      newErros.username = "Username is required";
    }
    if (!formData.email.trim()) {
      newErros.email = "Email is required";
    }
    if (!formData.password.trim()) {
      newErros.password = "Password is required";
    }

    if (Object.keys(newErros).length === 0) {
      const response = await createUser(formData);
      if (response?.status === 201) {
        // toast.success(response.data.message)
        navigate("/home");
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.token)
        );
        window.location.reload();
      } else {
        toast.error("Emails already exist");
      }
      setFormData({ username: "", password: "", email: "" });
    } else {
      setErrors(newErros);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="head">
          <h1>Taskify</h1>
        </div>
        <div className="username">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            placeholder="Enter you username"
            name="username"
            value={formData.username}
            onChange={getUserInputs}
          />
          {errors.username && (
            <p style={{ color: "red" }} className="error-message">
              {errors.username}
            </p>
          )}
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter you email"
            name="email"
            value={formData.email}
            onChange={getUserInputs}
          />
          {errors.email && (
            <p style={{ color: "red" }} className="error-message">
              {errors.email}
            </p>
          )}
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter you password"
            name="password"
            value={formData.password}
            onChange={getUserInputs}
          />
          {errors.password && (
            <p style={{ color: "red" }} className="error-message">
              {errors.password}
            </p>
          )}
        </div>
        <button type="submit">Create an account</button>
        
        <span className="message" onClick={()=>navigate('/login')}>Already have an account</span>

      </form>
    </div>
  );
};
export default Signup;
