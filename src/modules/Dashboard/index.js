import Navbar from "../../components/Navbar";
import MesageBox from "../../components/MesageBox";
import ConvesationBox from "../../components/ConvesationBox";

// const contact = [
//   {
//     name: "shubham",
//     status: "Available",
//     img: logo,
//   },
//
// ];

const Dashboard = () => {
  return (
    <div className=" w-screen flex sm:h-screen">
      {/* navbar  */}
      <div className="w-[32%] h-screen flex sm:flex-col-reverse sm:w-[100%]  ">
        <Navbar />
        {/* Message or people box */}
        <MesageBox />
      </div>
      {/* Message /conversation box */}
      <div className=" w-[68%] sm:hidden">
        <ConvesationBox />
      </div>
    </div>
  );
};

export default Dashboard;
