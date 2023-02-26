
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { thunkEditGallery } from '../../store/gallery'
import './EditGallery.css'

const EditGallery = () => {
    const dispatch = useDispatch()
    const { galleryId } = useParams()

    useEffect(()=>{
        dispatch(thunkEditGallery(galleryId))
    }, [dispatch, galleryId])

    const galleryEdit = useSelector((state)=> state.galleries.singleGallery)
    console.log('GALLERY TO EDIT', galleryEdit)
    
    return (
        <div>

        </div>
    )
}
export default EditGallery
