import axios from "axios";
import { useEffect} from "react";

const Wishlist = ({token}) => {

    useEffect(() => {
        const getWishlist = async() => {
            const data = await axios.get("/api/wishlist", {
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
                },
            })
        }
        getWishlist();
    })
    return (
        <div>
            {token ? (<h1>Your Destination WishList</h1>) : <h1>You Must Be Logged In To See Your Wishlist!</h1>}
        </div>
    )
};
export default Wishlist;