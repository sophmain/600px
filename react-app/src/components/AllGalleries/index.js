import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, NavLink } from 'react-router-dom'
import { thunkLoadGalleries } from "../../store/gallery"
import './AllGalleries.css'

const AllGalleries = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  // Fetch all galleries on mount
  useEffect(() => {
    dispatch(thunkLoadGalleries())
  }, [dispatch])

  // Get all galleries from Redux store
  const allGalleriesObj = useSelector((state) => state.galleries.allGalleries)

  // Return null if galleries not loaded yet when component renders- bc thunk is async
  if (!allGalleriesObj) return null

  // Convert galleries object to array
  const galleries = Object.values(allGalleriesObj)

  // Filter galleries that have photos and are tagged as 'visible'
  const galleryShow = galleries.filter((gallery) => gallery.photos.length > 0 && gallery.visible == true)

  // Navigate to selected gallery
  const toGallery = (gallery) => {
    history.push(`/galleries/${gallery.id}`)
  }

  return (
    <div>
      <div className='all-gallery-header'>
        <h1 className='all-gallery-title'>Featured Galleries</h1>
        <p className='all-gallery-subheader'>Browse through some of the best galleries on 600px.</p>
        <div className='subheader-home'>
          <NavLink to={'/'} className='not-selected-subheader' style={{marginRight: '15px'}}>Home</NavLink>
          <NavLink to={'/galleries'} className='selected-subheader'>Galleries</NavLink>
        </div>
      </div>
      <div className='all-galleries-background'>
        <div className='all-galleries'>
          {galleryShow.map((gallery) => {
            return (
              <div key={gallery.id}>
                {gallery.photos.length > 0 && (
                  <div className='gallery-card' onClick={() => toGallery(gallery)}>
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
        </div>
      </div>
    </div>
  )
}

export default AllGalleries
