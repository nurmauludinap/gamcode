import { Create, NumberInput, ReferenceInput, SimpleForm, TextInput, required, SelectInput, ArrayInput, SimpleFormIterator } from "react-admin";

export const ChallengeCreate = () => {
  return(
    <Create>
    <SimpleForm>
      <ArrayInput source="descriptions">
        <SimpleFormIterator>
          <TextInput label="Description" source="" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <ArrayInput source="imageSrcs">
        <SimpleFormIterator>
          <TextInput label="Image Source" source="" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <TextInput 
        source="question"  
        validate={[required()]}
        label="Question"
      />
      
      <SelectInput
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
        validate={[required()]}
      />
      
      <ReferenceInput
        source="lessonId"
        reference="lessons"
      />
      
      <NumberInput
        source="order"
        validate={[required()]}
        label="Order"
      />
    </SimpleForm>
  </Create>
  );
};