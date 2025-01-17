import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const initialState = {
    title: "",
    content: ""
  }
  const [formData, setFormData] = useState(initialState);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function createBlog() {
    try {
        const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setFormData(initialState);
        navigate(`/blog/${res.data.id}`);
    } catch (error) {
        console.log(error);
    }
  } 
  return (
    <div>
      <Appbar />
        <div className="max-w-screen-lg mx-auto">
          <div className="my-4">
            <div className="my-2 font-semibold text-gray-900">
              <label htmlFor="">Title</label>
            </div>
            <input
              type="text"
              className="border w-full p-2 rounded"
              placeholder="Enter your title"
              onChange={(e) => setFormData((c) => ({...c, title: e.target.value}))}
            />
          </div>
          <div className="my-4">
            <div className="my-2 font-semibold text-gray-900">
              <label htmlFor="">Content</label>
            </div>
            <textarea
              className="border w-full p-2 rounded"
              placeholder="Enter your content"
              rows={16}
              onChange={(e) => setFormData((c) => ({...c, content: e.target.value}))}
            />
          </div>
          <button onClick={createBlog} className="bg-green-600 hover:bg-green-700 px-2.5 py-1 rounded-full text-sm font-semibold text-white">
            Publish
          </button>
        </div>
    </div>
  );
};

export default Publish;
