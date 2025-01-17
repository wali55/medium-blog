import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
  return (
    <div className="container border-b mx-auto mt-5 mb-10 py-3 flex justify-between">
      <Link to="/blogs" className="font-semibold text-lg">
        Medium
      </Link>
      <div>
        <Link to="/publish">
          <button className="bg-green-600 hover:bg-green-700 px-2.5 py-1 rounded-full mr-4 text-sm font-semibold text-white">
            New
          </button>
        </Link>
        <Avatar name="John Doe" />
      </div>
    </div>
  );
};

export default Appbar;
