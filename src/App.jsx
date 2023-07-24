import { useState } from "react";
import { useGeolocation } from "./useGeolocation";

export default function App() {
  const [countClicks, setCountClicks] = useState(0);

  const {
    position: { lat, lng },
    isLoading,
    error,
    getPosition,
  } = useGeolocation();
  // console.log("position : ", position);
  // const { lat, lng } = position;
  const handleClick = () => {
    setCountClicks((count) => count++);
    getPosition();
  };
  return (
    <div className=' w-[600px] mx-auto my-20 p-5 bg-slate-100 shadow-md'>
      <button
        className=' border px-5 py-1 my-5 bg-emerald-400 rounded-lg disabled:bg-green-300 text-white'
        onClick={handleClick}
        disabled={isLoading}
      >
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position :{" "}
          <a
            className=' text-green-800 hover:text-green-600 '
            target='_blank'
            rel='noreferrer'
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p className=' my-5'>
        You requested position{" "}
        <span className=' text-green-500'>{countClicks}</span> times
      </p>
    </div>
  );
}
