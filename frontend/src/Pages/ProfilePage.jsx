import React from "react";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const profileImage =
    "https://i.pinimg.com/736x/57/7c/63/577c63d920a82e991cf1918157874971.jpg";
  const fallbackImage = "https://placehold.co/150x150/4CAF50/FFFFFF?text=User";
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Sidebar on the left */}
      <div className="w-full md:w-1/4 lg:w-1/5">
        <Sidebar />
      </div>

      {/* Main Content on the right */}
      <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
        {/* Profile Header */}
        <h1 className="text-2xl font-bold mb-2">Profile</h1>
        <p className="text-gray-600 mb-6">View of your Information here</p>

        {/* Profile Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture and Basic Info */}
            <div className="flex flex-col items-center">
              <img
                src={profileImage}
                alt="Maria Fernanda Avatar"
                className="w-36 h-36 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
              />
              <h2 className="text-2xl font-bold mt-4">State Bank Of India</h2>
              <span className="text-yellow-400 text-sm font-medium">
                Premium User
              </span>
            </div>

            {/* Bio & Other Details */}
            <div className="flex-1 w-full md:w-auto">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center justify-between">
                <span>Information & other details</span>
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {/* Individual Info Items */}
                <div>
                  <p className="text-gray-500 text-sm">
                    Bank/Organization Name
                  </p>
                  <p className="text-gray-800 font-medium">
                    State Bank Of India
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Primary Contact</p>
                  <p className="text-gray-800 font-medium">Aniket Chakke</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Contact Role</p>
                  <p className="text-gray-800 font-medium">CFO</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Primary Phone</p>
                  <p className="text-gray-800 font-medium">8786858483</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email Address</p>
                  <p className="text-gray-800 font-medium">
                    aniketchakke63@gmail.com
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Licence No</p>
                  <p className="text-gray-800 font-medium">755</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Client ID</p>
                  <p className="text-gray-800 font-medium">9999</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Headquarter Address</p>
                  <p className="text-gray-800 font-medium">Hadapsar</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Bank Type</p>
                  <p className="text-gray-800 font-medium">Public Sector</p>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 flex gap-6 mt-4">
                <button className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200">
                Edit Information
                </button>

                <button 
                onClick={() => navigate("/postadeal")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200">
                Post a Deal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* My Productions Section */}
        <div className="bg-white rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            My Productions
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-lg">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Timing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    No. of listenings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    Production Title 1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    3:45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    12,345
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-green-600 hover:text-green-800 mr-4"
                    >
                      Edit
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-800">
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    Production Title 2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    2:50
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    8,765
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-green-600 hover:text-green-800 mr-4"
                    >
                      Edit
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-800">
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
