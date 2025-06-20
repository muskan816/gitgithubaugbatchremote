import { CiPlay1 } from "react-icons/ci";
import { IoIosVideocam } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";


const BottomNav = () => {
  return (
    <div className="flex justify-around w-[25rem] text-3xl text-white py-2">
        <button><CiPlay1/></button>
        <button><IoIosVideocam/></button>
        <button><CiSquarePlus/></button>
        <button><CiSearch/></button>
        <button><CgProfile/></button>
    </div>
  )
}

export default BottomNav