import React from 'react';
import { Component } from 'react';
import { MenuItemLink } from 'admin-on-rest';
import { Subheader } from 'material-ui';

import OrganizationSelector from './components/organization-selector';

class AppMenu extends Component {
  render() {
    const { onMenuTap, logout } = this.props;
    return (
      <div>
        <OrganizationSelector/>
        <Subheader>Configuration</Subheader>
        <MenuItemLink to="/publishers" primaryText="Publishers" onClick={onMenuTap} />
        <MenuItemLink to="/hooks" primaryText="Hooks" onClick={onMenuTap} />
        <MenuItemLink to="/subscriptions" primaryText="Subscriptions" onClick={onMenuTap} />
        <Subheader>User</Subheader>
        {logout}
    </div>
    )
  }
}

export default AppMenu;
