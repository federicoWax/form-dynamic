import logo from './logo.svg';
import './App.css';

interface Input {
  id: number;
  type: string;
  label: string;
  value: string | number | boolean;
  options: null | Array<any>
};

const json: Input[] = [
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
      "Si"
    ]
  },
  {
    id: 2,
    type: "radio",
    label: "Input tipo radio",
    value: false,
    options: null
  }
];

function App() {
  return (
    <div className="App">
      hola
    </div>
  );
}

export default App;
