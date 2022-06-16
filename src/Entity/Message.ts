class Message {
    private subject: string;
    private content: string;
    private date: Date;
    private senderId: number;
    private recipientId: Array<number>;

    constructor(subject: string, content: string, senderId: number, recipientId: Array<number>) {
        this.subject = subject;
        this.content = content;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.date = new Date();
    }

    public getSubject(): string {
        return this.subject;
    }

    public setSubject(subject: string): void {
        this.subject = subject;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public getSenderId(): number {
        return this.senderId;
    }

    public setSenderId(senderId: number): void {
        this.senderId = senderId;
    }

    public getRecipientId(): Array<number> {
        return this.recipientId;
    }

    public setRecipientId(recipientId: Array<number>): void {
        this.recipientId = recipientId;
    }

}

export default Message;