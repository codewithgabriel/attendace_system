import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">
        AttendanceSys
      </Link>
      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/lectures">Lectures</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
