// Action Types
export const ORG_INIT = 'HOOKR/ORG_INIT';
export const ORG_SET = 'HOOKR/ORG_SET';

// Action Creators
export const initActiveOrg = () => ({ type: ORG_INIT });
export const setActiveOrg = org => ({ type: ORG_SET, payload: { org } });
