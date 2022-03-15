import React, { useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios'
import FileBase from 'react-file-base64';

function Posts(props) {
    const [data, setData] = useState(null)

    const [post, setPost] = useState(null)

    const getPost = (e) => {
        setPost(e.target.value)
    }

    const submitPost = async () => {
        const email = localStorage.getItem('email').toString();
        console.log(email)
        await axios.post(`http://localhost:3001/createPost?email=${email}`, { post: post })
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

    return <div>
        <div className='post__container'>
            <div className='post__header'>
                <div className='post__option'><p>Make Post</p></div>
                <div className='post__option'><p>Photo/Video</p></div>
                <div className='post__option'><p>Life Event</p></div>
                <div className='post__input'>
                    <div className='post__picture'><img src={props.data && props.data.profilePicture} /></div>
                    <input type="text" name='post' value={post} onChange={(e) => { getPost(e) }} />

                </div>
            </div>
        </div>
        {/* <input type="text" name='post' value={post} onChange={(e) => { getPost(e) }} /> */}

        <button onClick={submitPost} > Submit </button>

        {props.data && props.data.posts && props.data.posts.slice(0).reverse().map(x =>
            <div>
                <p>{props.data.name + ' ' + props.data.lastname + ': ' + x}</p>
            </div>
        )}

    </div>;
}

export default Posts