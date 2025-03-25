import Navbar from "../../components/Navbar";
import MesageBox from "../../components/MesageBox";
import ConvesationBox from "../../components/ConvesationBox";
import { useAppContext } from "../../context/context";

const Dashboard = () => {
  let { conversations } = useAppContext();
  return (
    <div className=" w-full min-h-screen flex ">
      {/* navbar  */}
      <div
        className={` w-[36%] h-screen flex overflow-scroll sm:flex-col-reverse sm:w-[100%]  sm:h-[100%]  ${
          conversations ? "hidden" : ""
        } `}
      >
        <Navbar />
        {/* Message or people box */}
        <MesageBox />
      </div>
      {/* Message /conversation box */}
      <div
        className={`${conversations ? "w-full block" : "w-[64%] sm:hidden"}`}
      >
        <ConvesationBox />
      </div>
    </div>
  );
};

export default Dashboard;
