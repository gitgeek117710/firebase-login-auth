import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth } from "./firebase"
import { toast } from 'react-toastify'
import { useNavigate  } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully!");
            toast.success("User logged in successfully", {
                position: 'top-center',
            })
            navigate("/profile");
        } catch (error){
            console.log(error.message);
            toast.error(error.message, {
                position: 'bottom-center',
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className='form-control'
                    name="title"
                    value={email}
                    placeholder="Enter Email"
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
                <button type='submit' className='button button-primary'>Submit</button>
            </div>
            <p className="forgot-password text-right">
                New user <a href="/register">Register Here</a>
            </p>
        </form>
    )
}

export default Login