import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@walisantunu/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const token = response?.data?.token;
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="px-4 w-1/2 mx-auto">
        <div className="text-3xl text-center font-bold text-gray-900">
          {type === "signup" ? "Create an account" : "Sign in to your account"}
        </div>
        <div className="text-center text-gray-600 my-2 pb-4">
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="underline cursor-pointer"
          >
            {type === "signup" ? "Sign in" : "Sign Up"}
          </Link>
        </div>
        {type === "signup" ? (
          <LabelledInput
            label="Name"
            placeholder="Enter your name"
            onchange={(e) =>
              setPostInputs((c) => ({ ...c, name: e.target.value }))
            }
          />
        ) : null}
        <LabelledInput
          label="Email"
          placeholder="example@email.com"
          onchange={(e) =>
            setPostInputs((c) => ({ ...c, email: e.target.value }))
          }
        />
        <LabelledInput
          label="Password"
          type="password"
          placeholder="123456"
          onchange={(e) =>
            setPostInputs((c) => ({ ...c, password: e.target.value }))
          }
        />
        <button onClick={sendRequest} className="hover:bg-gray-800 bg-gray-900 text-white p-2 w-full mt-6 rounded font-semibold">
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Auth;

interface LabelledInputType {
  label: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onchange,
  type,
}: LabelledInputType) {
  return (
    <div className="my-4">
      <div className="my-2 font-semibold text-gray-900">
        <label htmlFor="">{label}</label>
      </div>
      <input
        type={type || "text"}
        className="border w-full p-2 rounded"
        placeholder={placeholder}
        onChange={onchange}
      />
    </div>
  );
}
