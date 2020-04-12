export interface Feedback {
    id: string;
    text: string;
    date: string;
    issuer: string;
    recipient: string;
    isValid: boolean;
}