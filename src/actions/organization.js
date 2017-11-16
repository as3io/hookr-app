// Action Types
export const ORG_GET_ALL = 'HOOKR/ORG_GET_ALL';
export const ORG_GET = 'HOOKR/ORG_GET';
export const ORG_SET = 'HOOKR/ORG_SET';

// Action Creators
export const getOrganizations = () => ({ type: ORG_GET_ALL });
export const getActiveOrg = () => ({ type: ORG_GET });
export const setActiveOrg = index => ({ type: ORG_SET, index });
