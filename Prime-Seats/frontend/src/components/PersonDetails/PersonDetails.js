// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const PersonDetails = () => {
//   const isAdmin = useSelector((state) => state.setlogin.isAdmin)
//   const dispatch = useDispatch()
//   const navigate = useNavigate();


//   const Logout = () => {
//     if (isAdmin) {
//       dispatch(adminActions.setlogin());
//     } else {
//       dispatch(personActions.login());
//     }
//     navigate("/login")
//   }
//   return (
//     <div><h1>PersonDetails</h1>
//       <button onClick={()=>Logout}>Logout</button></div>
//   )
// }

// export default PersonDetails;