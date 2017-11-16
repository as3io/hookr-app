import { jsonServerRestClient, fetchUtils } from 'admin-on-rest';
import initActiveOrg from '../reducers/active-organization';
import { ORG_INIT } from '../actions/active-organization';

const apiHost = process.env.REACT_APP_BACKEND_URI;

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);

  try {
    const activeOrganization = initActiveOrg(null, { type: ORG_INIT });
    options.headers.set('X-Organization', activeOrganization.username);
  } catch (e) {
    return Promise.reject(new Error('Unable to find an active organization -- are you logged in?'));
  }
  return fetchUtils.fetchJson(url, options);
}

export default jsonServerRestClient(`${apiHost}/api`, httpClient);
