import React, { useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios'

function EditInformation(props) {
    const [data, setData] = useState(null)
    const [post, setPost] = useState(null)
    const [relationshipStatus, setRelationshipStatus] = useState(null)
    const [network, setNetwork] = useState(null)
    const [city, setCity] = useState(null)
    const [website, setWebsite] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [loading, setLoading] = useState(false);


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
        setLoading(true)
        const email = localStorage.getItem('email').toString();
        console.log(email)
        await axios.post(`http://localhost:3001/updateInfo?email=${email}`, { relationshipStatus: relationshipStatus, networks: network, city: city, birthday: birthday, website: website })
        .then(response => {
            if (response.status === 201) {
                props.setData(response.data)
                props.setModalOpen(false)
                setLoading(false)

            }
        })
        .catch(error => {
                console.log(error)
            })
           
    }
    return <div className='edit-information'>
        <div className='edit-information-header'>
            <h2>Edit Information</h2>
            <div className='close-icon' onClick={() => props.setModalOpen(false)} />
        </div>
        <div className='edit-information-body'>
            <div className='edit-information-input'>
                <label>Network:  </label>
                <input type="text" placeholder={props.data && props.data.information.networks} name='network' value={network} onChange={(e) => { getNetwork(e) }} />
            </div>
            <div className='edit-information-input'>
                <label> Relationship Status:</label> <input placeholder={props.data && props.data.information.relationshipStatus} type="text" name='relationshipStatus' value={relationshipStatus} onChange={(e) => { getRelationshipStatus(e) }} />
            </div>
            <div className='edit-information-input'>
                <label>    City: </label>   <input  placeholder={props.data && props.data.information.city}  type="text" name='city' value={city} onChange={(e) => { getCity(e) }} />
            </div><div className='edit-information-input'>
                <label>  Birthday: </label> <input  placeholder={props.data && props.data.information.birthday} type="text" name='birthday' value={birthday} onChange={(e) => { getBithday(e) }} />
            </div>
            <div className='edit-information-input'>
                <label>    Website: </label> <input  placeholder={props.data && props.data.information.website}  type="text" name='website' value={website} onChange={(e) => { getWebsite(e) }} />
            </div>
        </div>
        <div className='edit-information-button'>
            <button className='-primary' onClick={submitInfo} disabled={loading && true} > Submit New Information </button>
        </div>
    </div>
}


export default EditInformation