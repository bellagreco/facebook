import React, { useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios'
import FileBase from 'react-file-base64';
import ProFilePicture from '../components/ProfilePicture';
import ProfileInformation from '../components/ProfileInformation';
import EditInformation from '../components/EditProfileInformation';
import Posts from '../components/Posts';


function ProfilePage() {
    const [data, setData] = useState(null)
    const [post, setPost] = useState(null)
    const [relationshipStatus, setRelationshipStatus] = useState(null)
    const [network, setNetwork] = useState(null)
    const [city, setCity] = useState(null)
    const [website, setWebsite] = useState(null)
    const [birthday, setBirthday] = useState(null)
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

    // const getPost = (e) => {
    //     setPost(e.target.value)
    // }

    // const getRelationshipStatus = (e) => {
    //     setRelationshipStatus(e.target.value)
    // }


    // const getNetwork = (e) => {
    //     setNetwork(e.target.value)
    // }

    // const getWebsite = (e) => {
    //     setWebsite(e.target.value)
    // }

    // const getBithday = (e) => {
    //     setBirthday(e.target.value)
    // }

    // const getCity = (e) => {
    //     setCity(e.target.value)
    // }


    // const submitPost = async () => {
    //     const email = localStorage.getItem('email').toString();
    //     console.log(email)
    //     await axios.post(`http://localhost:3001/createPost?email=${email}`, { post: post })
    //         .then(response => console.log(response, 'POST'))
    //         .catch(error => {
    //             console.log(error)
    //         })

    //     await axios.get(`http://localhost:3001/getProfile?email=${email}`)
    //         .then(response => setData(response.data))
    //         .catch(error => {
    //             console.log(error)
    //         })

    // }

    // const submitInfo = async () => {
    //     const email = localStorage.getItem('email').toString();
    //     console.log(email)
    //     await axios.post(`http://localhost:3001/updateInfo?email=${email}`, { relationshipStatus: relationshipStatus, networks: network, city: city, birthday: birthday, website: website })
    //         .then(response => console.log(response, 'POST'))
    //         .catch(error => {
    //             console.log(error)
    //         })

    //     await axios.get(`http://localhost:3001/getProfile?email=${email}`)
    //         .then(response => setData(response.data))
    //         .catch(error => {
    //             console.log(error)
    //         })

    // }

    const submitProfilePicture = async () => {
        const email = localStorage.getItem('email').toString();
        console.log(selectedImage)
        await axios.post(`http://localhost:3001/updateProfilePicture?email=${email}`, { profilePicture: selectedImage })
            .then(response => console.log(response, 'POST'))
            .catch(error => {
                console.log(error)
            })

        await axios.get(`http://localhost:3001/getProfile?email=${email}`)
            .then(response => setData(response.data))
            .catch(error => {
                console.log(error)
            })

    }



    return (
        <>
            {console.log(data, 'DATAAA')}
            <h1>Hello {data && data.name + ' ' + data.lastname}!</h1>
            <div style={{ width: '200px', height: '200px', marginBottom: '50px' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'contain', overflow: 'hidden' }} src={data && data.profilePicture ? data.profilePicture : 'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg'} />
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setSelectedImage(base64)}
                />
                <button onClick={submitProfilePicture} > Submit Profile Picture</button>

            </div>


            <EditInformation data={data}  />

            <ProfileInformation data={data} />
            <Posts data={data} />
            <LogoutButton />
        </>
    )


}

export default ProfilePage