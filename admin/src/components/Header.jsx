import { Link } from "react-router-dom";
const Header = ({ token, setToken }) => {
  return (
    <header className="container mx-auto px-6">
      <div className="navbar py-2">
        <div className="flex-1">
          <Link className="text-base sm:text-xl font-semibold">
            Krantikumar | Admin
          </Link>
        </div>
        <div className="flex-none">
          {token ? (
            <button
              onClick={() => setToken("")}
              className="btn cursor-pointer bg-black text-white py-2 px-4 border-none outline-none hover:bg-greenHover"
            >
              Logout
            </button>
          ) : (
            <button className="btn cursor-pointer bg-black text-white py-2 px-4 border-none outline-none hover:bg-greenHover">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
