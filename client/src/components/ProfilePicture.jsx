import React, { useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios'
import FileBase from 'react-file-base64';


function ProFilePicture (props) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [data, setData] = useState(null)



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
    return <>
       <div style={{ width: '200px', height: '200px', marginBottom: '50px' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'contain', overflow: 'hidden' }} src={props.data && props.data.profilePicture ? data.profilePicture : 'https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2013/08/facebook-silhouette_thumb.jpg'} />
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setSelectedImage(base64)}
                />
                <button onClick={submitProfilePicture} > Submit Profile Picture</button>

            </div>
    </>;
  }

  export default ProFilePicture