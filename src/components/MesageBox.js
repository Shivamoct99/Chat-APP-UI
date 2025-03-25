import logo from "../assets/logo.jpeg";
import Data from "../components/Data";
import { useAppContext } from "../context/context";

const MesageBox = () => {
  const { userDetail } = useAppContext();
  return (
    // <div className="w-[100%] h-[100%] md:h-[93%] sm:h-[90%]  bg-red-200">
    <div className="w-[100%] h-[100%]  sm:h-[90%] ">
      <div className=" flex justify-center items-center my-6 ">
        <div className="border border-primary p-[2px] rounded-full">
          <img
            src={userDetail.profile_pic || logo}
            className="w-[2.5rem] h-[2.5rem] rounded-full"
            alt=""
          />
        </div>
        <div className="ml-4 ">
          <h3 className="text-[1.5rem] capitalize ">{userDetail.name}</h3>
          <p className="text-[1rem] font-light">My Account </p>
        </div>
      </div>
      <hr />
      <Data />
    </div>
  );
};

export default MesageBox;
