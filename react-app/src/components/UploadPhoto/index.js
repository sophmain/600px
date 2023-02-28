import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './UploadPhoto.css'

const UploadPhoto = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // loading message for slow displaying aws upload
        setImageLoading(true);

        const res = await fetch('/api/photos/upload', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/post");
        }
        else {
            setImageLoading(false);
            console.log("error");
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }



    return (
        <div className='upload-container'>
            <h2> Upload</h2>

            <div className='upload-arrow'>
                <div><i className="fa-solid fa-arrow-up"></i></div>
                <h3>Upload photo</h3>
            </div>
            <div className='upload-submit-buttons'>
                <form onSubmit={handleSubmit} className='upload-form'>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                    />
                    {image && (
                        <>
                            <button className='submit-upload' type="submit">Submit photo</button>
                            {(imageLoading) && <p>Loading...</p>}
                        </>
                    )}

                </form>
            </div>

        </div>
    )
}

export default UploadPhoto;
