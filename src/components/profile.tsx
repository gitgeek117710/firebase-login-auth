import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "./firebase"
import { doc, getDoc } from "firebase/firestore"
import { toast } from "react-toastify"

const Profile = () => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const docRef = doc(db, "Users", user.uid);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            setUserDetails(docSnap.data());
                        } else {
                            toast.error("User data not found.");
                        }
                    } catch (err) {
                        toast.error("Error fetching user data.");
                    }
                } else {
                    navigate("/login");
                }
            });

            return () => unsubscribe(); // cleanup
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            toast.success("Logged out successfully!");
            navigate("/login");
        } catch (error) {
            toast.error("Error logging out.");
        }
    };

    return (
        <div>
            {userDetails ? (
                <>
                    <h3>Welcome {userDetails.firstName}</h3>
                    <div>
                        <p>Email: {userDetails.email}</p>
                        <p>First Name: {userDetails.firstName}</p>
                        <p>Last Name: {userDetails.lastName}</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
