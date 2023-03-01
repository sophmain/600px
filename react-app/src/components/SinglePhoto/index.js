import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams, NavLink } from "react-router-dom"
import { thunkLoadAllComments, thunkPostComment, thunkEditComment, thunkDeleteComment } from "../../store/comment"
import { thunkLoadPhotos, thunkLoadSinglePhoto } from "../../store/photo"
import './SinglePhoto.css'

const SinglePhoto = () => {

    const { photoId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [newComment, setNewComment] = useState('')
    const [editComment, setEditComment] = useState('')
    const [postButton, setPostButton] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [editPostButton, setEditPostButton] = useState(false)
    const [currentComment, setCurrentComment] = useState('')

    useEffect(() => {
        dispatch(thunkLoadSinglePhoto(photoId))
        dispatch(thunkLoadPhotos())
        dispatch(thunkLoadAllComments(photoId))

    }, [dispatch, photoId])

    const user = useSelector((state) => state.session.user)
    console.log('user', user)
    const photo = useSelector((state) => state.photos.singlePhoto)
    const comments = useSelector((state) => state.comments.photoComments)
    const allPhotos = useSelector((state) => state.photos.allPhotos) //get length to prevent right arrow on last img
    if (!comments) return null
    const commentsArr = Object.values(comments)
    if (!allPhotos) return null
    const allPhotosArr = Object.values(allPhotos)
    if (!photo) return null

    const editPhoto = () => {
        history.push(`/manage/${photo.id}`)
    }
    const prevPhoto = () => {
        if (photo.id !== 1) {
            history.push(`/photos/${photo.id - 1}`)
        }
    }
    const nextPhoto = () => {
        if (allPhotosArr.length !== photo.id) {
            history.push(`/photos/${photo.id + 1}`)
        }
    }

    //comment object to send to thunk
    const commentPayload = {
        // userId: user.id,
        // photoId: +photoId,
        comment: newComment
    }
    //edited comment to send to thunk
    const editedCommentPayload = {
        // userId: user.id,
        // photoId: +photoId,
        comment: editComment
    }
    //function to send comment, hide post button and clear comment box
    const sendComment = () => {
        dispatch(thunkPostComment(commentPayload, photoId))
        setPostButton(false)
        setNewComment('')
    }

    //function to edit comment user has already posted
    const updateComment = (commentId) => {

        dispatch(thunkEditComment(editedCommentPayload, commentId))
        setShowEditForm(false)
        setEditPostButton(false)
        setEditComment('')
    }

    const deleteComment = (commentId) => {
        dispatch(thunkDeleteComment(commentId))
    }

    return (
        <div className='page-background'>
            <div className='photo-background'>
                <div className='single-photo-container'>
                    {photo.id !== 1 && (
                        <div className='single-photo-nav' onClick={prevPhoto}><i className="fa-solid fa-chevron-left"></i></div>
                    )}
                    {(photo.id === 1 && (
                        <div className='nav-placeholder'></div>
                    ))}
                    <div className='single-photo-size'>
                        <img className='single-photo' src={photo.photoUrl} alt='selected'></img>
                    </div>
                    {allPhotosArr.length !== photo.id && (
                        <div className='single-photo-nav' onClick={nextPhoto}><i className="fa-solid fa-chevron-right"></i></div>
                    )}
                    {(allPhotosArr.length === photo.id && (
                        <div className='nav-placeholder'></div>
                    ))}
                </div>
            </div>
            <div className='single-lower-container'>
                <div className='single-photo-about-container'>
                    {user && user.id === photo.userId && (
                        <div className='single-photo-edit-buttons'>
                            <button className='edit-photo-button' onClick={editPhoto}><i className="fa-regular fa-pen-to-square"></i></button>
                        </div>
                    )}
                    <div className='single-photo-profile-info'>
                        <div className='single-left-right-profile'>
                            <div className='single-right-profile'>
                                <h2 className='single-photo-title'>{photo.title}</h2>
                                <div>by
                                    <NavLink to={`/profile/${photo.userId}`} className='single-photo-owner'> {photo.uploadedFirstName} {photo.uploadedLastName}</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='single-location'>

                    </div>
                    {photo.location && (
                        <div className='single-location'>
                            <i className="fa-solid fa-location-dot"></i>
                            <p>{photo.location}</p>
                        </div>
                    )}
                    <div className='single-taken-updated'>
                        {photo.takenDate && (
                            <>
                                <p className='single-taken'>Taken: </p>
                                <p className='single-taken-data'>{photo.takenDate.slice(0, 10)}</p>
                            </>
                        )}
                        <p className='single-taken'>Uploaded:</p>
                        <p className='single-taken-data'>{photo.uploadDate.slice(0, 16)}</p>
                    </div>
                    {photo.cameraType && (
                        <div className='single-camera-info'>
                            <img className='lense-photo' src='https://cdn-icons-png.flaticon.com/512/4584/4584897.png' alt='camera'></img>
                            <p>{photo.cameraType}</p>
                        </div>
                    )}
                    {photo.lenseType && (
                        <div className='single-lense-info'>
                            <img className='lense-photo' src='https://as2.ftcdn.net/jpg/02/49/90/21/160_F_249902158_Nngbp2SO00lZyvnhEhXG4S2LtOaJDx5R.jpg' alt='lense'></img>
                            <p>{photo.lenseType}</p>
                        </div>
                    )}
                    <div className='single-category-info'>
                        <div className='single-category'>Category: </div>
                        <p className='single-category-data'>{photo.category}</p>
                    </div>



                </div>
                <div className='single-photo-comments-container'>
                    {user && user.prof_photo_url && (
                        <div className='post-comment-box'>
                            <div className='comment-poster-prof'>
                                <img src={user.prof_photo_url} className='small-profile-icon' alt='profile'></img>
                            </div>
                            <form className='post-comment-form'>
                                <label className='comment-form-data'>
                                    <input
                                        className='comment-text'
                                        placeholder='Add a comment'
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        onClick={(e) => { e.preventDefault(); setPostButton(true) }}
                                    />
                                </label>
                                {postButton && (
                                    <button className='comment-post-button' onClick={sendComment}>Post</button>
                                )}
                            </form>
                        </div>
                    )}

                    <div className='posted-comments-container'>
                        <h3 className='posted-comments-header'>
                            {commentsArr.length} Comments
                        </h3>
                        {commentsArr.length > 0 && commentsArr.map((comment) => {
                            return (
                                <div className='single-comment'>
                                    <img className='small-profile-icon' src={comment.userProfile} alt='commenter profile'></img>
                                    <h3 className='commenter-name'>
                                        <div>{comment.userFirstName} {comment.userLastName}</div>
                                        <div className='comment-date'>{comment.updatedAt.slice(0, 12)}</div>
                                    </h3>
                                    {!showEditForm && (
                                        <p className='comment-text'>
                                            {comment.comment}
                                        </p>
                                    )}

                                    {user !== null && user.id === comment.userId && (
                                        <>
                                            {showEditForm && currentComment === comment.id && (
                                                <form className='post-comment-form'>
                                                    <label className='comment-form-data'>
                                                        <input
                                                            className='comment-text'
                                                            // placeholder={comment.comment}
                                                            type="text"
                                                            value={editComment}
                                                            onChange={(e) => setEditComment(e.target.value)}
                                                            onClick={(e) => { e.preventDefault(); setEditPostButton(true) }}
                                                        />
                                                    </label>
                                                    {editPostButton && (
                                                        <button className='comment-post-button' onClick={() => updateComment(comment.id)}>Post</button>
                                                    )}
                                                </form>
                                            )}
                                            <button className='edit-comment-button' onClick={() => { setShowEditForm(!showEditForm); setCurrentComment(comment.id); setEditComment(comment.comment) }}>Edit</button>
                                            <button className='delete-comment-button' onClick={() => deleteComment(comment.id)}>Delete</button>
                                        </>
                                    )}

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default SinglePhoto
