import { ORG_GET_ALL } from '../actions/organization';

export default (organizations = [], { type, payload }) => {
  // @todo move these out of the reduers, make accept payloads
  const profile = JSON.parse(localStorage.getItem('profile'));
  const { orgs } = profile || { orgs: [] };
  const getOrgs = (profile, orgs) => {
    if (null === profile) return orgs;
    const userOrg = { username: profile.username, name: profile.username, photo: profile.photo };
    return [userOrg].concat(orgs);
  }

  switch (type) {
    case ORG_GET_ALL:
      organizations = getOrgs(profile, orgs);
      return organizations;
    default:
      return organizations;
  }
};
