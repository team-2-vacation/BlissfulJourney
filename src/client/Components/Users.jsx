import axios from "axios";
import { useEffect, useState } from "react";

const Users = ({isAdmin}) => {
const [users, setUsers] = useState([])
if (isAdmin === "true"){
useEffect(() => {
    const getUsers = async () => {
        try {
            const { data: users } = await axios.get("/api/users")
            setUsers(users)
        } catch (error) {
            console.log(error)
        } 
    }
    getUsers()
}, [])}

return (
    <>
        <div>
            <h1 className="text-4xl md:text-5xl text-gray-200 font-semibold mb-3 md:mb-0 md:flex-grow text-center">Users</h1>
            <br/>
            <ul className="space-y-10">
            {users.map(user => (
                <li key={user.id}>
                    <p className="leading-loose">{`Username: ${user.username}`}</p>
                    <p className="leading-loose">{`Name: ${user.firstName} ${user.lastName}`}</p>
                    <p className="leading-loose">{`Email Address: ${user.email}`}</p>
                </li>
            ))}
            </ul>
        </div>
    </>
    )
}
  
export default Users