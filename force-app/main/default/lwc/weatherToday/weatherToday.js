import { LightningElement, wire } from 'lwc';
import weather1 from '@salesforce/apex/WeatherClass.weather';

export default class WeatherToday extends LightningElement {
    datasApex
    datasApexBack = []
    datas
    error
    dataBy
    @wire(weather1)
    userDetailHandler({data, error}){
        if(data){
            this.datasApex = JSON.parse(data);
            this.dataBy = this.datasApex['by'];
            console.log(this.datasApex)
        }
        if(error){
            console.error(error)
        }
    }
}