import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-12 gap-10">
      <div className="col-span-8">
        <div className="text-4xl font-bold mb-8">{blog.title}</div>
        <div className="text-gray-500 mb-2">Posted on December 20, 2024</div>
        <div className="text-lg">{blog.content}</div>
      </div>
      <div className="col-span-4">
        <div className="text-lg font-semibold mb-2">Author</div>
        <div className="flex items-center">
          <div>
            <Avatar name={blog.author.name} />
          </div>
          <div>
            <div className="ml-4 text-lg font-semibold">{blog.author.name}</div>
            <div className="ml-4 text-gray-500">
              Random catch phrase about author's ability to grab user's
              attention.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
