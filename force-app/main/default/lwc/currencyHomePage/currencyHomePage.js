import { LightningElement } from 'lwc';

export default class CurrencyHomePage extends LightningElement {
    enteredFromValue;
    enteredToValue;
    get options() {
        return [
            { label: 'USD', value: 'USD' },
            { label: 'INR', value: 'INR' },
            { label: 'AUD', value: 'AUD' },
        ];
    }

    handleChange(event){
        let {name,value} = event.detail;
        if(name === 'fromCurrency'){
            this.enteredFromValue = value;
        }else if (value === 'toCurrency'){
            this.enteredToValue = value;
        }
    }

    buttonClickHandler(){
        console.log('stated')
        const url = `https://api.frankfurter.app/latest?from=${enteredFromValue}&to=${enteredToValue}&apikey=cur_live_qNoiJlifacRHAC556jRHB3qcUkZdvBBOxMoA1h78`;
        
        const res =  fetch(url);
        const data =  res.json();
        console.log('Data fetched',data);
        console.log('Data fetched for rates',data.rates.EUR);

        // fetch(url)
        //   .then(response => response.json())
        //   .then(data => {
        //     const rate = data.rates.EUR;
        //     console.log(rate);
        //   });
    }

}