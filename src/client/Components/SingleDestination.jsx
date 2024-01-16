import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SingleDestination() {
    const { id } = useParams();
    const [destination, setDestination] = useState({})
    const [attraction, setAttraction] = useState([])
    const navigate = useNavigate();
  
    useEffect(() => {
      async function getSingleDestination() {
        try {
          const { data: foundDestination } = await axios.get(`/api/destinations/${id}`)
          setDestination(foundDestination)
        }
        catch (error) {
          console.log(error)
  
        }
  
      }
      getSingleDestination()
    }, [id])
    useEffect(() => {
      async function getAttraction() {
        try {
          const { data: foundAttraction } = await axios.get("/api/attractions")

          setAttraction(foundAttraction)
        }
        catch (error) {
          console.log(error)
  
        }
      }
      getAttraction()
    }, [])
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
            {attraction.map((attr, index) => (
                <div key={index}>
                    <Link to={`/attractions/${attr.id || ''}`}>
                        <h3>Attraction: {attr.name}</h3>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SingleDestination