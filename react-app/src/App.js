import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SinglePhoto from './components/SinglePhoto';
import AllPhotos from "./components/AllPhotos";
import UploadPhoto from "./components/UploadPhoto";
import PostPhoto from "./components/PostPhoto";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import EditPhoto from "./components/EditPhoto";
import { thunkLoadSinglePhoto } from "./store/photo";
import AllGalleries from "./components/AllGalleries";
import SingleGallery from './components/SingleGallery'
import UserProfile from "./components/UserProfile";
import UserProfileGalleries from './components/UserProfileGalleries'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <AllPhotos />
          </Route>
          <Route path='/photos/:photoId'>
            <SinglePhoto />
          </Route>
          <Route path='/upload'>
            <UploadPhoto />
          </Route>
          <Route path='/post'>
            <PostPhoto />
          </Route>
          <Route path='/manage/:photoId'>
            <EditPhoto />
          </Route>
          <Route exact path='/galleries'>
            <AllGalleries />
          </Route>
          <Route exact path='/galleries/:galleryId'>
            <SingleGallery />
          </Route>
          <Route exact path='/profile/:userId'>
            <UserProfile />
          </Route>
          <Route path='/profile/:userId/galleries'>
            <UserProfileGalleries />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
