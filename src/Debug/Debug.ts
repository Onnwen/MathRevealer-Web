export class Debug {
    static log(string: string, title: string = ""): void {
        // if (location.hostname.includes('localhost') || location.hostname.includes('127.0.0.1')) {
            console.log("(DEBUG) " + title + ": " + string);
        // }
    }
}