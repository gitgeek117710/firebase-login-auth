import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from 'react'
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user details to Firestore
            await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                firstName: fname,
                lastName: lname,
            });

            // Update display name in Firebase Auth profile
            await updateProfile(user, {
                displayName: `${fname} ${lname}`,
            });

            //console.log("User registered:", user);
            toast.success("User registered successfully!",
                { position: "top-center" }
            );
        } catch (error: any) {
            console.log("Registration error:", error.message);
            toast.success(error.message,
                { position: "bottom-center" }
            );
        }
    };


    return (
        <form onSubmit={handleRegister}>
            <h2>Sign Up</h2>
            <div className="mb-3">
                <label>First Name</label>
                <input
                    type="text"
                    className='form-control'
                    name="fname"
                    value={fname}
                    placeholder="First Name"
                    onChange={(e) => setFname(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Last Name</label>
                <input
                    type="text"
                    className='form-control'
                    name="lname"
                    value={lname}
                    placeholder="Last Name"
                    onChange={(e) => setLname(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Email Address</label>
                <input
                    type="email"
                    className='form-control'
                    name="email"
                    value={email}
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className='form-control'
                    name="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="d-grid">
                <button type='submit' className='button button-primary'>Sign Up</button>
            </div>
            <p className="forgot-password text-right">
                Already registered <a href="/login">Login</a>
            </p>

        </form>
    )
}

export default Register