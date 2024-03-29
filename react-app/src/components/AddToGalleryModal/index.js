import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, NavLink } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { thunkLoadGalleries } from '../../store/gallery'
import { thunkPostPhotoGallery } from "../../store/photo";
import CreateGalleryModal from "../CreateGalleryModal";
import OpenModalButton from "../OpenModalButton";
import './AddToGalleryModal.css'

const AddToGalleryModal = ({ photo }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(thunkLoadGalleries())
    }, [])

    const user = useSelector((state) => state.session.user)
    const galleries = useSelector((state) => state.galleries.allGalleries)
    if (!galleries) return null
    const myGalleries = Object.values(galleries).filter((gallery) => gallery.userId === user.id)

    const addToGallery = (e, selectedGallery) => {
        e.preventDefault()
        dispatch(thunkPostPhotoGallery(selectedGallery, [photo.id]))
        closeModal()
    }

    return (
        <div className='your-galleries-select'>
            <div className='exit-create-gallery-modal' onClick={closeModal}><i className="fa-solid fa-x"></i></div>
            <h1 className='add-to-gallery-header'>Add to Gallery</h1>

            <div className='gallery-modal-button-submit'>
                <div className='create-gallery-modal-plus'>
                    <i className="fa-solid fa-plus"></i>
                </div>
                <OpenModalButton
                    className='create-gallery-modal'
                    buttonText='Create new gallery'
                    modalComponent={<CreateGalleryModal photo={photo} />}
                />
            </div>
            <div className='add-to-gallery-scroll'>
                {galleries && myGalleries.map((gallery) => {
                    return (
                        <ul className='select-gallery-list'>
                            <button className='select-gallery-for-photo' onClick={(e) => addToGallery(e, gallery.id)}>
                                {gallery.photos.length > 0 && (
                                    <img src={gallery.photos[0].photoUrl} className='gallery-modal-photo-size' alt='gallery'></img>
                                )}
                                {gallery.photos.length === 0 && (
                                    <img src='https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png' className='gallery-modal-photo-size placehoder-modal' alt='gallery'></img>
                                )}

                                <div className='select-gallery-modal-title'>{gallery.title}</div>
                            </button>
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}

export default AddToGalleryModal
