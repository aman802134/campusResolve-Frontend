export const performLogout = () => {
  // Since tokens are in cookies, you might want to call a logout endpoint
  // that clears the cookies on the server side
  console.log("User logged out");
  // You can add redirect logic here if needed
  // window.location.href = '/login';
};

export const triggerLoginPopup = () => {
  // Add your login popup logic here
  console.log("Login popup triggered");
  // You can add redirect logic here if needed
  // window.location.href = '/login';
};
