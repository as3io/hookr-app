// in src/App.js
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Admin, Resource, Delete } from 'admin-on-rest';
import { PublisherList, PublisherEdit, PublisherCreate } from './resources/publishers';
import { HookList, HookEdit, HookCreate } from './resources/hooks';
import { SubscriptionList, SubscriptionEdit, SubscriptionCreate } from './resources/subscriptions';

import translations from './i18n';
import AppMenu from './AppMenu';
import AppLogin from './AppLogin';
import authClient from './services/auth-client';
import restClient from './services/rest-client';
import organizations from './reducers/organization';
import activeOrganization from './reducers/active-organization';

const history = createHistory()

const App = () => (
  <Admin
    customReducers={{ organizations, activeOrganization }}
    messages={translations}
    history={history}
    loginPage={AppLogin}
    authClient={authClient}
    menu={AppMenu}
    title="Hookr"
    restClient={restClient}
  >
    <Resource name="publishers" list={PublisherList} edit={PublisherEdit} create={PublisherCreate} remove={Delete} />
    <Resource name="hooks" list={HookList} edit={HookEdit} create={HookCreate} remove={Delete} />
    <Resource name="subscriptions" list={SubscriptionList} edit={SubscriptionEdit} create={SubscriptionCreate} remove={Delete} />
  </Admin>
);

export default App;
