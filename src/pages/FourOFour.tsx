import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FourOFour = () => {
  const [count, setCount] = useState(5);
  const Navigate = useNavigate();
  useEffect(() => {
    if (count > 0) {
      setInterval(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      Navigate("/");
    }
  }, [count]);

  return (
    <>
      <div className="flex h-[90vh] w-full items-center justify-center flex-col gap-4">
        <p className="text-teal-500">You will redirect in {count} seconds</p>
        <h1 className="text-white text-4xl font-medium">404 page not found</h1>
        <Link
          to="/"
          className="bg-slate-900 px-3 py-2 rounded border border-slate-700 text-white hover:bg-slate-800 hover:border-transparent duration-200"
        >
          Back To home
        </Link>
      </div>
    </>
  );
};

export default FourOFour;
