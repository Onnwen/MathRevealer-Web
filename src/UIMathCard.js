export class UIMathCard {
    constructor(title) {
        this.title = title;
        this.description = "In lavorazione";
    }

    getHtml() {
        return `<div class="mathResultCard p-3" id="${this.title}Card">` +
            `<button class="vertical mathResultCardEnlargeButton" id="${this.title}CardButton" type="button" style="float: right; margin-bottom: auto;">` +
            `<i id="${this.title}CardButtonSizeIcon" class="bi bi-arrows-angle-expand"></i>` +
            `</button>` +
            `<h2> ${this.title} </h2>` +
            `<hr/>` +
            `<p class="mathTextResult">${this.description}</p>` +
            `</div>`;
    }
}

