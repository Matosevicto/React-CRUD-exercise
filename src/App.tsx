import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Tablica from "./components/Tablica";
import UnosForma from "./components/UnosForma";
import Brisanje from "./components/Brisanje";
import Promjena from "./components/Promjena";
function App() {
  const [rezervacije, postaviRezervacije] = useState([]);
 
  useEffect(() => {
    axios
      .get("http://localhost:3001/rezervacije/")
      .then(res => postaviRezervacije(res.data));
  }, []);
 
  return (
    <div className='App'>
      <h2>Popis rezervacija</h2>
      <Tablica rezervacije={rezervacije} />
       <h2>Nova rezervacija</h2>
      <UnosForma dodaj={postaviRezervacije} />
      <Brisanje promjena={postaviRezervacije} />
      <Promjena/>

    </div>
  );
}
 
export default App;
