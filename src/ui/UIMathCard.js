export class UIMathCard {
    constructor(title, description, notion, html) {
        this.title = title;
        this.description = description;
        this.html = html;
        this.notion = notion;
    }

    getHtml() {
        return `<div class="mathResultCard" id="${this.title}Card">` +
            `<button class="vertical mathResultCardEnlargeButton" id="${this.title}CardButton" type="button" style="float: right; margin-bottom: auto;">` +
            `<i id="${this.title}CardButtonSizeIcon" class="bi bi-arrows-angle-expand"></i>` +
            `</button>` +
            `<h2> ${this.title} </h2>` +
            `<hr/>` +
            (this.description !== undefined && this.description !== "" ?
                `<p class="mathTextResultDescription">${this.description}</p>`
            :
                `<p class="mathTextResultDescription">Non è stato possibile trovare nessun dato in merito.</>`) +
            (this.html !== undefined && this.html !== "" ?
                `<hr/>` +
                `<div class="mathTextResult">${this.html}</div>`
            :
                "")
            +
            (this.notion !== undefined && this.notion !== "" ?
                `<hr/>` +
                `<p class="mathTextResultDescription">${this.notion}</p>`
                :
                "")
            +
            `</div>`;
    }


}

