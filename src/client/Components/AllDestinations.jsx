import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DestinationForm from "./DestinationForm";

const Destination = () => {
    const [destinations, setDestinations] = useState([])
    const [showForm, setShowForm] = useState(false);
    const [editingDestination, setEditingDestination] = useState(null);

    useEffect(() => {
        async function getDestinations() {
            try {
                const { data: foundDestination } = await axios.get("/api/destinations")
                setDestinations(foundDestination)
            }
            catch (error) {
                console.log(error)

            }
        }
        getDestinations()
    }, [])
    //to check if the user is an admin
    const isAdmin = () => {
        return localStorage.getItem("Admin") === "true";
    };
   
    const userIsAdmin = isAdmin();

    //Add a new destination 
    const handleAddDestination = () => {
        setEditingDestination(null);
        setShowForm(true);
    };

    //Edit destination 
    const handleEditDestination = (destination) => {
        setEditingDestination(destination); 
        setShowForm(true);
    };

    //Delete destintaion 
    const handleDeleteDestination = async (id) => {
        try {
            await axios.delete(`/api/destinations/${id}`);
            setDestinations(destinations.filter(destination => destination.id !== id));
        } catch (error) {
            console.log(error);
        }
    };
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingDestination(null);
    };

    return (
        <div>
            <h2>All Destinations</h2>
           {userIsAdmin && (<button onClick={handleAddDestination}>Add New Destination</button>)}
            {showForm && (
                <DestinationForm
                    onClose={handleCloseForm}
                    destinationToEdit={editingDestination}
                />
            )}
            {destinations.map((destination) => (
                <div key={destination.id}>
                    <img src={destination.imageURL} alt={`destination ${destination.name}`} style={{ width: '300px', height: '300px' }} />
                    <Link to={`/destination/${destination.id}`}>
                        <h3>{destination.name}</h3>
                    </Link>
                    {userIsAdmin && (
                        <>
                    <button onClick={() => handleEditDestination(destination)}>Edit</button>
                    <button onClick={() => handleDeleteDestination(destination.id)}>Delete</button>
                    </>)}
                </div>
            ))}
        </div>
    )
}

export default Destination