import { LightningElement } from 'lwc';

export default class NivelTwo extends LightningElement {
    alertdispatch2(event) {
        const det = event.detail;
        alert(`Ops! A saw the event in component two! ' + ${det[0].firstName} - ${det[0].lastName}`)
    }
}