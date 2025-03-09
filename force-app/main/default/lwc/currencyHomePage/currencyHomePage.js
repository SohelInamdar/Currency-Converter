import { LightningElement, track } from 'lwc';

export default class CurrencyHomePage extends LightningElement {
    enteredFromValue;
    enteredToValue;
    convertedValue;
    inputValue;
    options = [];
    @track displayData = false;
    @track displayValue;

    connectedCallback(){
        this.fetchCurrencies();
    }

    async fetchCurrencies(){
        let url = 'https://api.frankfurter.app/currencies'
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        var sOpt = [];
        for(let sym in data){
            sOpt = [...sOpt,{label:sym,value:sym}];
        }
        this.options = [...sOpt];
        // console.log(this.options);    
    }
   
    handleChange(event){
        let {name,value} = event.target;
        if(name === 'fromCurrency'){
            this.enteredFromValue = value;
            // console.log(this.enteredFromValue);
        }else if (name === 'toCurrency'){
            this.enteredToValue = value;
            // console.log(this.enteredToValue);
        }
    }
    amountChangeHandler(event){
        this.inputValue = event.target.value;
        // console.log(typeof(this.inputValue));
    }

    async fetchCurrencyValues(){
        console.log('inside');
        const url = `https://api.frankfurter.app/latest?from=${this.enteredFromValue}&to=${this.enteredToValue}&apikey=cur_live_qNoiJlifacRHAC556jRHB3qcUkZdvBBOxMoA1h78`;    
        const res =  await fetch(url);
        const data =  await res.json();
        console.log('Data fetched',data);
        // console.log('Data fetched for rates : ',data.rates);
        if(data.rates){
            this.convertedValue = data.rates;
            this.displayData = true;
            // console.log(typeof(this.convertedValue));
        }
        var intValue = (this.convertedValue[`${this.enteredToValue}`]);
        this.displayValue = Number(intValue) +  + Number(this.inputValue);
        
        console.log('Converted Value ', displayValue);
    }

    buttonClickHandler(){
        console.log('started')
        this.fetchCurrencyValues();

        // fetch(url)
        //   .then(response => response.json())
        //   .then(data => {
        //     const rate = data.rates.EUR;
        //     console.log(rate);
        //   });
    }

}