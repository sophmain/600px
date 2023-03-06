import { useState, useEffect } from 'react';
import SignupFormModal from '../SignupFormModal';
import { thunkLoadPhotos } from '../../store/photo';
import OpenModalButton from '../OpenModalButton';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './SplashPage.css'
import { useDispatch, useSelector } from 'react-redux';



const SplashPage = () => {
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(thunkLoadPhotos())
    }, [dispatch])
    const photos = useSelector((state)=> state.photos.allPhotos)
    if (!photos) return null
    const photosArr = Object.values(photos)
    console.log('photos', photos)

    return (
        <div className='splash-page-container'>
            <div className='splash-photo-container'>
                {/* <img src={photos[currentBackground]} alt='background' className='background-image-splash'></img> */}
                <div className='splash-page-carousel'>
                    <Carousel
                        className='splash-page-carousel'
                        interval={4000}
                        transitionTime={1000}
                        showArrows={false}
                        showStatus={false}
                        infiniteLoop={true}
                        showThumbs={false}
                        autoPlay={true}
                        stopOnHover={false}
                        showIndicators={false}

                    >
                        <img src='https://i.imgur.com/ZYbx75I.jpg' height='100%' width='100%'/>
                        <img src='https://i.imgur.com/CfJh2Pa.jpg' height='100%' width='100%'/>
                        <img src='https://i.imgur.com/jDUym8X.jpg' height='100%' width='100%'/>
                        <img src='https://i.imgur.com/EOOyVE4.jpg' height='100%' width='100%'/>
                        <img src='https://i.imgur.com/EtAD0p3.jpg' height='100%' width='100%'/>
                        <img src='https://i.imgur.com/LCOsnOs.jpg' height='100%' width='100%'/>

                    </Carousel>
                </div>
                <div className='linear-gradient-splash'></div>
                <div className='text-over-photo-splash'>
                    <h1 style={{ fontSize: '44px' }}>Discover and share the world's best photos</h1>
                    <p classname='detail-text-splash'>Get inspired with incredible photos from diverse styles and genres around the world. Build a portfolio and showcase your work- get immediate exposure with your first upload.</p>
                    <div>
                        <OpenModalButton
                            className='sign-up-modal-splash'
                            buttonText="Sign up"
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                </div>
                <div className='editors-choice-container'>
                    <h2>The best of the best.</h2>
                    <p>Hand picked images by some of the best photographers on our site. </p>
                    <div className='editors-picks-photo-container'>
                        <img className='image-size' src={photosArr[0].photoUrl} alt='drone over ship hong kong'></img>
                        <img className='image-size' src={photosArr[34].photoUrl} alt='drone over ship hong kong'></img>
                        <img className='image-size' src={photosArr[37].photoUrl} alt='drone over ship hong kong'></img>
                        <img className='image-size' src={photosArr[4].photoUrl} alt='drone over ship hong kong'></img>
                        <img className='image-size' src={photosArr[18].photoUrl} alt='drone over ship hong kong'></img>
                        <img className='image-size' src={photosArr[6].photoUrl} alt='drone over ship hong kong'></img>
                        <img className='image-size' src={photosArr[35].photoUrl} alt='drone over ship hong kong'></img>
                        <img className='image-size' src={photosArr[11].photoUrl} alt='drone over ship hong kong'></img>
                    </div>
                </div>

            </div>

        </div>

    )
}
export default SplashPage
