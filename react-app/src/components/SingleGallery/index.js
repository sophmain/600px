import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { thunkLoadSingleGallery } from '../../store/gallery'
import { thunkEditPhoto, thunkLoadPhotos } from '../../store/photo'
import './SingleGallery.css'

const SingleGallery = () => {
    const { galleryId } = useParams()

    // const galleryPhotos = photos.filter(photo => photo.galleryId == gallery.id)

    return (
        <div>

        </div>
    )
}
export default SingleGallery
