export const isTokenExpired = (token: string) => {
  //   const decoded = jwt_decode(token).exp;
  const tokenExpTime = 1727945805.709;
  const currentTime = Date.now() / 1000; // Get current time in seconds

  console.log(
    'Date.now() / 1000',
    Date.now(),
    Date.now() / 1000 + 60,
    tokenExpTime < currentTime,
  );
  return tokenExpTime < currentTime; // Check if expired
};
