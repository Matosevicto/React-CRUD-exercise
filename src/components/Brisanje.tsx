import axios from "axios";
import { useState } from "react";
 
function Brisanje(props) {
    const [idPodatka, postaviId] = useState(0);
    
    function brisiPodatak() {
        console.log(`Brišem podatak broj ${idPodatka}`);
         axios
    .delete(`http://localhost:3001/rezervacije/${idPodatka}`)
    .then(rez => console.log(rez));
    }

      async function brisiPodatak() {
  await axios.delete(`http://localhost:3001/rezervacije/${idPodatka}`);   
  props.promjena(stanje => stanje.filter(el => el.id != idPodatka));
}
     return (
    <div>
      <h2>Brisanje podataka</h2>
      <div>
        <label>
          Unesite ID podatka:
          <input
            type='number'
            name='id'
            value={idPodatka}
            onChange={e => postaviId(e.target.value)}
          />
        </label>
      </div>
      <button onClick={brisiPodatak}>Obriši rezervaciju</button>
    </div>
  );
}
 
export default Brisanje;