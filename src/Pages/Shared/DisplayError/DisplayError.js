import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTitle from '../../../hooks/useTitle';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    useTitle("Error ") 

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
             })
            .catch(err => console.log(err));
    }
    return (
	<div id="error-page" className="pt-16 container mx-auto text-center">
      <p className="text-3xl font-bold p-3">Buy & Sale</p>
      <h1 className="text-9xl  font-bold">404</h1>
      <br /><br />
      <h1>Oops! This is an Error Page</h1>
      <p>Sorry, an unexpected error has occurred. Please go back</p>
      <p className="text-red-600 p-3">
        <i>{error.statusText || error.message}</i>
      </p>
      <p className="text-3xl font-bold p-3">Hazrat Ali</p>
	  <h4 className="text-3xl"> Please <button className='font-bold text-red-500' onClick={handleLogOut}>Sign out</button> and again login</h4>
    </div>
    );
};

export default DisplayError;