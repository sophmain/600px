import { useState, useEffect } from 'react';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import './SplashPage.css'


const SplashPage = () => {

    const photos = [
        'https://i.imgur.com/ZYbx75I.jpg',
        'https://vastphotos.com/files/uploads/photos/10828/photos-of-france-m.jpg?v=20220712073521',
        'https://vastphotos.com/files/uploads/photos/10780/photo-of-mountains-and-stars-l.jpg?v=20220712073521',
        'https://vastphotos.com/files/uploads/photos/10316/new-york-city-night-and-day-photo-l.jpg?v=20220712073521',
        'https://vastphotos.com/files/uploads/photos/10691/peaceful-water-landscape-photo-m.jpg?v=20220712073521',
        'https://vastphotos.com/files/uploads/photos/10688/incredible-landscape-photo-m.jpg?v=20220712073521'
    ]

    const [currentBackground, setCurrentBackground] = useState(0)
    // const [showPhoto, setShowPhoto] = useState()

    useEffect(() => {
        const photoInterval = setInterval(() => {
            // setShowPhoto(`show-${currentBackground}`)
            if (currentBackground + 1 > photos.length - 1) {
                setCurrentBackground(0)
            } else {
                setCurrentBackground((currentBackground + 1))
            }

        }, 4000)
        return () => clearInterval(photoInterval)

    }, [currentBackground])

    return (
        <div className='splash-page-container'>
            <div className='splash-photo-container'>
                <img src={photos[currentBackground]} alt='background' className='background-image-splash'></img>
                <div className='linear-gradient-splash'></div>
                <div className='text-over-photo-splash'>
                    <h1 style={{fontSize:'44px'}}>Discover and share the world's best photos</h1>
                    <p classname='detail-text-splash'>Get inspired with incredible photos from diverse styles and genres around the world. We're not guided by fads - just great photography.</p>
                    <div>
                        <OpenModalButton
                            className='sign-up-modal-splash'
                            buttonText="Sign up"
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                </div>

            </div>

        </div>

    )
}
export default SplashPage
