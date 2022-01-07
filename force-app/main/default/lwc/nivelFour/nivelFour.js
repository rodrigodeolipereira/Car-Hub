import { LightningElement } from 'lwc';

export default class NivelFour extends LightningElement {
    alertdispatch3(event) {
        const det = event.detail;
        alert(`Ops! A saw the event in component four! ' + ${det[0].firstName} - ${det[0].lastName}`)
    }
}