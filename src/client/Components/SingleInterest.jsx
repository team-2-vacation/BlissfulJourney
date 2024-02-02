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
        };

        const getAllDestinations = async () => {
            try {
                const { data: destinations } = await axios.get("/api/destinations");
                setAllDestinations(destinations);
            } catch (error) {
                console.log(error);
            }
        };
        getInterest();
        getAllDestinations();
    }, [id]);

    useEffect(() => {
        const filtered = allDestinations.filter((destination) => destination.interestId === +id);
        setFilteredDestinations(filtered);
    }, [allDestinations, id]);

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
                        className="mb-4 max-w-full h-auto mx-auto rounded-lg"
                        style={{ maxHeight: "300px" }}
                    />
                )}
                <div className="flex flex-wrap -m-4 justify-center">
                    {filteredDestinations.map((destination, index) => (
                        <div key={index} className="p-4 sm:w-1/2 lg:w-1/3">
                            <div className="h-full border-2 border-gray-200  border-opacity-60 rounded-lg overflow-hidden">
                                <Link to={`/destinations/${destination.id}`}>
                                    <img
                                        className="w-full h-48 object-cover object-center transform hover:scale-105 transition duration-300 mx-auto rounded-lg"
                                        src={destination.imageURL}
                                        alt={destination.name}
                                    />
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