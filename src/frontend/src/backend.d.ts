import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    deleteSubmission(id: bigint): Promise<void>;
    getAllSubmissions(): Promise<Array<ContactSubmission>>;
    getSubmission(id: bigint): Promise<ContactSubmission>;
    submitContact(form: ContactSubmission): Promise<bigint>;
}
