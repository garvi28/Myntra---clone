import {useState} from 'react';
import { mergeRecentlyViewed } from '../utils/merge';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

    const data = await res.json();        
 
//Save login data
        localStorage.setItem("token" , data.token);
        localStorage.setItem("userId" , data.userId);

// Imp merge here
await mergeRecentlyViewed(data.userId);        

alert ("Login successful!");
        } 
        catch (error) {
            console.error(err);
            alert("Login failed!"); 
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                onChange ={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange ={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );