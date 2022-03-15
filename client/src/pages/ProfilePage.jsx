import React, { useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios'
import FileBase from 'react-file-base64';
import ProfilePicture from '../components/ProfilePicture';
import ProfileInformation from '../components/ProfileInformation';
import EditInformation from '../components/EditProfileInformation';
import Posts from '../components/Posts';
import CoverPicture from '../components/CoverPicture';


function ProfilePage() {
    const [data, setData] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);


    const navigate = useNavigate();


    useEffect(async () => {
        const email = localStorage.getItem('email').toString();
        if (email) {
            console.log(localStorage.getItem('email'), 'THIS IS THE TOKEN')

            await axios.get(`http://localhost:3001/getProfile?email=${email}`)
                .then(response => setData(response.data))
                .catch(error => {
                    console.log(error)
                })
        }
        const token = localStorage.getItem("token");

        if (!token) {
            return navigate('/login')
        }

    }, []);



    return (
        <>
            <h1>Hello {data && data.name + ' ' + data.lastname}!</h1>
            <CoverPicture data={data} />
            <ProfilePicture data={data} />
            <EditInformation data={data} />
            <ProfileInformation data={data} />
            <Posts data={data} />
            <LogoutButton />
        </>
    )


}

export default ProfilePage