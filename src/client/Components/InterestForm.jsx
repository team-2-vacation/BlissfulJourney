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
        <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-7xl mx-auto">
            <form className="mb-4" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">{interestToEdit ? "Edit Interest" : "Add Interest"}</h1>

                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="name">Name:</label>
                        <input className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="description">Description:</label>
                        <textarea className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="imageURL">Image URL:</label>
                        <input className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition ease-in-out duration-300">
                        {interestToEdit ? "Update Interest" : "Submit Interest"}
                    </button>
                    <button onClick={onClose} className="bg-gray-200 hover:bg-gray-500 text-blue-800 font-semibold py-2 px-4 rounded shadow transition ease-in-out duration-300">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InterestForm;