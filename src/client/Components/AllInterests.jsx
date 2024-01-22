import axios from "axios";
import InterestForm from "./InterestForm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Interest = () => {
    const [interests, setInterests] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingInterest, setEditingInterest] = useState(null);

    useEffect(() => {
        const getInterests = async () => {
            try {
                const { data: foundInterest } = await axios.get("/api/interests");
                setInterests(foundInterest);
            }
            catch(error) {
                console.log(error);
            }
        }
        getInterests();
    }, [])

    const isAdmin = () => {
        return localStorage.getItem("Admin") === "true";
    };
   
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
            setInterests(interests.filter(interest => interest.id !== id));
        } catch(error) {
            console.log(error);
        }
    };
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingInterest(null);
    };

    return (
        <>
            <h2>All Interests</h2>
           {userIsAdmin && (<button onClick={handleAddInterest}>Add New Interest</button>)}
            {showForm && (
                <InterestForm
                    onClose={handleCloseForm}
                    interestToEdit={editingInterest}
                />
            )}
            {interests.map((interest) => (
                <div key={interest.id}>
                    <img src={interest.imageURL} alt={`interest ${interest.name}`} style={{ width: '300px', height: '300px' }} />
                    <Link to={`/interests/${interest.id}`}>
                        <h3>{interest.name}</h3>
                    </Link>
                    {userIsAdmin && (
                        <>
                    <button onClick={() => handleEditInterest(interest)}>Edit</button>
                    <button onClick={() => handleDeleteInterest(interest.id)}>Delete</button>
                    </>)}
                </div>
            ))}
        </>
    )
}