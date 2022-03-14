import React from 'react';
import '../style.scss'
// import Logo from './images/image.png'

class Header extends React.Component {
    render() {
        return (
            <>
                <div className='header'>
                    
                    <div className='icon-wrapper'>
                            <img className='logo' src={'https://icon-library.com/images/facebook-icon-white-png/facebook-icon-white-png-19.jpg'} />
                            <input type="text" name="user" placeholder="Search" />

                    </div>
                    <div className='header-wrapper'>
                        <img src='https://cdn.kapwing.com/video_image-PKArdCjxK.png' /><p>Isabella</p>
                        <p>Home</p>
                        <p>Create</p>
                    </div>
                </div>
            </>
        )
    }
}

export default Header;
