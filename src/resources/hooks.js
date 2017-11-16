import React from 'react';
import { List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';

export const HookList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField label="Publisher" source="publisher" reference="publishers">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="key" />
            <TextField source="description" />
            <EditButton/>
        </Datagrid>
    </List>
);

const HookName = ({ record }) => {
  return <span>Hook {record ? `"${record.key}"` : ''}</span>;
};

export const HookEdit = (props) => (
  <Edit title={<HookName />} {...props}>
      <SimpleForm>
          <DisabledInput source="id" />
            <ReferenceInput label="Publisher" source="publisher" reference="publishers">
                <SelectInput optionText="name" />
            </ReferenceInput>
          <TextInput source="key" />
          <LongTextInput source="description" />
      </SimpleForm>
  </Edit>
);

export const HookCreate = (props) => (
  <Create {...props}>
      <SimpleForm>
            <ReferenceInput label="Publisher" source="publisher" reference="publishers" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
          <TextInput source="key" />
          <LongTextInput source="description" />
          <TextInput source="url" />
      </SimpleForm>
  </Create>
);
