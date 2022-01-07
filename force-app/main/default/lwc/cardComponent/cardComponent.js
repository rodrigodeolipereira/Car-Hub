import { LightningElement, api } from 'lwc';

export default class CardComponent extends LightningElement {
    @api card
    estilo

    get getName() {
        return this.card.name
    }

    renderedCallback() {
        if (eval(this.card.id%2) == 0) {
            var element = this.template.querySelector('div');
            element.style.backgroundColor = '#ffffff';
        }
    }

    handleClick(event) {
        alert(`Opa! Eu sou o numero ${this.card.id}`)
    }

}