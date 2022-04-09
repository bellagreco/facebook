import React, { useState } from 'react'
import axios from 'axios'
import EditIcon from '../images/edit.png'

function ProfilePicture(props) {
    const [selectedImage, setSelectedImage] = useState();
    const [loading, setLoading] = useState(false);


    const onImageChange = () => {
        setLoading(true)
        const newImage = document.getElementById('selectedFile');
        const reader = new FileReader();
        reader.readAsDataURL(newImage.files[0]);
        reader.onload = function (e) {
            setSelectedImage(e.target.result)
            submitProfilePicture(e.target.result)
        };
    }


    function submitProfilePicture(newImage) {
        const email = localStorage.getItem('email').toString();
        axios.post(`http://localhost:3001/updateProfilePicture?email=${email}`, { profilePicture: newImage })
            .then(response => {
                if (response.status === 201) {
                    props.setData(response.data)
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    return <>
        <div className='change-profile-picture' style={{ marginBottom: '20px' }}>
            <label for='selectedFile'>
                <div className='circle-2' style={{ zIndex: '9999999' }}>
                    <img style={{ cursor: 'pointer' }} src={EditIcon} />
                </div>
            </label>
            <input style={{ display: 'none' }} id='selectedFile' type="file" onChange={onImageChange} name='testdasdas' ></input>
            { loading && <div style={{ background: 'white', position: 'absolute', top: '45px', left: '5px', opacity: '0.7', width: '160px', height: '160px', zIndex: '9999999999' }}> <img style={{ margin: '65px', height: '30px', width: '30px' }} src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' /></div>}

        </div>
    </>;
}

export default ProfilePicture