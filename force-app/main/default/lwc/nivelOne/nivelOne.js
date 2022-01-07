import { LightningElement } from 'lwc';

export default class NivelOne extends LightningElement {
    buttonHandle(e) {
        const eventButton = new CustomEvent("alertdispatch", { bubbles: true, composed: true, detail: [{ firstName: "Rodrigo", lastName: "Pereira" }] })
        this.dispatchEvent(eventButton)
    }
}