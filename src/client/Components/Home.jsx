import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const goToDestinationPage = () => {
    navigate('/destinations');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-70"
      >
        <source src="../../travel-home.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="text-white text-center">
          <h1 className="text-6xl font-bold mb-2 font-custom">YOUR ADVENTURE STARTS HERE</h1>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
            <button
              onClick={goToDestinationPage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Discover More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
