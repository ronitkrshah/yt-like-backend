export default class User {
    public readonly id: string;
    public readonly fullName: string;
    public readonly email: string;

    public constructor(id: string, fullName: string, email: string) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
    }
}
