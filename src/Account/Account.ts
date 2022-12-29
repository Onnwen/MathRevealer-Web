class UserInformation {
    email: string;
    first_name: string;
    last_name: string;
    email_verified: boolean;

    constructor(email: string, first_name: string, last_name: string, email_verified: boolean) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email_verified = email_verified;
    }
}

class Account {
    static async loadAccountData() {
        return $.ajax({
            url: 'https://mathrevealer.garamante.it/api/myAccount/information',
            type: 'GET',
            success: (data) => {
                if (data.status_code == 1) {
                    this.setUserInformation(data.userInformation);
                    return data;
                } else {
                    localStorage.clear();
                    return undefined;
                }
            },
            error: (data) => {
                localStorage.clear();
                return undefined;
            }
        });
    }

    static setUserInformation(userInformation: any) {
        this.clear();

        localStorage.setItem('id', userInformation.id);
        localStorage.setItem('email', userInformation.email);
        localStorage.setItem('first_name', userInformation.first_name);
        localStorage.setItem('last_name', userInformation.last_name);
        localStorage.setItem('email_verified', String(userInformation.email_verified));
    }

    static async getEmail() {
        if (localStorage.getItem('email') == undefined) {
            if (await this.loadAccountData()) {
                return localStorage.getItem('email');
            }
            return undefined;
        } else {
            return localStorage.getItem('email');
        }
    }

    static async getId() {
        if (localStorage.getItem('id') == undefined) {
            if (await this.loadAccountData()) {
                return localStorage.getItem('id');
            }
            return undefined;
        } else {
            return localStorage.getItem('id');
        }
    }

    static resendVerificationEmail() {

    }

    static async isLogged() {
        return await this.getEmail() != undefined && localStorage.getItem('email_verified');
    }

    static clear() {
        localStorage.clear();
    }
}