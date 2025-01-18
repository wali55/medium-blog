import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="max-w-xl mx-auto mt-10">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="max-w-xl mx-auto">
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            authorName={blog.author.name}
            publishedDate="Dec 3, 2024"
            title={blog.title}
            content={blog.content}
            tags={blog.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
