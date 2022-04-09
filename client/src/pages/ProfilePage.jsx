import React, { useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios'
import FileBase from 'react-file-base64';
import ProfilePicture from '../components/ProfilePicture';
import ProfileInformation from '../components/ProfileInformation';
import EditInformation from '../components/EditProfileInformation';
import Posts from '../components/Posts/Posts';
import CoverPicture from '../components/CoverPicture';


function ProfilePage() {
    const [data, setData] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);


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
            {/* <h1>Hello {data && data.name + ' ' + data.lastname}!</h1> */}



            <div className='profile__cover-wrapper'>
                <div className='profile__cover' style={{ backgroundImage: `url(${data && data.profileCover ? data.profileCover : 'https://cdn.kapwing.com/final_5dcefe88eefa230014071a02_435224.jpg'})` }} >
                    <div className='relative'>
                        <img className='profile__picture' src={data && data.profilePicture ? data.profilePicture : 'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg'} />
                        <ProfilePicture setData={setData} data={data} />
                        <CoverPicture setData={setData} data={data} />
                        <p>{data && data.name} {data && data.lastname}</p>
                    </div>
                </div>

            </div>

            <div className='information'>
                <div className='information-wrapper'>
                    <div className='profile-information'>
                        <ProfileInformation data={data} />
                    </div>
                    <div className='edit-information-area'>
                        <button className='-secondary' onClick={() => setModalOpen(true)}>Edit information</button>
                    </div>
                </div>


            </div>
            <div style={{position:'relative'}}>
            {modalOpen && <EditInformation setModalOpen={setModalOpen} setData={setData} data={data} />}

            </div>
            <Posts setData={setData} data={data} />
            <LogoutButton />
        </>
    )


}

export default ProfilePage