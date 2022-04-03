import React, { useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios'
import FileBase from 'react-file-base64';
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
                if(response.status === 201) { 
                    props.setData(response.data) 
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log(error)
            })



    }
    return <>
        <div className='change-profile-picture' style={{ width: '200px', marginBottom: '50px'}}>
            <label for='selectedFile'>                            <img style={{ cursor: 'pointer' }} src={EditIcon} />
            </label>
            <input style={{ display: 'none' }} id='selectedFile' type="file" onChange={onImageChange} name='testdasdas' ></input>
           {loading && <div style={{ background:'white', position:'absolute', top:'12px', left:'-140px', opacity:'0.7' , width:'160px', height:'160px', zIndex:'-1'}}> <img style={{margin:'65px', height:'30px', width:'30px'}} src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' /></div>}

        </div>
    </>;
}

export default ProfilePicture