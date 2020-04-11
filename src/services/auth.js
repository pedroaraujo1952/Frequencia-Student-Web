export const isAuthenticated = () => {
  const uid = localStorage.getItem("uid");

  if (uid === null) {
    return false;
  } else {
    return true;
  }
};
