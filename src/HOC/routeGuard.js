// /* eslint-disable react/display-name */
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// import { getUserProfile, invokeNavigate, logout } from "@reduxSlices/authSlice";
// import { USER_LOGIN, GROUP_LOGIN } from "@routes/routes";
// import { TYPE_USER, COOKIE_FIELD } from "@constant/common";

// const routeGuard =
//   (WrappedComponent, typeUser = [TYPE_USER.USER]) =>
//   (wrappedProps) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const authState = useSelector((state) => state.authReducer);
//     const redirectRoute = typeUser.includes(TYPE_USER.USER)
//       ? USER_LOGIN
//       : GROUP_LOGIN;

//     useEffect(() => {
//       if (
//         authState.userProfile &&
//         !typeUser.includes(authState.userProfile?.type)
//       ) {
//         dispatch(logout());
//         return navigate(redirectRoute);
//       }
//       if (authState.userProfile) {
//         setIsAuthenticated(true);
//       }
//     }, [authState.userProfile]);

//     useEffect(() => {
//       if (authState.navigateCode) {
//         navigate(redirectRoute);

//         dispatch(invokeNavigate(false));
//       }
//     }, [authState.navigateCode]);

//     useEffect(() => {
//       const timeLogin = Number(Cookies.get(COOKIE_FIELD.time_login));
//       // Check expired time one day in local
//       if (timeLogin) {
//         const timeOneDate = 1000 * 60 * 60 * 24;
//         const timeCurrent = new Date().getTime();

//         if (timeCurrent >= timeLogin + timeOneDate) {
//           dispatch(logout());
//           navigate(redirectRoute);
//           return;
//         }
//       }

//       if (!authState.userProfile) {
//         dispatch(getUserProfile({ payload: {} }));
//       }
//     }, []);

//     return isAuthenticated && <WrappedComponent {...wrappedProps} />;
//   };

// export default routeGuard;
