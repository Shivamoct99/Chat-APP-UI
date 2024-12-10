import Navbar from "../../components/Navbar";
import MesageBox from "../../components/MesageBox";
import ConvesationBox from "../../components/ConvesationBox";
import { useAppContext } from "../../context/context";

const Dashboard = () => {
  let { conversations } = useAppContext();
  return (
    <div className=" w-screen flex sm:h-screen">
      {/* navbar  */}
      <div
        className={` w-[32%] h-screen flex sm:flex-col-reverse sm:w-[100%]  ${
          conversations ? "hidden" : ""
        } `}
      >
        <Navbar />
        {/* Message or people box */}
        <MesageBox />
      </div>
      {/* Message /conversation box */}
      <div
        className={`${conversations ? "w-full block" : "w-[68%] sm:hidden"}`}
      >
        <ConvesationBox />
      </div>
    </div>
  );
};

export default Dashboard;
