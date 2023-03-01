import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkLoadGalleries } from "../../store/gallery";
import { thunkLoadPhotos } from "../../store/photo";
import { thunkGetUser } from "../../store/session";
import './UserProfileGalleries.css'


const UserProfileGalleries = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(thunkGetUser(userId))
        dispatch(thunkLoadGalleries())
        dispatch(thunkLoadPhotos())
    }, [dispatch, userId])

    const user = useSelector((state) => state.session.singleUser)
    const loggedInUser = useSelector((state) => state.session.user)
    const galleries = useSelector((state) => state.galleries.allGalleries)

    if (!user) return null
    let galleryArr = []
    if (galleries) {
        galleryArr = Object.values(galleries)
    }
    const userGalleries = galleryArr.filter((gallery) => gallery.userId === user.id)

    const toGallery = (gallery) => {
        history.push(`/galleries/${gallery.id}`)
    }

    return (
        <div className='profile-container'>
            <div className='prof-images-container'>
                {user.cover_photo_url && (
                    <img className='prof-cover-photo' src={user.cover_photo_url} alt='cover'></img>
                )}
                <div className='prof-cover-photo'></div>
                <div className='prof-photo-container'>
                    {user.prof_photo_url && (
                        <img className='prof-photo' src={user.prof_photo_url} alt='profile'></img>
                    )}

                    <i class="fa-solid fa-user-plus prof-photo"></i>
                </div>
                <div className='profile-info'>
                    <div className='profile-edit-buttons'>
                        <button className='edit-profile-button'><i className="fa-regular fa-pen-to-square"></i></button>
                    </div>
                    <h1 className='user-profile-name'>{user.firstName} {user.lastName}</h1>
                    {user.city && (
                        <div className='user-profile-location'><i className="fa-solid fa-location-dot"></i>{user.city}, {user.country}</div>
                    )}
                </div>
            </div>
            <div className='profile-link-headers'>
                <NavLink to={`/profile/${user.id}`} className='not-selected-subheader' style={{ marginRight: '8px' }}>Photos</NavLink>
                <NavLink to={`/profile/${user.id}/galleries`} className='selected-subheader'>Galleries</NavLink>
            </div>
            <div className='all-galleries-background'>

                <ul className='all-galleries'>
                    {loggedInUser.id === +userId && (
                        <div className='create-gallery-card gallery-card'>
                            <i className="fa-regular fa-square-plus"></i>
                            <h3 className='create-gallery-curate'>Curate photos using Galleries</h3>
                            <NavLink className='create-button-gallery' to={`/profile/${user.id}/galleries/create`}>Create a new Gallery</NavLink>

                        </div>
                    )}
                    {userGalleries.map((gallery) => {

                        return (
                            <>
                                {gallery && (
                                    <div>
                                        <div className='gallery-card' key={gallery.id} onClick={() => toGallery(gallery)}>
                                            {gallery.photos.length > 0 && (
                                                <img className='photo-size all-gallery-image' src={gallery.photos[0].photoUrl} alt='gallery'></img>
                                            )}
                                            {gallery.photos.length === 0 && (
                                                <img className='photo-size all-gallery-image' src='https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png' alt='gallery'></img>
                                            )}

                                            <div className='all-gallery-curated'>
                                                <h2 className='all-gallery-owner'>{gallery.title} | Gallery</h2>
                                                <div className='all-gallery-lower'>
                                                    <img src={gallery.userProf} alt='profile of curator' className='all-gallery-prof'></img>
                                                    <p style={{ margin: '10px 0px 10px 0px' }}>Curated by
                                                        <button className='to-profile-button' onClick={(e) => e.stopPropagation()}>
                                                            <NavLink className='all-gallery-to-profile' to={`/profile/${gallery.userId}`}>  {gallery.userFirstName} {gallery.userLastName}</NavLink>
                                                        </button>
                                                    </p>
                                                </div>

                                            </div>


                                        </div>
                                    </div>
                                )}
                            </>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
export default UserProfileGalleries
