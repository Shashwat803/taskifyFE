import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { loginUser } from "../../service/authservice/AuthAPI";
import { useNavigate } from "react-router-dom";
interface FormType {
  email: string;
  password: string;
}
const Login = () => {
  const [formData, setFormData] = useState<FormType>({
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

    if (!formData.email.trim()) {
      newErros.email = "Email is required";
    }
    if (!formData.password.trim()) {
      newErros.password = "Password is required";
    }

    if (Object.keys(newErros).length === 0) {
      const response = await loginUser(formData);
      console.log(response);
      if (response?.status === 201) {
        navigate("/home");
        window.location.reload()
    
          localStorage.setItem("accessToken", JSON.stringify(response.data.token))  
        
      } else {
        toast.error("Email or Password is incorrect");
      }
    } else {
      setErrors(newErros);
    }
  };
  return (
    <div>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <ToastContainer />
          <div className="head">
            <h1>TASKIFY</h1>
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
          <button type="submit">Login</button>
          <span className="message" onClick={()=>navigate('/signup')}>Don't have an account</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
