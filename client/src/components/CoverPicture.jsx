import React, { useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios'
import FileBase from 'react-file-base64';


function CoverPicture (props) {
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
       <div style={{ width: '850x', height: '250px', marginBottom: '50px', overflow: 'hidden'  }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover', overflow: 'hidden' }} src={props.data && props.data.profileCover ? props.data.profileCover : 'https://cdn.kapwing.com/final_5dcefe88eefa230014071a02_435224.jpg'} />
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