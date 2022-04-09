import React, { useState } from 'react'
import LogoutButton from '../LogoutButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios'
import FileBase from 'react-file-base64';
import './styles.scss'
import Pen from './pen.png'
import Gallery from './gallery.png'

function Posts(props) {
    const [post, setPost] = useState(null)

    const getPost = (e) => {
        setPost(e.target.value)
    }

    const submitPost = async () => {
        const email = localStorage.getItem('email').toString();
        console.log(email)
        await axios.post(`http://localhost:3001/createPost?email=${email}`, { post: post })
        .then(response => props.setData(response.data))
        .catch(error => {
                console.log(error)
            })
    }

    return <div>
        <div className='post__container'>
            <div className='post__header'>
                <div className='post__option'><img src={Pen}></img><p>Make Post</p></div>
                <div className='post__option'><img src={Gallery}></img><p>Photo/Video</p></div>
            </div>
            <div className='post__input'>
                <div className='post__picture'><div className='post__img'><img src={props.data && props.data.profilePicture} /> </div></div>
                <textarea type="text" name='post' value={post} onChange={(e) => { getPost(e) }} placeholder="Write something here..." />
            </div>
            <div className='post__footer'>
                <button onClick={submitPost} > Submit </button>
            </div>

        </div>
        {/* <input type="text" name='post' value={post} onChange={(e) => { getPost(e) }} /> */}


        {props.data && props.data.posts && props.data.posts.slice(0).reverse().map(x =>
            <div className='post__box'>
                <div className='post__box-header'>
                    <div className='post__picture'>
                        <div className='post__img'>
                            <img src={props.data && props.data.profilePicture} />
                        </div>
                    </div>
                    <p>{props.data.name + ' ' + props.data.lastname}</p>
                </div>
                <div className='post'>
                    <p>{x}</p>
                </div>
            </div>
        )}

    </div>;
}

export default Posts