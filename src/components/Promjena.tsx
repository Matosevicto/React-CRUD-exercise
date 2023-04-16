import axios from "axios";
 
function Promjena() {
  function saljiZahtjev() {
      axios.put("http://localhost:3001/klase/2", {
        ime: "Poslovna",
      oznaka: "P"
    })
    .then(rez => console.log(rez))
  }
  return <button onClick={saljiZahtjev}>Promjena kategorije</button>;
}
 
export default Promjena;