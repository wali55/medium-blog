import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link className="cursor-pointer" to={`/blog/${id}`}>
      <div className="mb-10">
        <div className="flex items-center">
          <Avatar name={authorName} />
          <div className="flex items-center">
            <div className="font-medium ml-2">{authorName}</div>
            <div className="h-0.5 w-0.5 bg-gray-500 rounded-full ml-1.5 mr-1"></div>
            <div className="text-gray-500">{publishedDate}</div>
          </div>
        </div>
        <div className="font-bold text-3xl mt-4 mb-2">{title}</div>
        <div className="text-gray-800 text-lg">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-sm text-gray-500 my-5">{`${Math.ceil(
          content.length / 100
        )} min read`}</div>
        <div className="border border-b border-gray-200"></div>
      </div>
    </Link>
  );
};

export default BlogCard;

export function Avatar({ name }: { name: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center size-6 overflow-hidden bg-gray-400 rounded-full`}
    >
      <span className="font-medium text-gray-900 text-xs">
        {name.split(" ")[0].charAt(0)}
      </span>
    </div>
  );
}
