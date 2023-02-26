import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, NavLink } from 'react-router-dom'
import { thunkLoadGalleries } from "../../store/gallery"
import './AllGalleries.css'

const AllGalleries = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkLoadGalleries())
    }, [dispatch])

    const allGalleriesObj = useSelector((state) => state.galleries.allGalleries)
    if (!allGalleriesObj) return null
    const galleries = Object.values(allGalleriesObj)

    const toGallery = (gallery) => {
        history.push(`/galleries/${gallery.id}`)
    }

    return (
        <div>
            <div className='all-gallery-header'>
                <h1 className='all-gallery-title'>Featured galleries</h1>
                <p className='all-gallery-subheader'>Browse through some of the best galleries on 600px.</p>
                <div className='subheader-home'>
                    <NavLink to={'/'} className='not-selected-subheader' style={{marginRight: '15px'}}>Home</NavLink>
                    <NavLink to={'/galleries'} className='selected-subheader'>Galleries</NavLink>
                </div>
            </div>
            <div className='all-galleries-background'>
                <ul className='all-galleries'>
                    {galleries.map((gallery) => {
                        return (
                            <div>
                                {gallery.photos.length > 0 && (
                                    <div className='gallery-card' key={gallery.id} onClick={() => toGallery(gallery)}>
                                        <img className='photo-size all-gallery-image' src={gallery.photos[0].photoUrl} alt='gallery'></img>
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
                                )}
                            </div>

                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default AllGalleries
