import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InterestForm = ({ onClose, interestToEdit }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        if (interestToEdit) {
            setName(interestToEdit.name);
            setDescription(interestToEdit.description);
            setImageURL(interestToEdit.imageURL);
        }
    }, [interestToEdit]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const interestData = {
            name,
            description,
            imageURL,
        };

        try {
            if (interestToEdit) {
                await axios.put(`/api/interests/${interestToEdit.id}`, interestData);
            } else {
                await axios.post(`/api/interests`, interestData);
            }
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

            <label htmlFor="imageURL">Image URL:</label>
            <input type="text" id="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />

            <button type="submit">{interestToEdit ? "Edit Interest" : "Add Interest"}</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    </>
    );
}
export default InterestForm;