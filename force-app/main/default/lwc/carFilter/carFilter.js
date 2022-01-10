import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';
import {publish, MessageContext} from 'lightning/messageService';
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c';



const CATEGORY__ERROR = 'Error loading categories'
const MAKE__ERROR = 'Erro loading make types'

export default class CarFilter extends LightningElement {

    filters={
        searchKey:'',
        maxPrice:999999
    }   
    
    CategoryError = CATEGORY__ERROR
    MakeError = MAKE__ERROR

    @wire(MessageContext)
    messageContext

    @wire(getObjectInfo, {objectApiName: CAR_OBJECT}) 
    carObjectInfo

    @wire(getPicklistValues, {
        recordTypeId: '$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: CATEGORY_FIELD
    }) 
    categories

    @wire(getPicklistValues, {
        recordTypeId: '$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: MAKE_FIELD
    }) makeType

    handleSearchKeyChange(event) {
        console.log('handleSearchKeyChange ' + event.target.value)
        this.filters = {...this.filters, "searchKey":event.target.value}
        this.senDataToCarList();
    }

    HandleMaxPriceChange(event) {
        console.log('HandleMaxPriceChange ' + event.target.value)
        this.filters = {...this.filters, "maxPrice":event.target.value}
        this.senDataToCarList()
    } 

    handleCheckBox(event) {
        if (!this.filters.categories) {
            const categories = this.categories.data.values.map(item => item.value)
            const makeType = this.makeType.data.values.map(item => item.value)
            this.filters = {...this.filters, categories, makeType}
        }

        const {name, value} = event.target.dataset
        // console.log('handleCheckBox - name:' + name)
        // console.log('handleCheckBox - value:' + value)

        if (event.target.checked) {
            if (!this.filters[name].includes(value)) {
                this.filters[name] = [...this.filters[name], value]
            }
        } else {
            this.filters[name] = this.filters[name].filter(item => item !== value)
        }

        this.senDataToCarList()
    }

    timer
    senDataToCarList() {
        this.timer = window.setTimeout(() => {
            publish(this.messageContext, CARS_FILTERED_MESSAGE, {
                filters: this.filters
            });
        }, 400)
    }
}