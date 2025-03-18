export class User {
    firstName: string;
    lastName: string;
    mail: string;
    password: string

    constructor(
        firstName: string,
        lastName: string,
        mail: string,
        password: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.password = password;
    }
}