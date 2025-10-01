export const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    secure: true,
    sameSite: 'None',
    path: '/',
  });
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 60 * 1000),
    secure: true,
    sameSite: 'None',
    path: '/',
  });
};
