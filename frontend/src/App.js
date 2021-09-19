import './App.css';
import { useEffect, useState } from 'react';
import SelectSearch from 'react-select-search';



function App() {
  const [data, setData] = useState({});
  const [companies, setCompanies] = useState(["Aetna", "AARP", "Blue Cross"])
  useEffect( () => {
    fetch("http://localhost:5000/data").then(result=>result.json()).then(json=>setData(json));
  }, []
  )
  function deleteCompany(deleted){
    const newCompanies = companies.filter(company => company != deleted)
    setCompanies(newCompanies)  
  }
  
  function addCompany(added){
    const newcompanies = [...companies]
    newcompanies.push(added)
    console.log(added)
    console.log(newcompanies)
    setCompanies(newcompanies)
  }
  const options = Object.keys(data).map(key=>{return {name:key, value:key}});

/* Simple example */
  const procedures = ["Level 4 Office Visit", "Depression Survey"]
  return (
    <div className="App">
      <p id="primaryText">Your practice could be making more money.</p>
          <p id="secondaryText">See verified insurance payouts from doctors like you. Find out which insurances compensate physicians fairly.</p>
          <SelectSearch options={options} value="sv" name="language" placeholder="Choose your language" onChange={option=> addCompany(option)}/>
          <table id="companiesTable">
              <tr id="companies">
                  <td></td>
                  {Object.keys(data).filter(key => companies.includes(key)).map( 
                    key => <td><span class="companyButton"> {key} <i class="far fa-window-close" onClick = {() => deleteCompany(key)}></i></span></td>)}

                  <td>                  
                      <span class="companySearch">
                          <input type="text" placeholder="Add Company..."></input>
                          <i class="far fa-search-plus"></i>
                      </span>
                  </td>
              </tr>
              {procedures.map((name, index) => <tr> <td>{name}</td>{Object.keys(data).filter( key => companies.includes(key)).map(companyName => <td>{data[companyName][index]}</td>)}</tr>)}

          </table>
    </div>
    
  );
}

export default App;