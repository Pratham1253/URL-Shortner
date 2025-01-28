import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const user = useSelector((state) => state.users);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center text-gray-800 bg-gray-200 p-4">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-4">
        <img
          src="/img/logo_url_shortner.png"
          className="h-10 w-auto"
          alt="Logo"
        />
      </div>

      {/* Right Section: User Info and Logout */}
      <div className="flex items-center space-x-4">
        <p className="text-sm">Hello, {user.name}</p>
        <button
          type="button"
          onClick={logout}
          className="text-red-500 hover:text-red-600 focus:outline-none"
        >
          <i className="fa fa-power-off text-lg" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
