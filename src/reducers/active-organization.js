import { ORG_INIT, ORG_SET } from '../actions/active-organization';

export default (activeOrganization = null, { type, payload }) => {
  // @todo move these out of the reduers, make accept payloads
  const profile = JSON.parse(localStorage.getItem('profile'));
  const { orgs } = profile || { orgs: [] };

  const getOrgs = () => {
    if (null === profile) return orgs;
    const userOrg = { username: profile.username, name: profile.username, photo: profile.photo };
    return [userOrg].concat(orgs);
  }

  switch (type) {
    case ORG_INIT:
      try {
        let org = JSON.parse(localStorage.getItem('activeOrganization'));
        if (org === null) {
          const orgs = getOrgs();
          return orgs.length ? orgs[0] : null;
        }
        return org;
      } catch (e) {
        return null;
      }

    case ORG_SET:
      const { org } = payload;
      localStorage.setItem('activeOrganization', JSON.stringify(org));
      return org;
    default:
      return activeOrganization;
  }
};
