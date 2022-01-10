import { LightningElement, wire } from 'lwc';
import getCars from '@salesforce/apex/CarController.getCars';
import {subscribe, MessageContext, publish, unsubscribe} from 'lightning/messageService';
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c';
import CAR_SELECTED_MESSAGE from '@salesforce/messageChannel/CarSelected__c';

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
        this.filters = message.filters;
    }

    handleCarSelected(event) {
        console.log("select car id", event.detail)
        publish(this.messageContext, CAR_SELECTED_MESSAGE, {
            carId: event.detail
        })
    }

    disconnectedCallback() {
        unsubscribe(this.carsFilterSubscription)
        this.carsFilterSubscription = null
    }
}