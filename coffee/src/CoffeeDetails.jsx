import { HiFastForward } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";
import { PiShareFatLight } from "react-icons/pi";

const CoffeeDetails = ({ item }) => {
  return (
    <div>
      <div className="w-full h-[30%] px-3 py-5 flex">
        <div className="w-[58%] max-h-[165px] flex flex-col justify-between">
          <div className="flex">
            <div className="h-4 w-4 border-2 border-green-700 flex justify-center items-center rounded-[4px]">
              <div className="h-2 w-2 bg-green-700 rounded-full"></div>
            </div>
            <div className="flex items-center h-4 ml-2">
              <div className="-skew-x-12">
                {" "}
                <HiFastForward color="green" />
              </div>
              <p className="text-[10px] text-green-600 font-bold bg-gray-100 p-[3px]">
                15 mins
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-medium mt-1">{item.name}</h2>
            {item.reviews && (<div className="text-sm my-1">
              {'⭐'.repeat(item.rating)}<span>({item.reviews})</span>
            </div>)}
            <h4 className="font-medium text-[15px] mt-1">₹{item.price}</h4>
            <p className="text-gray-500 font-medium mt-1 text-[13.5px]">
              {item.description}
              <p className="inline font-bold">more</p>
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="w-8 h-8 rounded-full border-gray-300 border-[1.5px] flex justify-center items-center">
              <button>
                <CiBookmark size={20} />
              </button>
            </div>
            <div className="w-8 h-8 rounded-full border-gray-300 border-[1.5px] flex justify-center items-center">
              <button>
                <PiShareFatLight size={20} />
              </button>
            </div>
          </div>

        </div>
        <div className="relative h-40 w-36 flex flex-col items-center">
          <img
            src={item.image}
            alt="mocha coffee"
            className="h-38 w-36 rounded-2xl"
          />
          <div className="absolute -bottom-2 border px-10 py-2 border-red-500 bg-red-50 rounded-[8px] text-red-500 font-bold">
            ADD <span className="inline-block absolute -top-1 right-1">+</span>
          </div>
          <p className="absolute -bottom-8 text-gray-400 tracking-tight">
            cutomisable
          </p>
        </div>
      </div>

      <hr className="text-gray-300 mt-7 mx-3" />
    </div>
  );
};

export default CoffeeDetails;