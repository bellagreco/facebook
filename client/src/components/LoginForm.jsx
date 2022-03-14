import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const getEmail = (event) => {
        setEmail(event.target.value)
        console.log(event.target.value)
    }

    const getPassword = (event) => {
        setPassword(event.target.value)
        console.log(event.target.value)
    }

    const navigate = useNavigate();

 

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            await axios.post('http://localhost:3001/login', { email: email, password: password })
                .then(res => {
                    console.log(res, 'res')
                    localStorage.setItem('token', res.data.data)
                    localStorage.setItem('email', email)
                    navigate('/profile-page')
                });
            console.log('isabella', email, password)
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <>
            <p>Login</p>
            {console.log('token', localStorage.token, '???')}

            <form>
                <label> Email: <input type="text" name='email' value={email} onChange={(e) => { getEmail(e) }} /> </label>
                <label> Password: <input type="text" name='password' value={password} onChange={(e) => { getPassword(e) }} /> </label>
            </form>
            <button onClick={handleSubmit}>Submit</button>
        </>
    )

}

export default LoginForm;
