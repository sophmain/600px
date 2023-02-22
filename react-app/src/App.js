import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SinglePhoto from './components/SinglePhoto';
import AllPhotos from "./components/AllPhotos";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

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
        </Switch>
      )}
    </>
  );
}

export default App;
