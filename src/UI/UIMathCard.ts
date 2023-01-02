export class UIMathCard {
    private _title: string;

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    private _description: string;

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    private _html: string | undefined;

    get html(): string | undefined {
        return this._html;
    }

    set html(value: string | undefined) {
        this._html = value;
    }

    private _notion: string | undefined;

    get notion(): string | undefined {
        return this._notion;
    }

    set notion(value: string | undefined) {
        this._notion = value;
    }

    private _expandable: boolean;

    set expandable(value: boolean) {
        this._expandable = value;
    }

    get expandable(): boolean {
        return this._expandable;
    }

    constructor(title: string, description: string, notion: string = "", html: string = "", expandable: boolean = true) {
        this._title = title;
        this._description = description;
        this._html = html;
        this._notion = notion;
        this._expandable = expandable;
    }

    getHtml(): string {
        return `<div class="mathResultCard ${this.expandable ? "expandable" : "" }" id="${this._title}Card">` +
            `<i class="bi bi-arrows-angle-expand d-md-flex" style="float: right; margin-bottom: auto;"></i>` +
            `<h2> ${this._title} </h2>` +
            `<hr/>` +
            (this._description !== undefined && this._description !== "" ?
                `<p class="mathTextResultDescription">${this._description}</p>`
                :
                `<p class="mathTextResultDescription">Non è stato possibile trovare nessun dato in merito.</>`) +
            (this._html !== undefined && this._html !== "" ?
                `<hr/>` +
                `<div class="mathTextResult">${this._html}</div>`
                :
                "")
            +
            (this._notion !== undefined && this._notion !== "" ?
                `<div class="mathTexResultTheory"/>` +
                `<hr/>` +
                `<p class="mathTextTheory">${this._notion}</p>` +
                `</div>`
                :
                "")
            +
            `</div>`;
    }
}

