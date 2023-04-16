import { useState, useEffect } from "react";
import axios from "axios"

function UnosForma() {
    const [formaPodaci, postaviPodatke] = useState({

    
        ime: "",
        prezime: "",
        dob: "",
        pocetak: "",
        kraj: "",
        klasa: "",
    });
     const saljiPodatke = event => {
    event.preventDefault();
         console.log(formaPodaci);
          const zaSlanje = obradiPodatke(formaPodaci)
  
         axios.post('http://localhost:3001/rezervacije', zaSlanje)
      
  .then(rez =>  {
      props.dodaj(stanje => [...stanje, rez.data])
    })
  };

    const [gradovi, postaviGradove] = useState([]);
     
    const [klase, postaviKlase] = useState([])

    function obradiPodatke(objekt){
  return {
    "osoba" : {
      "ime" : objekt.ime,
      "prezime": objekt.prezime,
      "dob": Number(objekt.dob)
    },
    "karta":{
      "pocetak": objekt.pocetak,
      "kraj": objekt.kraj,
      "klasa": objekt.klasa
    }
  }
    }
    

    useEffect(() => {
    axios
      .get("http://localhost:3001/gradovi")
      .then(rez => postaviGradove(rez.data))
      .catch(err => console.log(err.message));
        
        axios
      .get("http://localhost:3001/klase")
      .then(rez => postaviKlase(rez.data))
      .catch(err => console.log(err.message));
        
    }, []);
    

    function promjenaUlaza(event) {
      console.log(event.target);
  const { name, value } = event.target;
  postaviPodatke({ ...formaPodaci, [name]: value });
}
    return(
    <form onSubmit={saljiPodatke}>
        <div>
      <label>
        Ime:
        <input
          type='text'
          name='ime'
          value={formaPodaci.ime}
          onChange={promjenaUlaza}
          required
        />
      </label>
            </div>
           <div>
    <label>
      Prezime:
      <input type='text' name='prezime' value={formaPodaci.prezime}
        onChange={promjenaUlaza} required />
    </label>
  </div>
  <div>
    <label>
      Godina:
      <input type='number' name='dob' value={formaPodaci.dob}
        onChange={promjenaUlaza} required/>
    </label>
            </div> 
            <div>
  <label>
    Početak putovanja:
    <select
      name='pocetak'
      value={formaPodaci.pocetak}
      onChange={promjenaUlaza}
      required
    >
      <option value=''>--Odaberi grad--</option>
      {gradovi.map(grad => (
        <option key={grad} value={grad}>
          {grad}
        </option>
      ))}
    </select>
  </label>
            </div>
            <div>
  <label>
    Klasa:
    {klase.map(klasa => (
      <label key={klasa.oznaka}>
        <input
          type='radio'
          name='klasa'
          value={klasa.oznaka}
          checked={formaPodaci.klasa === klasa.oznaka}
          onChange={promjenaUlaza}
          required
        />{" "}
        {klasa.ime}
      </label>
    ))}
  </label>
</div>
      <button type='submit'>Nova rezervacija</button>
    </form>
  );
}
 
export default UnosForma;