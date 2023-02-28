import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { thunkLoadGalleries } from '../../store/gallery'
import { thunkPostPhotoGallery } from "../../store/photo";

const AddToGalleryModal = ({ photo }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const [selectedGallery, setSelectedGallery] = useState([])
    console.log('selected gallery', selectedGallery)

    useEffect(() => {
        dispatch(thunkLoadGalleries())
    }, [])

    const user = useSelector((state) => state.session.user)
    const galleries = useSelector((state) => state.galleries.allGalleries)
    if (!galleries) return null
    const myGalleries = Object.values(galleries).filter((gallery) => gallery.userId === user.id)

    const addToGallery = (e) => {
        e.preventDefault()
        dispatch(thunkPostPhotoGallery(selectedGallery, [photo.id]))
        closeModal()
    }

    return (
        <div className='your-gallieries-select'>
            {galleries && myGalleries.map((gallery) => {
                return (
                    <ul>
                        <button className='my-gallery-select' onClick={(e) => {e.preventDefault(); setSelectedGallery(gallery.id)}}>{gallery.title}</button>
                    </ul>
                )
            })}
            <button className='post-to-gallery-button' onClick={(e)=> addToGallery(e)}>Add to Gallery</button>
        </div>
    )
}

export default AddToGalleryModal
