import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState({});
  // Fetch user data after login
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://jobtask.onrender.com/v1/api/auth/user",
          config
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleShow = (data, ContentType) => {
    // Create a Blob from the data
    const blob = new Blob([new Uint8Array(data)], { type: ContentType });

    // Create an object URL for the Blob
    const url = URL.createObjectURL(blob);

    // Open the document in a new tab
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User Details</h1>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-600">Name:</p>
          <p className="text-gray-800">{userData.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-600">Email:</p>
          <p className="text-gray-800">{userData.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-600">
            Uploaded Document:
          </p>
          {userData.docName ? (
            <>
              <button
                onClick={() => handleShow(userData.document.data, userData.ContentType)}
                className="text-blue-500 hover:underline"
              >
                Download PDF
              </button>
              <p className="text-lg font-semibold text-gray-600">
                {userData.docName}
              </p>
            </>
          ) : (
            <p className="text-gray-500">No document uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
