// React and Appwrite imports
import { createContext, useEffect, useState } from "react"
import {ID } from "react-native-appwrite"

// Access appwrite database and table
import { account } from "../lib/appwrite"

// Create User Context to manage user authentication state and actions
export const UserContext = createContext()

export function UserProvider({ children }) {
    // State to manage user data and auth check status
    const [user, setUser] = useState(null)
    const [ authChecked, setAuthChecked ] = useState(false);

    async function login(email, password) {

        try {
            await account.createEmailPasswordSession({email, password})
            const loggedInUser = await account.get()
            setUser(loggedInUser)
        } catch (error) {
            throw Error(error.message)
        }   
    }

    async function register(name, email, password) {
        try {
            const newUser = await account.create({
                userId: ID.unique(),
                name,
                email,
                password
        })
            setUser(newUser)
            console.log("User registered successfully:", newUser)

            await login(email, password)
        } catch (error) {
            throw Error(error.message)
        }   
    }

    async function logout() {
        try {
            await account.deleteSession("current")
            setUser(null)
            console.log("User logged out successfully")
        } catch (error) {
            throw Error(error.message)
        }
    }

    // Fetch user on component mount, if logged in when app starts
    async function getInitialUserValues() {
        try {
            const loggedInUser = await account.get()
            setUser(loggedInUser);
        } catch (error) { 
            // No user logged in
            setUser(null);
        } finally {
            // Indicate that auth check is complete
            setAuthChecked(true);
        }

    }

    useEffect(() => {
        getInitialUserValues()
    }, [])

    return (
        <UserContext.Provider value={{ user, login, register, logout, authChecked }}>
            {children}
        </UserContext.Provider>
    )

}