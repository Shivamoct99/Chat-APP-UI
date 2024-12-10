import logo from "../assets/logo.jpeg";
import Data from "../components/Data";
import { useAppContext } from "../context/context";

const MesageBox = () => {
  const { userDetail } = useAppContext();
  return (
    <div className="w-[100%]  sm:h-[90%] ">
      <div className="flex justify-center items-center my-6 ">
        <div className="border border-primary p-[2px] rounded-full">
          <img
            src={userDetail.profile_pic || logo}
            className="w-16 h-16 rounded-full"
            alt=""
          />
        </div>
        <div className="ml-4 ">
          <h3 className="text-2xl capitalize ">{userDetail.name}</h3>
          <p className="text-lg font-light">My Account </p>
        </div>
      </div>
      <hr />
      <Data />
    </div>
  );
};

export default MesageBox;
