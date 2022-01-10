import { LightningElement, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Car__c.Name' 
import PICTURE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c' 
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c' 
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c' 
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c' 
import FUEL_FIELD from '@salesforce/schema/Car__c.Fuel_Type__c'
import SEATS_FIELD from '@salesforce/schema/Car__c.Seats__c'
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c'
import {getFieldValue} from 'lightning/uiRecordApi'
import {subscribe, MessageContext, unsubscribe} from 'lightning/messageService';
import CAR_SELECTED_MESSAGE from '@salesforce/messageChannel/CarSelected__c';

export default class CarCard extends LightningElement {
    categoryField = CATEGORY_FIELD
    makeField = MAKE_FIELD
    msrpField = MSRP_FIELD
    fuelField = FUEL_FIELD
    seatsField = SEATS_FIELD
    controlField = CONTROL_FIELD
    recordId
    @wire(MessageContext)
    messageContext
    carSelectionSubscription

    carName
    carPictureUrl

    handleRecordLoaded(event) {
        const {records} = event.detail
        const recordData = records[this.recordId]
        this.carName = getFieldValue(recordData, NAME_FIELD)
        this.carPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD)
    }

    connectedCallback() {
        this.subscribeHandler()
    }

    subscribeHandler() {
        this.carSelectionSubscription = subscribe(this.messageContext, CAR_SELECTED_MESSAGE, (message) => this.handleCarSelected(message))
    }

    handleCarSelected(message) {
        this.recordId = message.carId
    }

    disconnectedCallback() {
        unsubscribe(this.carSelectionSubscription)
        this.carSelectionSubscription = null
    }
}