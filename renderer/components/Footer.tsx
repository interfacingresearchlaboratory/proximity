import { RingLoader } from "react-spinners";

export const Footer = ({ refreshing, latestRelease }) => {
  return (
    <div className="p-2 font-light text-xs flex justify-between h-[30px] bottom-0 space-x-2">
      <div className="flex items-center space-x-2">
        {refreshing ? (
          <>
            <RingLoader color="#00ff00" size={10}/> <span>Loading</span>
          </>
        ) : null}
      </div>
      <div className="space-x-2">
        <span>Proximity {latestRelease}</span>
      </div>
    </div>
  );
};