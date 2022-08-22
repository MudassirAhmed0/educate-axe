// import React, {useEffect, useState} from 'react';
// import { Navigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../../firebase/auth';

// const PrivateRoute = ({ children }) => {
//     const [user, setUser]  = useState({})

//     useEffect(()=> {
//         onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser)
//           }
//         )
//     }, [])

  

//     return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;