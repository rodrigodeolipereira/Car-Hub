import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';

const CATEGORY__ERROR = 'Error loading categories'
const MAKE__ERROR = 'Erro loading make types'

export default class CarFilter extends LightningElement {

    filters={
        searchKey:'',
        maxPrice:999999
    }   
    
    CategoryError = CATEGORY__ERROR
    MakeError = MAKE__ERROR

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
    }

    HandleMaxPriceChange(event) {
        console.log('HandleMaxPriceChange ' + event.target.value)
        this.filters = {...this.filters, "maxPrice":event.target.value}
    } 

    handleCheckBox(event) {
        const {rodrigo, name, value} = event.target.dataset
        console.log('handleCheckBox - name:' + name)
        console.log('handleCheckBox - value:' + value)
    }
}