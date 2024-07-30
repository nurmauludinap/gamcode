import { Datagrid, List, NumberField, ReferenceField, TextField, SelectField } from "react-admin";

export const ChallengeList = () => {
  return(
    <List>
    <Datagrid rowClick="edit">
      <TextField source="id"/>
      <TextField source="question"/>
      <SelectField
        source="type"
        choices={[
          {
            id: "SELECT",
            name: "SELECT",
          },
          {
            id: "ASSIST",
            name: "ASSIST",
          },
        ]}
      />
      <ReferenceField source="lessonId" reference="lessons"/>
      <NumberField source="order"/>
      <TextField source="description1"/>
      <TextField source="description2"/>
      <TextField source="description3"/>
      <TextField source="description4"/>
      <TextField source="description5"/>
      <TextField source="imageSrc1"/>
      <TextField source="imageSrc2"/>
      <TextField source="imageSrc3"/>
      <TextField source="imageSrc4"/>
      <TextField source="imageSrc5"/>
    </Datagrid>
  </List>
  );
};