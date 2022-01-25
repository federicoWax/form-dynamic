import { Card, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Box, IconButton, Button } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { InputInterface } from '../../Interfaces';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  json: Array<InputInterface>;
}

const initNewInput: InputInterface = {
  id: 0,
  type: "text",
  label: "",
  value: "",
  options: []
};

const Form:FC<Props> = ({json}) => {
  const [values, setValues] = useState<Array<InputInterface>>([]);
  const [formNewInput, setFormNewInput] = useState<InputInterface>(initNewInput);
  const [label, setLabel] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [newValueInput, setNewValueInput] = useState<string>("");

  useEffect(() => {
    if(!loading) return;
    
    setValues(json);
    setLoading(false);
  }, [json, loading]);

  const getInput = (input: InputInterface) => {
    const  { value, label, type, options } = input;

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

  const deleteInput = (id: number) => {
    setValues(values.filter(item => item.id !== id));
  }

  const addNewInput = () => {
    if(!formNewInput.label) return;
    if(["select", "radio"].includes(formNewInput.type) && !formNewInput.options?.length) return;

    const lastItem = values[values.length - 1];
    const id = lastItem ? lastItem.id + 1 : 0;

    setValues([...values, {...formNewInput, id}]);
    setFormNewInput(initNewInput);
  }

  const addValueInput = () => {
    if(formNewInput.options?.includes(newValueInput)) return;

    setFormNewInput({...formNewInput, options: [...formNewInput.options as Array<string>, newValueInput]});
    setNewValueInput("");
  }

  const deletOptionNewInput = (value: string) => {
    setFormNewInput({...formNewInput, options: formNewInput.options?.filter(item => item !== value) as Array<string> }) ;
  }

  return <Box sx={{ display: 'flex' }}>
    <Box sx={{ width: '50%' }}>
      <Card style={{marginLeft: "10%", marginRight: "10%", padding: 100}}>
      {
        values.map(input => {
          return <div key={input.id} style={{margin: 50}}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '100%' }}>
                {getInput(input)}
              </Box>  
              <Box>
                <IconButton onClick={() => deleteInput(input.id)} style={{marginTop: 10}}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </div>;
        })
      }
      </Card>
    </Box>
    <Box sx={{ width: '50%' }}>
      <Card style={{marginLeft: "10%", marginRight: "10%", padding: 100}}>
        <Button variant="contained" style={{marginBottom: 20}} onClick={addNewInput}>
          Agregar
        </Button>
        <TextField 
          style={{marginBottom: 20}}
          value={formNewInput.label}
          label="Nombre del label" 
          fullWidth 
          onChange={e => setFormNewInput({...formNewInput, label: e.target.value})}
          required
          error={formNewInput.label.length === 0}
        />
        <FormControl 
          fullWidth
          style={{marginBottom: 20}}
        >
          <InputLabel>Tipo de input</InputLabel>
          <Select
            value={formNewInput.type}
            label="Tipo de input"
            onChange={e => setFormNewInput({...formNewInput, type: e.target.value as string})}
          >
            <MenuItem value="text">Texto</MenuItem>
            <MenuItem value="select">Selector</MenuItem>
            <MenuItem value="radio">Radio</MenuItem>
          </Select>
        </FormControl>
        {
          ["select", "radio"].includes(formNewInput.type) && <Card style={{padding: 20}}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '100%' }}>
                Valores: { formNewInput.type === "select" ? "Selector" : "Radios" }
                <TextField 
                  style={{marginBottom: 20}}
                  value={newValueInput}
                  label="Valor" 
                  fullWidth 
                  onChange={e => setNewValueInput(e.target.value)}
                />
              </Box>  
              <Box>
                <IconButton onClick={() => addValueInput()} style={{marginTop: 10}}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <br />
            <div>
            {
              formNewInput.options?.map(option => 
                <div key={option} style={{margin: 10}}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '100%' }}>
                    {option}
                    </Box>  
                    <Box>
                      <IconButton onClick={() => deletOptionNewInput(option)} style={{marginTop: 10}}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </div>
              )
            }
            </div>
          </Card>
        }
      </Card>
    </Box>
  </Box>;
};

export default Form;
