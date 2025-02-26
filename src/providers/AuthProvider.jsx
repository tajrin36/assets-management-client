import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth'
import axios from "axios";
// import axios from "axios";

export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = async () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
        })
    }

    // role
    const fetchUserRole = async (email) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${email}`);
            return response.data.role;
        } catch (err) {
            console.error("Error fetching user role:", err);
            return null;
        }
    }


    // original
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            console.log('CurrentUser-->', currentUser?.email)
            if (currentUser?.email) {
                setUser(currentUser)

                // set user info in db
                await axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`,
                    {
                        name: currentUser?.displayName,
                        image: currentUser?.photoURL,
                        email: currentUser?.email,
                    }
                )

                // Get JWT token
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/jwt`,
                    {
                        email: currentUser?.email,
                    },
                    { withCredentials: true }
                )
            } else {
                setUser(currentUser)
                await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
                    withCredentials: true,
                })
            }
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])


    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, async currentUser => {
    //         if (currentUser?.email) {
    //             setUser(currentUser);

    //             // Check if user exists in DB and fetch role
    //             const { data: existingUser } = await axios.get(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`);
    //             let userRole = existingUser?.role || "employee"; // Default to "employee" if new user

    //             // If user does not exist, store info with role
    //             if (!existingUser) {
    //                 await axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`, {
    //                     name: currentUser?.displayName,
    //                     image: currentUser?.photoURL,
    //                     email: currentUser?.email,
    //                     role: userRole,
    //                 });
    //             }

    //             // Store user role in state (if needed for role-based routing)
    //             currentUser.role = userRole;

    //             // Get JWT token
    //             await axios.post(
    //                 `${import.meta.env.VITE_API_URL}/jwt`,
    //                 { email: currentUser?.email },
    //                 { withCredentials: true }
    //             );
    //         } else {
    //             setUser(currentUser);
    //             await axios.get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true });
    //         }
    //         setLoading(false);
    //     });
    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);


    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        fetchUserRole,
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider