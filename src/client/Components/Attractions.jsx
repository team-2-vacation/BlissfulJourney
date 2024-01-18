import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Attractions() {
    const { id } = useParams();
    const [attraction, setAttraction] = useState({}); 

    useEffect(() => {
        async function getAttraction() {
            try {
                const { data: foundAttraction } = await axios.get(`/api/attractions/${id}`);
                setAttraction(foundAttraction);
            } catch (error) {
                console.log(error);
            }
        }
        getAttraction();
    }, [id]);

    return (
        <div>
            <h1>{attraction.name}</h1>
            {attraction.imageURL && <img src={attraction.imageURL} alt={attraction.name} />}
        </div>
    );
}

export default Attractions;
