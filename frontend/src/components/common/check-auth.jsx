import React from "react";
import { Navigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  // Not Loged in
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  //   Loged in but if user go to shop/Page if Admin go to admin/dashboard

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/shop/home"} />;
    }
  }

  // Loggedin as User and try to access /admin page navigate  it to unauth page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to={"/unauth-page"} />;
  }

  // Loggedin as admin and try to access /shop page navigate  it to admin/dashboard

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }
  // If no condition met render this
  return <>{children}</>;
}

export default CheckAuth;
