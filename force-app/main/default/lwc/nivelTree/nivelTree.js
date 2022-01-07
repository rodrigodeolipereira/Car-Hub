import { LightningElement } from 'lwc';

export default class NivelTree extends LightningElement {
    alertdispatch3(event) {
        const det = event.detail;
        alert(`Ops! A saw the event in component tree! ' + ${det[0].firstName} - ${det[0].lastName}`)
    }
}