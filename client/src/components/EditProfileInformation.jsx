import React, { useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios'

function EditInformation (props) {
    const [data, setData] = useState(null)
    const [post, setPost] = useState(null)
    const [relationshipStatus, setRelationshipStatus] = useState(null)
    const [network, setNetwork] = useState(null)
    const [city, setCity] = useState(null)
    const [website, setWebsite] = useState(null)
    const [birthday, setBirthday] = useState(null)

    const getRelationshipStatus = (e) => {
        setRelationshipStatus(e.target.value)
    }


    const getNetwork = (e) => {
        setNetwork(e.target.value)
    }

    const getWebsite = (e) => {
        setWebsite(e.target.value)
    }

    const getBithday = (e) => {
        setBirthday(e.target.value)
    }

    const getCity = (e) => {
        setCity(e.target.value)
    }

    const submitInfo = async () => {
        const email = localStorage.getItem('email').toString();
        console.log(email)
        await axios.post(`http://localhost:3001/updateInfo?email=${email}`, { relationshipStatus: relationshipStatus, networks: network, city: city, birthday: birthday, website: website })
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
                <input type="text" name='network' value={network} onChange={(e) => { getNetwork(e) }} />
                <input type="text" name='relationshipStatus' value={relationshipStatus} onChange={(e) => { getRelationshipStatus(e) }} />
                <input type="text" name='city' value={city} onChange={(e) => { getCity(e) }} />
                <input type="text" name='birthday' value={birthday} onChange={(e) => { getBithday(e) }} />
                <input type="text" name='website' value={website} onChange={(e) => { getWebsite(e) }} />
                <button onClick={submitInfo} > Submit New Information </button>
    </>
  }


export default EditInformation