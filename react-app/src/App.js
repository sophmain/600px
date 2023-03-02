import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SinglePhoto from './components/SinglePhoto';
import AllPhotos from "./components/AllPhotos";
import UploadPhoto from "./components/UploadPhoto";
import PostPhoto from "./components/PostPhoto";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import EditPhoto from "./components/EditPhoto";
import AllGalleries from "./components/AllGalleries";
import SingleGallery from './components/SingleGallery'
import UserProfile from "./components/UserProfile";
import UserProfileGalleries from './components/UserProfileGalleries'
import EditGallery from "./components/EditGallery";
import CreateGalleryForm from "./components/CreateGalleryForm";
import EditProfile from "./components/EditProfile";
import SplashPage from "./components/SplashPage"; 


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector((state) => state.session.user)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            {user !== null && (
              <AllPhotos />
            )}
            <SplashPage />
          </Route>
          <Route exact path='/photos/:photoId'>
            <SinglePhoto />
          </Route>
          <Route exact path='/upload'>
            <UploadPhoto />
          </Route>
          <Route exact path='/post'>
            <PostPhoto />
          </Route>
          <Route exact path='/manage/:photoId'>
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
          <Route exact path='/profile/:userId/galleries'>
            <UserProfileGalleries />
          </Route>
          <Route exact path='/galleries/:galleryId/edit'>
            <EditGallery />
          </Route>
          <Route exact path='/profile/:userId/galleries/create'>
            <CreateGalleryForm />
          </Route>
          <Route exact path='/profile/:userId/edit'>
            <EditProfile />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
