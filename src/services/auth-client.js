import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from 'admin-on-rest';
import { fetchUtils } from 'admin-on-rest';

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { code } = params;
    const apiHost = process.env.REACT_APP_BACKEND_URI;
    const exchangeUrl = `${apiHost}/auth/github/callback?code=${code}`;

    return Promise.resolve()
      .then(() => fetchUtils.fetchJson(exchangeUrl, {}))
      .then(response => {
        const payload = JSON.parse(response.body);
        const { profile, token } = payload;
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('token', token);
        return Promise.resolve();
      })
      ;
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  }
  return Promise.reject('Unkown method');
};
