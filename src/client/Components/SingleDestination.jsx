import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SingleDestination() {
    const { id } = useParams();
    const [destination, setDestination] = useState({});
    const [allAttractions, setAllAttractions] = useState([]);
    const [filteredAttractions, setFilteredAttractions] = useState([]);

    useEffect(() => {
        async function getDestination() {
            try {
                const { data: foundDestination } = await axios.get(`/api/destinations/${id}`);
                setDestination(foundDestination);
            } catch (error) {
                console.log(error);
            }
        }

        async function getAllAttractions() {
            try {
                const { data: attractions } = await axios.get("/api/attractions");
                setAllAttractions(attractions);
            } catch (error) {
                console.log(error);
            }
        }

        getDestination();
        getAllAttractions();
    }, [id]);

    useEffect(() => {
        const filtered = allAttractions.filter(attraction => attraction.destinationId === +id);

        setFilteredAttractions(filtered);
    }, [allAttractions, id]);

  return (
    <div>
       
      <h1>{destination.name}</h1>
        <p><strong>Country:</strong> {destination.country}</p>
        <p><strong>Description:</strong> {destination.description}</p>
        <p><strong>Best Time to Visit:</strong> {destination.time_to_visit}</p>
        <p><strong>Average Cost:</strong> {destination.average_cost}</p>
        <p><strong>Currency:</strong> {destination.currency}</p>
        <p><strong>Language:</strong> {destination.language}</p>
        {destination.imageURL && <img src={destination.imageURL} alt={destination.name} />}
        <div>
                {filteredAttractions.map((attraction, index) => (
                    <div key={index}>
                        <Link to={`/attractions/${attraction.id}`}>
                            <h3>Attraction: {attraction.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default SingleDestination