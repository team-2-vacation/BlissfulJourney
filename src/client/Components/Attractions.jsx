import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Attractions = () => {
    const { id } = useParams();
    const [attraction, setAttraction] = useState({}); 

    useEffect(() => {
        const getAttraction = async () => {
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
        <>
            <h1>{attraction.name}</h1>
            {attraction.imageURL && <img src={attraction.imageURL} alt={attraction.name} />}
        </>
    );
}
export default Attractions;