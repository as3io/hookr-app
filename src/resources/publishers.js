import React from 'react';
import UrlField from '../fields/url-field';
import {
    List,
    Edit,
    Create,
    Datagrid,
    // ReferenceField,
    TextField,
    EditButton,
    DisabledInput,
    // LongTextInput,
    // ReferenceInput,
    // SelectInput,
    SimpleForm,
    TextInput,
} from 'admin-on-rest';

export const PublisherList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="apiKey" />
            <UrlField source="url" />
            <EditButton/>
        </Datagrid>
    </List>
);

const PublisherName = ({ record }) => {
  return <span>Publisher {record ? `"${record.name}"` : ''}</span>;
};

export const PublisherEdit = (props) => (
  <Edit title={<PublisherName />} {...props}>
      <SimpleForm>
          <DisabledInput source="id" />
          <TextInput source="name" />
          <TextInput source="url" />
          <DisabledInput source="apiKey" />
      </SimpleForm>
  </Edit>
);

export const PublisherCreate = (props) => (
  <Create {...props}>
      <SimpleForm>
          <TextInput source="name" />
          <TextInput source="url" />
      </SimpleForm>
  </Create>
);
