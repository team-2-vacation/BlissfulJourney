import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Attractions = () => {
    const [attractions, setAttractions] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const getAttraction = async () => {
            try {
                const { data: foundAttraction } = await axios.get(`/api/attractions`);
                setAttractions(foundAttraction);
                setCurrentSlide(0);
            } catch (error) {
                console.log(error);
            }
        };
        getAttraction();
    }, []);

    const nextSlide = () => {
        setCurrentSlide(slide => (slide + 1) % attractions.length);
    };

    const prevSlide = () => {
        setCurrentSlide(slide => (slide - 1 + attractions.length) % attractions.length);
    };

    const jumpToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 3000);
        return () => clearInterval(timer);
    }, [attractions.length]);

    return (
        <>
            <section className="md:h-full flex items-center text-gray-600">
                <div className="container px-3 py-4 mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl text-gray-200 font-semibold mb-3 md:mb-4 md:flex-grow">
                            Discover the Attractions
                        </h1>
                        {attractions.length > 0 && (
                            <div className="relative">
                                <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            className="w-full h-full object-cover"
                                            style={{ maxHeight: "500px" }}
                                            src={attractions[currentSlide].imageURL}
                                            alt={`attraction ${attractions[currentSlide].name}`}
                                        />
                                        <div className="absolute inset-0 flex items-end justify-center pb-5">
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-center">
                                                <h2 className="text-2xl text-white font-bold mb-4">{attractions[currentSlide].name}</h2>
                                            </div>
                                        </div>
                                  
                                </div>
                                <div className="absolute inset-0 flex justify-between items-center px-3 py-2">
                                    <button onClick={prevSlide} className="text-white text-2xl">
                                        <IoIosArrowBack />
                                    </button>
                                    <button onClick={nextSlide} className="text-white text-2xl">
                                        <IoIosArrowForward />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
                                    {attractions.map((attraction, index) => (
                                        <span
                                            key={index}
                                            className={`inline-block h-1 w-2 mx-1 cursor-pointer rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
                                            onClick={() => jumpToSlide(index)}
                                        ></span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Attractions;
