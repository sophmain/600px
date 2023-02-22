import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { thunkLoadPhotos } from '../../store/photo'
import OpenModalButton from '../OpenModalButton'
import './AllPhotos.css'

const AllPhotos = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkLoadPhotos())
    }, [dispatch])

    const allPhotosObj = useSelector((state) => state.photos.allPhotos)

    if (!allPhotosObj) return null

    const photos = Object.values(allPhotosObj)
    console.log('photos arr from store', photos)

    // takes user to the single photo page when clicking photo in all photos page
    const PhotoClick = (e, id) => {
        e.preventDefault()
        history.push(`/photos/${id}`)
    }

    return (
        <div>
            <form action="{{url_for('create')}}" method="POST" enctype="multipart/form-data">
                <label for="user_file">Upload Your File</label>
                <input type="file" name="user_file"></input>
                <button type="submit">Upload</button>
            </form>
            <ul className='all-photos'>
                {photos.map((photo) => {
                    return (
                        <div className='photo-card' onClick={(e) => PhotoClick(e, photo.id)}>
                            <img className='photo-size' src={photo.photoUrl}></img>
                        </div>
                    )
                })}

            </ul>

        </div>
    )
}

export default AllPhotos
