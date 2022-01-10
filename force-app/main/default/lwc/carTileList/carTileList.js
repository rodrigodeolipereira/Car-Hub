import { LightningElement, wire } from 'lwc';
import getCars from '@salesforce/apex/CarController.getCars';
import {subscribe, MessageContext} from 'lightning/messageService';
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c';

export default class CarTileList extends LightningElement {

    cars
    error
    filters = {}
    carsFilterSubscription

    @wire (getCars, {filters: '$filters'}) 
    carsHandler ({data, error}) {
        if (data) {
            //console.log(data)
            this.cars = data
        }
        if (error) {
            //console.log(error)
            this.error = error
        }
    }

    @wire(MessageContext)
    messageContext

    connectedCallback() {
        this.subscribeHandler()
    }

    subscribeHandler() {
        this.carsFilterSubscription = subscribe(this.messageContext, CARS_FILTERED_MESSAGE, (message) => this.handlerFilteredChanges(message))
    }

    handlerFilteredChanges(message) {
        console.log('Message bring from channel: ' + JSON.stringify(message.filters))
        this.filters = message.filters;
    }
}