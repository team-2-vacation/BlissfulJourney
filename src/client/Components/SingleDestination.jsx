import { useParams, Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SingleDestination = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState({});
    const [allAttractions, setAllAttractions] = useState([]);
    const [filteredAttractions, setFilteredAttractions] = useState([]);
    const [activeTab, setActiveTab] = useState('description');

    const isUserLoggedIn = () => {
        return localStorage.getItem("TOKEN") !== null;
    };

    useEffect(() => {
        const getDestination = async () => {
            try {
                const { data: foundDestination } = await axios.get(`/api/destinations/${id}`);
                setDestination(foundDestination);
            } catch (error) {
                console.log(error);
            }
        }

        const getAllAttractions = async () => {
            try {
                const { data: attractions } = await axios.get("/api/attractions");
                setAllAttractions(attractions);
            } catch (error) {
                console.log(error);
            }
        }
        getDestination();
        getAllAttractions();
    }, [id]);

    useEffect(() => {
        const filtered = allAttractions.filter(attraction => attraction.destinationId === +id);
        setFilteredAttractions(filtered);
    }, [allAttractions, id]);

    const addToWishHandle = async () => {
        try {
            const data = await axios.post(`/api/wishlist/destination/${id}`, { id },
                {
                    headers: {
                        Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
                    },
                })
        }
        catch (error) {
            console.log(error)
        }
    }
    const tabContent = () => {
        switch (activeTab) {
            case 'description':
                return <p className="text-left text-base">{destination.description}</p>;
            case 'bestTimeToVisit':
                return <p className="text-base">{destination.time_to_visit}</p>;
            case 'averageCost':
                return <p className="text-base">{destination.average_cost}</p>;
            case 'currency':
                return <p className="text-base">{destination.currency}</p>;
            case 'language':
                return <p className="text-base">{destination.language}</p>;
            default:
                return null;
        }
    };

    return (
        <>


            {destination.imageURL && (
                <div
                    className="relative bg-cover bg-center bg-no-repeat h-96 opacity:90"
                    style={{ backgroundImage: `url(${destination.imageURL})` }}
                >
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <h1 className="text-white text-6xl font-bold">{destination.name}</h1>
                    </div>
                    <div className="absolute top-5 right-10  text-white p-2 text-3xl ">
                        <p><strong>{destination.country}</strong></p>
                    </div>
                </div>
            )}
            <div className="container mx-auto p-4">
                <div className="my-6">
                    <div className="flex ">
                        <button className={`py-2 px-4 text-lg  ${activeTab === 'description' ? ' font-medium border-b-2' : ''}`} onClick={() => setActiveTab('description')}>
                            Description
                        </button>
                        <button className={`py-2 px-4 text-lg ${activeTab === 'bestTimeToVisit' ? 'font-medium border-b-2' : ''}`} onClick={() => setActiveTab('bestTimeToVisit')}>
                            Best Time to Visit
                        </button>
                        <button className={`py-2 px-4 text-lg ${activeTab === 'averageCost' ? 'font-medium border-b-2' : ''}`} onClick={() => setActiveTab('averageCost')}>
                            Average Cost
                        </button>
                        <button className={`py-2 px-4 text-lg ${activeTab === 'currency' ? ' font-medium border-b-2' : ''}`} onClick={() => setActiveTab('currency')}>
                            Currency
                        </button>
                        <button className={`py-2 px-4 text-lg ${activeTab === 'language' ? 'font-medium border-b-2' : ''}`} onClick={() => setActiveTab('language')}>
                            Language
                        </button>
                    </div>

                    <div className="bg-white rounded-lg p-6 mb-6">
                        <h2 className="text-3xl font-bold mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}</h2>
                        {tabContent()}
                    </div>
                    <div className="flex flex-wrap -m-4">
                    {filteredAttractions.map((attraction, index) => (
                        <div key={index} className="p-4 md:w-1/2 xl:w-1/3">
                            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 ease-in-out">
                                <Link to={`/attractions/${attraction.id}`}>
                                    <img
                                        src={attraction.imageURL}
                                        alt={attraction.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg">{attraction.name}</h3>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <br />
               
            {isUserLoggedIn() && (
                <button onClick={addToWishHandle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add To Wishlist
                </button>
            )}
        

                {destination.externalURL && (
                    <button onClick={() => window.open(destination.externalURL, "_blank")} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Learn More
                    </button>
                )}
                
                </div>
            </div>
        </>
    )
}
export default SingleDestination;