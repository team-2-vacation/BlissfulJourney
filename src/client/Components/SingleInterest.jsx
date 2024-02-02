import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SingleInterest = () => {
    const { id } = useParams();
    const [interest, setInterest] = useState({});
    const [filteredDestinations, setFilteredDestinations] = useState([]);

    useEffect(() => {
        const getInterest = async () => {
            try {
                const { data: foundInterest } = await axios.get(`/api/interests/${id}/destinations`);
                setInterest(foundInterest);

                if (foundInterest && foundInterest.destinations) {
                    setFilteredDestinations(foundInterest.destinations.map(destination => destination.Destination));
                }
            } catch (error) {
                console.error(error);
            }
        };
        getInterest();
    }, [id]);

    return (
        <section className="md:h-full flex items-center text-gray-600">
            <div className="container mx-auto p-4">
                <h1 className="text-4xl md:text-5xl text-gray-200 font-semibold mb-3">
                    {interest.name}
                </h1>
                <p className="mb-4 text-gray-200">
                    <strong>Description:</strong> {interest.description}
                </p>
                {interest.imageURL && (
                    <img
                        src={interest.imageURL}
                        alt={interest.name}
                        className="mb-6 max-w-full h-auto mx-auto rounded-lg"
                        style={{ maxHeight: "300px" }}
                    />
                )}
                 <h2 className="text-3xl text-gray-700 font-semibold mb-6">
                    Explore Destinations by Interest
                </h2>
                <div className="flex flex-wrap -m-4">
                    {filteredDestinations && filteredDestinations.map((destination, index) => (
                        <div key={index} className="p-4 md:w-1/2 xl:w-1/3">
                            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 ease-in-out">
                                <Link to={`/destinations/${destination.id}`}>
                                    <img
                                        src={destination.imageURL}
                                        alt={destination.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg">{destination.name}</h3>
                                    </div>
                                </Link>
                                <div className="p-6 hover:bg-gray-300 hover:text-white transition duration-300 ease-in">
                                    <Link to={`/destinations/${destination.id}`}>
                                        <h3 className="text-2xl font-semibold mb-3 text-center text-gray-200">
                                            Destination: {destination.name}
                                        </h3>
                                    </Link>
                                    {destination.imageURL && (
                                        <img
                                            src={destination.imageURL}
                                            alt={destination.name}
                                            style={{ width: "100px", height: "100px" }}
                                            className="mb-2 rounded mx-auto"
                                        />
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SingleInterest;
