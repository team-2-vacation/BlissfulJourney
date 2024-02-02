import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';

const Attractions = () => {
    const [search, setSearch] = useState("");
    const [attractions, setAttractions] = useState([]); 

    const filteredAttractions = attractions.filter(attraction =>
        attraction.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const getAttraction = async () => {
            try {
                const { data: foundAttraction } = await axios.get(`/api/attractions`);
                setAttractions(foundAttraction);
            } catch (error) {
                console.log(error);
            }
        }
        getAttraction();
    }, []);

    return (
        <>
            <section className="md:h-full flex items-center text-gray-600">
                <div className="container px-3 py-4 mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-12">
                            <h1 className="text-4xl md:text-5xl text-gray-700 font-semibold mb-3 md:mb-0 md:flex-grow text-center">Attractions</h1>
                            <div className="flex items-center border-2 border-gray-300 bg-white rounded-lg text-sm">
                                <input
                                    className="flex-grow h-8 px-5 text-sm focus:outline-none rounded-l-lg"
                                    placeholder="Search for an attraction"
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
                        <div className="flex flex-wrap -m-4">
                            {filteredAttractions.map(attraction => (
                                <div key={attraction.id} className="p-4 sm:w-1/2 lg:w-1/3">
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                        <Link to={`/attractions/${attraction.id}`}>
                                            <img
                                                className="lg:h-72 md:h-48 w-full object-cover object-center transform hover:scale-105 transition duration-300"
                                                src={attraction.imageURL}
                                                alt={`attraction ${attraction.name}`}
                                            />
                                        </Link>
                                        <div className="p-6 hover:bg-gray-300 hover:text-white transition duration-300 ease-in">
                                            <Link to={`/attractions/${attraction.id}`}>
                                                <h3 className="text-2xl font-semibold mb-3">{attraction.name}</h3>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Attractions;
