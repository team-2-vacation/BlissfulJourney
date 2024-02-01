import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DestinationForm = ({ onClose, destinationToEdit }) => {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [timeToVisit, setTimeToVisit] = useState("");
    const [averageCost, setAverageCost] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [currency, setCurrency] = useState("");
    const [language, setLanguage] = useState("");
    const [externalURL, setExternalURL] = useState("");
    
    useEffect(() => {
        if (destinationToEdit) {
            setName(destinationToEdit.name);
            setCountry(destinationToEdit.country);
            setDescription(destinationToEdit.description);
            setTimeToVisit(destinationToEdit.time_to_visit);
            setAverageCost(destinationToEdit.average_cost);
            setImageURL(destinationToEdit.imageURL);
            setExternalURL(destinationToEdit.externalURL)
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
            externalURL,
            currency,
            language
        };

        try {
            if (destinationToEdit) {
                await axios.patch(`/api/destinations/${destinationToEdit.id}`, destinationData);
            } else {
                await axios.post(`/api/destinations`, destinationData);
            }
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-7xl mx-auto">
            <form className="mb-4" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add/Edit Destination</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="name">Name:</label>
                        <input className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="country">Country:</label>
                        <input className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="description">Description:</label>
                        <textarea className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="time_to_visit">Time to Visit:</label>
                        <input className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="time_to_visit" placeholder="optional" value={timeToVisit} onChange={(e) => setTimeToVisit(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="average_cost">Average Cost:</label>
                        <input className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="number" id="average_cost" placeholder="0.00" value={averageCost} onChange={(e) => setAverageCost(e.target.value)} />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="imageURL">Image URL:</label>
                        <input className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="imageURL" placeholder="optional" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="externalURL">External URL:</label>
                        <input className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="externalURL" placeholder="optional" value={externalURL} onChange={(e) => setExternalURL(e.target.value)} />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="currency">Currency:</label>
                        <input className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="currency" placeholder="optional" value={currency} onChange={(e) => setCurrency(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="language">Language:</label>
                        <input className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="language" placeholder="optional" value={language} onChange={(e) => setLanguage(e.target.value)} />
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit" class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition ease-in-out duration-300">
                        {destinationToEdit ? "Update" : "Submit"}
                    </button>
                    <button onClick={onClose} class="bg-gray-200 hover:bg-gray-500 text-blue-800 font-semibold py-2 px-4 rounded shadow transition ease-in-out duration-300">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
export default DestinationForm;
