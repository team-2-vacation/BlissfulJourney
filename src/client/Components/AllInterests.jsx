import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InterestForm from "./InterestForm";

const Interest = () => {
    const [interests, setInterests] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingInterest, setEditingInterest] = useState(null);

    useEffect(() => {
        const getInterests = async () => {
            try {
                const { data: foundInterest } = await axios.get("/api/interests");
                setInterests(foundInterest);
            } catch (error) {
                console.log(error);
            }
        };
        getInterests();
    }, []);

    const isAdmin = () => localStorage.getItem("Admin") === "true";
    const userIsAdmin = isAdmin();

    const handleAddInterest = () => {
        setEditingInterest(null);
        setShowForm(true);
    };

    const handleEditInterest = (interest) => {
        setEditingInterest(interest);
        setShowForm(true);
    };

    const handleDeleteInterest = async (id) => {
        try {
            await axios.delete(`/api/interests/${id}`);
            setInterests(interests.filter((interest) => interest.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingInterest(null);
    };

    return (
        <section className="md:h-full flex items-center text-gray-600">
            <div className="container px-3 py-4 mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl text-gray-700 font-semibold mb-3 md:mb-0 md:flex-grow text-center">
                        Explore Interests
                    </h1>
                    {userIsAdmin && (
                        <button
                            onClick={handleAddInterest}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            Add New Interest
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap -m-4">
                    {interests.map((interest) => (
                        <div key={interest.id} className="p-4 sm:w-1/2 lg:w-1/3">
                            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                <Link to={`/interests/${interest.id}`}>
                                    <img
                                        className="lg:h-72 md:h-48 w-full object-cover object-center transform hover:scale-105 transition duration-300"
                                        src={interest.imageURL}
                                        alt={`interest ${interest.name}`}
                                    />
                                </Link>
                                <div className="p-6 hover:bg-gray-300 hover:text-white transition duration-300 ease-in">
                                    <Link to={`/interests/${interest.id}`}>
                                        <h3 className="text-2xl font-semibold mb-3">{interest.name}</h3>
                                    </Link>
                                    {userIsAdmin && (
                                        <div className="flex justify-between mt-4">
                                            <button
                                                onClick={() => handleEditInterest(interest)}
                                                className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteInterest(interest.id)}
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
                        <InterestForm
                            onClose={handleCloseForm}
                            interestToEdit={editingInterest}
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
    );
};

export default Interest;
