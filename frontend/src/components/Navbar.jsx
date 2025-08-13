import { Link } from "react-router";
import { Plus } from "lucide-react";

const Navbar = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1>
          <Link to="/" className="logo">
            TakeNote
          </Link>
        </h1>
        <button>
          <Link to="/create" className="header-btn">
            <Plus />
            Add Note
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
