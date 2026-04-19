// React and Appwrite imports
import { createContext, useEffect, useState } from "react"
import {ID } from "react-native-appwrite"

// Access appwrite database and table
import { account } from "../lib/appwrite"
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"

// Create User Context to manage user authentication state and actions
export const UserContext = createContext()

export function UserProvider({ children }) {
    // State to manage user data and auth check status
    const [user, setUser] = useState(null)
    const [ authChecked, setAuthChecked ] = useState(false)
    const [userPreferences, setUserPreferences] = useState({});

    const [colorTheme, setColorTheme] = useState()

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

            await account.updatePrefs({
                prefs: {
                    Color: "white",
                    Theme: "light",
                    LibCount: true,
                    ReadCount: true,
                    TBRCount: true,
                    PageCount: true,
                    FaveGenre: true
                }
            })
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
            getUserPreferences();
        } catch (error) { 
            // No user logged in
            setUser(null);
        } finally {
            // Indicate that auth check is complete
            setAuthChecked(true);
        }

    }

    const getUserPreferences = async () => {
    try {
        // Returns a JSON object containing the user's custom fields
        const preferences = await account.getPrefs();
        console.log('User Preferences:', preferences);

        setUserPreferences(preferences)
        
        console.log('User Preferences:', userPreferences);
    
        return preferences;
    } catch (error) {
        console.error('Error fetching preferences:', error.message);
    }
}

    async function updateUserPreferences({
        
    }) {
    try {
        await account.updatePrefs({ prefs: preferences });
        setPrefs(preferences);
    } catch (error) {
        console.error('Error updating preferences:', error.message);
    }
}


    useEffect(() => {
        getInitialUserValues()
    }, [])

    return (
        <UserContext.Provider value={{ user, login, register, logout, authChecked, userPreferences }}>

            {children}

        </UserContext.Provider>
    )

}