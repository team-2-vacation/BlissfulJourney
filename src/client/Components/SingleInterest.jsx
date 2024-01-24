import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleInterest = () => {
    const { id } = useParams();
    const [interest, setInterest] = useState({});
    const [allDestinations, setAllDestinations] = useState([]);
    const [filteredDestinations, setFilteredDestinations] = useState([]);

    useEffect(() => {
        const getInterest = async () => {
            try {
                const { data: foundInterest } = await axios.get(`/api/interests/${id}`);
                setInterest(foundInterest);
            } catch (error) {
                console.log(error);
            }
        }

        const getAllDestinations = async () => {
            try {
                const { data: destinations } = await axios.get("/api/destinations");
                setAllDestinations(destinations);
            } catch (error) {
                console.log(error);
            }
        }
        getInterest();
        getAllDestinations();
    }, [id]);

    useEffect(() => {
        const filtered = allDestinations.filter(destination => destination.interestId === +id);
        setFilteredDestinations(filtered);
    }, [allDestinations, id]);

  return (
    <>  
      <h1>{interest.name}</h1>
        <p><strong>Description:</strong> {interest.description}</p>
        {interest.imageURL && <img src={interest.imageURL} alt={interest.name} />}
        <div>
                {filteredDestinations.map((destination, index) => (
                    <div key={index}>
                        <Link to={`/destinations/${destination.id}`}>
                            <h3>destination: {destination.name}</h3>
                            {destination.imageURL && <img src={destination.imageURL} alt ={destination.name} style={{ width: '100px', height: '100px' }}/>}
                        </Link>
                    </div>
                ))}
            </div>
    </>
  )
}
export default SingleInterest;