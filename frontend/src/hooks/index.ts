import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author: {
    name: string;
  };
}

export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const token = localStorage.getItem("token");

  async function getBlog() {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlog(res?.data?.blog);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlog();
  }, []);

  return { loading, blog };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const token = localStorage.getItem("token");

  async function getBlogs() {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(res?.data?.blogs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return { loading, blogs };
};
