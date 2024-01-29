import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SingleAttraction() {
  const { id } = useParams();
  const [attraction, setAttraction] = useState();
  const [destination, setDestination] = useState();

  useEffect(() => {
    const getAttractionDestination = async () => {
      try {
        const { data: foundAttraction } = await axios.get(`/api/attractions/${id}`);
        setAttraction(foundAttraction);
        const {data: foundDestination} = await axios.get(`/api/destinations/${foundAttraction.destinationId}`)
        setDestination(foundDestination)
      } catch (error) {
        console.error(error);
      }
    };
    getAttractionDestination();
  }, []);

  return (
    <div>
      <h1 className="text-4xl md:text-5xl text-gray-700 font-semibold mb-3 md:mb-0 md:flex-grow text-center">
        Attraction name: {attraction?.name}
      </h1>
     {destination && <h1>Located in {destination.name}, {destination.country}</h1>}
      {attraction?.imageURL && <img  className="mx-auto object-cover m-4" src={attraction.imageURL} alt={attraction.name} />} 
    </div>
  );
}

export default SingleAttraction;