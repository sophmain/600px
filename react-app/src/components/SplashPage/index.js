import { useState, useEffect } from 'react';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './SplashPage.css'


const SplashPage = () => {


    return (
        <div className='splash-page-container'>
            <div className='splash-photo-container'>
                {/* <img src={photos[currentBackground]} alt='background' className='background-image-splash'></img> */}
                <div className='splash-page-carousel'>
                    <Carousel
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
                        <img src='https://i.imgur.com/ZYbx75I.jpg' />
                        <img src='https://i.imgur.com/CfJh2Pa.jpg' />
                        <img src='https://i.imgur.com/jDUym8X.jpg' />
                        <img src='https://i.imgur.com/EOOyVE4.jpg' />
                        <img src='https://i.imgur.com/EtAD0p3.jpg' />
                        <img src='https://i.imgur.com/LCOsnOs.jpg' />

                    </Carousel>
                </div>
                <div className='linear-gradient-splash'></div>
                <div className='text-over-photo-splash'>
                    <h1 style={{ fontSize: '44px' }}>Discover and share the world's best photos</h1>
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
