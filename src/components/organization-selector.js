import React from 'react';
import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { userLogout as userLogoutAction, MenuItemLink } from 'admin-on-rest';
import Settings from 'material-ui/svg-icons/action/settings';
import Domain from 'material-ui/svg-icons/social/domain';
import { List, ListItem, Avatar, Subheader } from 'material-ui';
import { getOrganizations } from '../actions/organization';
import { initActiveOrg, setActiveOrg } from '../actions/active-organization';

class OrganizationSelector extends Component {
  componentWillMount() {
    this.props.getOrganizations();
    this.props.initActiveOrg();
  }

  render() {
    const { activeOrganization, setActiveOrg, userLogout, organizations } = this.props;
    const Organizations = organizations.map((org, index) => (
      <MenuItemLink
        to={'/' + org.username}
        key={org.username}
        primaryText={org.name}
        label={org.name}
        onClick={() => setActiveOrg(org)}
        leftIcon={<Avatar src={org.photo}/>}
      />
    ));
    Organizations.unshift((<Subheader key={'subhead'}>Select an organization</Subheader>));
    Organizations.push((<ListItem key={'review-settings'} title="Missing an organization?" primaryText="Review Settings" leftIcon={<Settings/>} target="_blank" href="https://github.com/settings/connections/applications/04f659c2a8181b380962" onClick={userLogout} />));
    return (
      <List>
        <ListItem
          primaryText={activeOrganization ? activeOrganization.username : 'Select an organization'}
          leftIcon={<Domain/>}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={Organizations}
        />
      </List>
    )
  }
}

OrganizationSelector.propTypes = {
  initActiveOrg: PropTypes.func.isRequired,
  setActiveOrg: PropTypes.func.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.array.isRequired,
  activeOrganization: PropTypes.object,
}

const mapStateToProps = state => ({
  activeOrganization: state.activeOrganization,
  organizations: state.organizations,
})
const mapDispatchToProps = {
  userLogout: userLogoutAction,
  setActiveOrg,
  initActiveOrg,
  getOrganizations,
}
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationSelector);
// export default OrganizationSelector;
