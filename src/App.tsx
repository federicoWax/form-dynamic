import './App.css';
import Form from './Components/Form';
import { InputInterface } from './Interfaces';

const json: InputInterface[] = [
  {
    id: 0,
    type: "text",
    label: "Input tipo texto",
    value: "",
    options: null
  },
  {
    id: 1,
    type: "select",
    label: "Input tipo select",
    value: "",
    options: [
      "Si",
      "No"
    ]
  },
  {
    id: 2,
    type: "radio",
    label: "Input tipo radio",
    value: "Masculino",
    options: [
      "Masculino",
      "Femenino",
      "Otro"
    ]
  }
];

function App() {
  return (
    <div className="App">
      <Form json={json} />
    </div>
  );
}

export default App;
