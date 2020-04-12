export interface Interaction {
    id: string;
    hash: string;
    image: string;
    dateTime: number;
    issuer: string;
    recipient: string;
    isValid: boolean;
}