import axios from "axios";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";

const Wishlist = ({token}) => {
    const [wishlist, setWishlist] = useState([])
    useEffect(() => {
        const getWishlist = async() => {
            try {
                const { data: wishlist} = await axios.get("/api/wishlist", {
                    headers: {
                        Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
                    },
                })
                setWishlist(wishlist)
            } catch (error) {
                console.log(error)
            }
        }
        getWishlist();
    }, [])


    return (
        <div>
            {!token ? <h1>You Must Be Logged In To See Your Wishlist!</h1> : 
            <h1>Your Destination WishList</h1>}
            {token ? 
            <div className="flex flex-wrap -m-4">
                {destinations.map((destination) => (
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
                            </div>
                        </div>
                    </div>
                ))}
            </div> 
            : null}
        </div>
    );
    }
export default Wishlist;