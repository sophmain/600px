import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './PageNotFound.css'


const NotFound = () => {
    const [countdown, setCountdown] = useState(5);
    const history = useHistory();

    useEffect(() => {
      const interval = setInterval(() => {
        if (countdown > 1) {
          setCountdown(countdown - 1);
        } else {
          history.push('/');
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [countdown, history]);

    // const returnHome = (e) => {
    //     e.preventDefault()
    //     history.push('/')
    // }

    return (
        <div className="not-found-container">
            <div className="not-found2" >
                <p>Redirecting you to home in ... {countdown}</p>
            </div>
            <div className='image-not-found'>
                <img className='img-not-found' src='https://i.imgur.com/mL5N0Yu.jpg'></img>
            </div>

        </div>
    )
}

export default NotFound
