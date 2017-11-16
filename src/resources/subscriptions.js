import React from 'react';
import { List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';
import UrlField from '../fields/url-field';

export const SubscriptionList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField label="Publisher" source="publisher" reference="publishers">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Hook" source="hook" reference="hooks">
                <TextField source="key" />
            </ReferenceField>
            <TextField source="description" />
            <UrlField source="url" />
            <EditButton/>
        </Datagrid>
    </List>
);

const SubscriptionName = ({ record }) => {
  return <span>Subscription {record ? `"${record.name}"` : ''}</span>;
};

export const SubscriptionEdit = (props) => (
  <Edit title={<SubscriptionName />} {...props}>
      <SimpleForm>
          <DisabledInput source="id" />
          <TextInput source="name" />
          <ReferenceInput label="Publisher" source="publisher" reference="publishers">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Hook" source="hook" reference="hooks">
                <SelectInput optionText="key" />
            </ReferenceInput>
          <LongTextInput source="description" />
          <TextInput source="url" />
      </SimpleForm>
  </Edit>
);

export const SubscriptionCreate = (props) => (
  <Create {...props}>
      <SimpleForm>
          <TextInput source="name" />
          <ReferenceInput label="Publisher" source="publisher" reference="publishers" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Hook" source="hook" reference="hooks" allowEmpty>
                <SelectInput optionText="key" />
            </ReferenceInput>
          <LongTextInput source="description" />
          <TextInput source="url" />
      </SimpleForm>
  </Create>
);
