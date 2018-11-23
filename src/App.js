import React, { Component } from 'react';
import './App.css';

class App extends Component {

state = {

 baseCurrency: "USD",
 rates:{},
 comparisons:[],

};

componentDidMount() { 
  fetch("https://api.exchangeratesapi.io/latest?base=USD")
    .then(response => response.json()) 
    .then(api => {
      
      console.log("got data", api.rates); 
      this.setState({
        rates: api.rates, 
    });
  }); 
};





countrySelect = (ev) => {
const comparisons = this.state.comparisons.concat([ev.target.value])
this.setState({comparisons: comparisons});
console.log(comparisons)
const country=(ev.target.value)
console.log(country)
}




onSubmit = (ev) => {

  this.setState({baseCurrency: ev.target.value});
  console.log({baseCurrency: ev.target.value});

  const url = "https://api.exchangeratesapi.io/latest?base="+ ev.target.value;
      // console.log(url)
  fetch(url)
  .then(response => response.json())
      .then(data => {
        // console.log('receiving data', data.rates)
        this.setState({rates:data.rates})
        console.log(data.rates)
        
  });
   

};







// Update statewith new data from the drop down menu

  comparisonRate(comparison) {
   let height = 1/(this.state.rates[comparison])*100
   console.log(height)
   return height

  }

  comparisonValues(comparison){
  let rate = (this.state.rates[comparison])
  return rate
  }

  render() {
    console.log("State:", this.state)

    return (
      <body class="background">
        
       <div class="Container">
         
          <label>Select a Base:
                  <select class="CurrencyChooser-select"    onChange={this.onSubmit} value={ this.state.baseCurrency}><option>EUR</option><option>AUD</option><option>BGN</option><option>BRL</option><option>CAD</option><option>CHF</option><option>CNY</option><option>CZK</option><option>DKK</option><option>GBP</option><option>HKD</option><option>HRK</option><option>HUF</option><option>IDR</option><option>ILS</option><option>INR</option><option>ISK</option><option>JPY</option><option>KRW</option><option>MXN</option><option>MYR</option><option>NOK</option><option>NZD</option><option>PHP</option><option>PLN</option><option>RON</option><option>RUB</option><option>SEK</option><option>SGD</option><option>THB</option><option>TRY</option><option>USD</option><option>ZAR</option></select>
          </label>
          
          
            <nav class="main_nav"> Currency Exchange Rate</nav>

          <label> Select a Country:
                  <select class="CurrencyChooser-select" onChange={this.countrySelect}   country={ this.state.comparison}><option>EUR</option><option>AUD</option><option>BGN</option><option>BRL</option><option>CAD</option><option>CHF</option><option>CNY</option><option>CZK</option><option>DKK</option><option>GBP</option><option>HKD</option><option>HRK</option><option>HUF</option><option>IDR</option><option>ILS</option><option>INR</option><option>ISK</option><option>JPY</option><option>KRW</option><option>MXN</option><option>MYR</option><option>NOK</option><option>NZD</option><option>PHP</option><option>PLN</option><option>RON</option><option>RUB</option><option>SEK</option><option>SGD</option><option>THB</option><option>TRY</option><option>USD</option><option>ZAR</option></select>
          </label>
          
          <div class="Chart">
                 {
                this.state.comparisons.map(comparison => {
                  return <div class="bar" style={{height: this.comparisonRate(comparison) + "%"}}> 
                    {"$" +  this.comparisonValues(comparison)+ comparison}
                  </div>
                })
                }
          </div>
        </div>
      </body>
    );
  }
}
export default App;
