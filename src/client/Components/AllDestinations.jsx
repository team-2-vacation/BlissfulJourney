import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DestinationForm from "./DestinationForm";

const Destination = () => {
    const [search, setSearch] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingDestination, setEditingDestination] = useState(null);

    const filteredDestinations = destinations.filter(destination =>
        destination.name.toLowerCase().includes(search.toLowerCase()) || destination.country.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const getDestinations = async () => {
            try {
                const { data: foundDestination } = await axios.get("/api/destinations");
                setDestinations(foundDestination);
            } catch (error) {
                console.log(error);
            }
        };
        getDestinations();
    }, []);

    const isAdmin = () => localStorage.getItem("Admin") === "true";
    const userIsAdmin = isAdmin();

    const handleAddDestination = () => {
        setEditingDestination(null);
        setShowForm(true);
    };

    const handleEditDestination = (destination) => {
        setEditingDestination(destination);
        setShowForm(true);
    };

    const handleDeleteDestination = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this destination?");
        if (isConfirmed) {
            try {
                await axios.delete(`/api/destinations/${id}`);
                setDestinations(destinations.filter(destination => destination.id !== id));
            } catch (error) {
                console.log(error);
            }
        }
    };
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingDestination(null);
    };

    return (
        <>
            <section className="md:h-full flex items-center text-gray-600">
                <div className="container px-3 py-4 mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-12">
                            <h1 className="text-4xl md:text-5xl text-gray-700 font-semibold mb-3 md:mb-0 md:flex-grow text-center">Explore the World</h1>
                            <div className="flex items-center border-2 border-gray-300 bg-white rounded-lg text-sm">
                                <input
                                    className="flex-grow h-8 px-5 text-sm focus:outline-none rounded-l-lg"
                                    placeholder="Search for a destination"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                {search && (
                                    <button onClick={() => setSearch("")} className="text-gray-600 px-4 h-8">
                                        X
                                    </button>
                                )}
                            </div>

                        </div>
                        {userIsAdmin && (
                            <button
                                onClick={handleAddDestination}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                            >
                                Add New Destination
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {filteredDestinations.map((destination) => (
                            <div key={destination.id} className="p-4 sm:w-1/2 lg:w-1/3">
                                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                    <Link to={`/destinations/${destination.id}`}>
                                        <img
                                            className="lg:h-72 md:h-48 w-full object-cover object-center transform hover:scale-105 transition duration-300"
                                            src={destination.imageURL}
                                            alt={`destination ${destination.name}`}
                                        />
                                    </Link>
                                    <div className="p-6 hover:bg-gray-300 hover:text-white transition duration-300 ease-in">
                                        <Link to={`/destinations/${destination.id}`}>
                                            <h3 className="text-2xl font-semibold mb-3">{destination.name}</h3>
                                        </Link>
                                        {userIsAdmin && (
                                            <div className="flex justify-between mt-4">
                                                <button
                                                    onClick={() => handleEditDestination(destination)}
                                                    className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteDestination(destination.id)}
                                                    className="text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {showForm && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                        <div className="relative top-20 mx-auto p-5 border max-w-2xl w-full shadow-lg rounded-md bg-white">
                            <DestinationForm
                                onClose={handleCloseForm}
                                destinationToEdit={editingDestination}
                            />
                            <button
                                onClick={handleCloseForm}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default Destination;