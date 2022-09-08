import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
   return (
      <div className="flex justify-center items-center h-full">
         <ThreeDots
            height="85"
            width="85"
            radius="10"
            color={localStorage.theme === "light" ? "#495057" : "#a6b0cf"}
            ariaLabel="three-dots-loading"
            visible={true}
         />
      </div>
   );
};

export default Loading;
