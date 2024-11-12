import { 
  Create, 
  NumberInput, 
  ReferenceInput, 
  SimpleForm, 
  TextInput, 
  required, 
  SelectInput, 
  ArrayInput, 
  SimpleFormIterator 
} from "react-admin";

export const ChallengeCreate = () => {
  return(
    <Create>
    <SimpleForm>
    <TextInput 
        source="id"  
        validate={[required()]}
        label="Id"
      />

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

      <ArrayInput source="descriptions" label="Descriptions">
        <SimpleFormIterator>
          <TextInput source="" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="imageSrcs" label="Image Sources">
        <SimpleFormIterator>
          <TextInput source="" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="links" label="Links">
        <SimpleFormIterator>
          <TextInput source="" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="codeSources" label="Code Sources">
        <SimpleFormIterator>
          <TextInput source="" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
  );
};