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
          <Route path='/galleries'>
          <AllGalleries />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
