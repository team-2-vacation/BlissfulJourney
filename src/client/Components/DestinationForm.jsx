import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DestinationForm({ onClose, destinationToEdit }) {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [timeToVisit, setTimeToVisit] = useState("");
    const [averageCost, setAverageCost] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [currency, setCurrency] = useState("");
    const [language, setLanguage] = useState("");

    useEffect(() => {
        if (destinationToEdit) {
            setName(destinationToEdit.name);
            setCountry(destinationToEdit.country);
            setDescription(destinationToEdit.description);
            setTimeToVisit(destinationToEdit.time_to_visit);
            setAverageCost(destinationToEdit.average_cost);
            setImageURL(destinationToEdit.imageURL);
            setCurrency(destinationToEdit.currency);
            setLanguage(destinationToEdit.language);
        }
    }, [destinationToEdit]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const destinationData = {
            name,
            country,
            description,
            time_to_visit: timeToVisit,
            average_cost: +averageCost,
            imageURL,
            currency,
            language
        };

        try {
            if (destinationToEdit) {
                // update destination
                await axios.put(`/api/destinations/${destinationToEdit.id}`, destinationData);
            } else {
                // create new destination
                await axios.post(`/api/destinations`, destinationData);
            }
            onClose();
        } catch (error) {
            console.log(error);
        }
    };
  

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

            <label htmlFor="country">Country:</label>
            <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />

            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

            <label htmlFor="time_to_visit">Time to Visit:</label>
            <input type="text" id="time_to_visit" value={timeToVisit} onChange={(e) => setTimeToVisit(e.target.value)} />

            <label htmlFor="average_cost">Average Cost:</label>
            <input type="number" id="average_cost" value={averageCost} onChange={(e) => setAverageCost(e.target.value)} />

            <label htmlFor="imageURL">Image URL:</label>
            <input type="text" id="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />

            <label htmlFor="currency">Currency:</label>
            <input type="text" id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />

            <label htmlFor="language">Language:</label>
            <input type="text" id="language" value={language} onChange={(e) => setLanguage(e.target.value)} />

            <button type="submit">{destinationToEdit ? "Edit Destination" : "Add Destination"}</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    </div>
    );
}

export default DestinationForm;
