import React, { useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios'
import FileBase from 'react-file-base64';


function CoverPicture(props) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [data, setData] = useState(null)



    const submitCoverPicture = async () => {
        const email = localStorage.getItem('email').toString();
        console.log(selectedImage)
        await axios.post(`http://localhost:3001/updateCoverPicture?email=${email}`, { profileCover: selectedImage })
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
        <div style={{ width: '850x', marginBottom: '50px', overflow: 'hidden' }}>
            <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setSelectedImage(base64)}
            />
            <button onClick={submitCoverPicture} > Submit Cover Picture</button>

        </div>
    </>;
}

export default CoverPicture