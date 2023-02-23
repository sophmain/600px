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

    // takes user to the single photo page when clicking photo in all photos page
    const PhotoClick = (e, id) => {
        e.preventDefault()
        history.push(`/photos/${id}`)
    }

    // function getSpanEstimate(size) {
    //     if (size > 290) {
    //         return 2
    //     }
    //     return 1
    // }

    // function GridItem(photo) {
    //     const style = {
    //         gridColumnEnd: `span ${getSpanEstimate(photo.width)}`,
    //         gridRowEnd: `span ${getSpanEstimate(photo.height)}`,
    //         maxHeight: `300px`,
    //         // maxWidth: `900px`,
    //         imageResolution: `from-image 300dpi`
    //     }
    //     return <img style={style} src={photo.photoUrl} alt='grid image' />
    // }

    function randomImageSize (min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }
    function setImageSize(photos, photo){
        let images = ''
        for (let i = 0; i < photos.length; i++){
            let width = randomImageSize(200, 1000);
            let height = randomImageSize(200, 500);
            images += `<img src=${photo.photoUrl} + ${width} + '/' + ${height} + '"alt="grid">`
        }
    }


    return (
        <div className='mapped-photo-container'>
            <h1>Home Feed</h1>
            <h3 className='see-photos'>See photos and published Galleries.</h3>
            <ul className='all-photos' >
                {photos.map((photo) => {
                    return (
                        <div className='photo-card' key={photo.id} onClick={(e) => PhotoClick(e, photo.id)}>
                            <div className='photo-size'>
                                {setImageSize(photos, photo)}
                            </div>

                            <img className='photo-size' src={photo.photoUrl}></img>
                        </div>
                    )
                })}

            </ul>

        </div>
    )
}

export default AllPhotos
