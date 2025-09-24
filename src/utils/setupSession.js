export const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    Secure: true,
    SameSite: 'None',
  });
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 60 * 1000),
    Secure: true,
    SameSite: 'None',
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    Secure: true,
    SameSite: 'None',
  });
};
// налаштувати корс
// і кукіс samesite and secure
