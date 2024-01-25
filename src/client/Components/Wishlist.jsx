import axios from "axios";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Wishlist = ({token}) => {
    const [wishlist, setWishlist] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const getWishlist = async() => {
            try {
                const { data: wishlistData} = await axios.get("/api/wishlist", {
                    headers: {
                        Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
                    },
                })
                setWishlist(wishlistData)
            } catch (error) {
                console.log(error)
            }
        }
        getWishlist();
    }, [])

    const removeFromWishlistHandle = async (id, wishlistItem) => {
        const isConfirmed = window.confirm("Are you sure you want to remove this from your wishlist?");
        if (isConfirmed) {
            try {
                const wishlistItemId = +wishlistItem.id
                const removeFromWishlist = await axios.delete(`/api/wishlist/${id}`,  {
                    headers: {
                        Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
                    },
                    data: {
                        wishlistItemId
                    }
                });
                window.alert(removeFromWishlist.data.message)
                navigate("/wishlist")
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            {!token ? <h1>You Must Be Logged In To See Your Wishlist!</h1> : <h1>Your Destination WishList</h1>}
            {token && (
                <div className="flex flex-wrap -m-4">
                    {wishlist.map((wishlistItem) => (
                        <div key={wishlistItem.Destination.id} className="p-4 sm:w-1/2 lg:w-1/3">
                            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                <Link to={`/destinations/${wishlistItem.Destination.id}`}>
                                    <img 
                                        className="lg:h-72 md:h-48 w-full object-cover object-center transform hover:scale-105 transition duration-300"
                                        src={wishlistItem.Destination.imageURL} 
                                        alt={`destination ${wishlistItem.Destination.name}`} 
                                    />
                                </Link>
                                <div className="p-6 hover:bg-gray-300 hover:text-white transition duration-300 ease-in">
                                    <Link to={`/destinations/${wishlistItem.Destination.id}`}>
                                        <h3 className="text-2xl font-semibold mb-3">{wishlistItem.Destination.name}</h3>
                                        <button onClick={() => removeFromWishlistHandle(wishlistItem.Destination.id, wishlistItem)}
                                                className="text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded">
                                                Remove From Wishlist</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;