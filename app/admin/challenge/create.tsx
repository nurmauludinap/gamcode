import { Create, NumberInput, ReferenceInput, SimpleForm, TextInput, required, SelectInput } from "react-admin";

export const ChallengeCreate = () => {
  return(
    <Create>
    <SimpleForm>
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
      <TextInput 
        source="description1"  
        label="Description 1"
      />
      <TextInput 
        source="description2"  
        label="Description 2"
      />
      <TextInput 
        source="description3"  
        label="Description 3"
      />
      <TextInput 
        source="description4"  
        label="Description 4"
      />
      <TextInput 
        source="description5"  
        label="Description 5"
      />
      <TextInput 
        source="imageSrc1"  
        label="Image 1"
      />
      <TextInput 
        source="imageSrc2"  
        label="Image 2"
      />
      <TextInput 
        source="imageSrc3"  
        label="Image 3"
      />
      <TextInput 
        source="imageSrc4"  
        label="Image 4"
      />
      <TextInput 
        source="imageSrc5"  
        label="Image 5"
      />      
    </SimpleForm>
  </Create>
  );
};