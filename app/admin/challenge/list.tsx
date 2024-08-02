import { Datagrid, List, NumberField, ReferenceField, TextField, SelectField, ArrayField, SingleFieldList, ChipField } from "react-admin";

export const ChallengeList = () => {
  return(
    <List>
    <Datagrid rowClick="edit">
      <TextField source="id"/>
      
      <ArrayField source="descriptions">
          <SingleFieldList>
            <ChipField source="" />
          </SingleFieldList>

        </ArrayField>
        <ArrayField source="imageSrcs">
          <SingleFieldList>
            <ChipField source="" />
          </SingleFieldList>
        </ArrayField>

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
    </Datagrid>
  </List>
  );
};