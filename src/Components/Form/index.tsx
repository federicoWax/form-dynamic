import { Card, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { InputInterface } from '../../Interfaces';

interface Props {
  json: Array<InputInterface>;
}



const Form:FC<Props> = ({json}) => {
  const [values, setValues] = useState<Array<InputInterface>>([]);

  useEffect(() => {
    setValues(json);
  }, [json]);

  const getInput = (input: InputInterface) => {
    const  { value, label, type, options } = input;

    console.log(type)

    switch (type) {
      case "text":
        return <TextField 
          value={value} 
          label={label} 
          fullWidth 
          onChange={(e) => setValues(values.map(item => item.id === input.id ? {...item, value: e.target.value} as InputInterface : item))}
        />;
      case "select":
        return <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            value={value}
            label={label}
            onChange={(e) => setValues(values.map(item => item.id === input.id ? {...item, value: e.target.value} as InputInterface : item))}
          >
          {
            options?.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            )) 
          }
          </Select>
        </FormControl>;
      case "radio":
        return <FormControl>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            value={value}
            onChange={(e) => setValues(values.map(item => item.id === input.id ? {...item, value: e.target.value} as InputInterface : item))}
          >
          {
            options?.map(option => (
              <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
            ))
          }
          </RadioGroup>
        </FormControl>
    }
  }

  return <Card style={{margin: "10%", padding: 50}}>
    {
      values.map(input => {
        return <div key={input.id} style={{margin: 20}}>
          {getInput(input)}
        </div>;
      })
    }
  </Card>;
};

export default Form;
