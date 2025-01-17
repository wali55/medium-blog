import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import Appbar from "../components/Appbar";
import Spinner from "../components/Spinner";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading || !blog) {
    return (
      <div>
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <FullBlog blog={blog} />
    </div>
  );
};

export default Blog;
