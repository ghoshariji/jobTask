import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    file: null,
  });
  const [loading,setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFormData({ ...formData, file });
      setErrorMessage("");
    } else {
      setErrorMessage("Only PDF and Word documents are allowed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("file", formData.file);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    try {
      const response = await axios.post(
        "https://jobtask.onrender.com/v1/api/auth/signup",
        form,
        config
      );
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        toast.success("Register Successfully");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        setLoading(false)
      } else {
        setLoading(false)
        toast.info("An Error Occured...");
      }
    } catch (error) {
      setLoading(false)
      toast.error("Something went Wrong");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />

      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-sm font-semibold text-gray-700"
          >
            Upload Document
          </label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="mt-1 w-full"
            accept=".pdf, .docx"
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
        {
          loading ? <ReactLoading type="balls" color="black" height={'20%'} width={'20%'} /> : null
        }
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
