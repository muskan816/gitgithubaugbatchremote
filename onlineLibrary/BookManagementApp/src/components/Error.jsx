import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom"; 

function Error() {
  const navigate = useNavigate(); 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => navigate("/")} 
        className="flex items-center text-white bg-blue-900 px-4 py-2 rounded-md shadow-md hover:bg-blue-800"
      >
        <IoMdArrowRoundBack className="mr-2" />
        Return to Home Page
      </button>
      <img
        src="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
        alt="Error"
        className="mt-6 w-1/2 max-w-md"
      />
    </div>
  );
}

export default Error;
