import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactForm {
    name: string;
    email: string;
    message: string;
}
export interface GalleryImage {
    id: bigint;
    title: string;
    description: string;
    imageUrl: string;
}
export interface backendInterface {
    addGalleryImage(image: GalleryImage): Promise<bigint>;
    deleteContact(id: bigint): Promise<void>;
    deleteGalleryImage(id: bigint): Promise<void>;
    getAllContacts(): Promise<Array<ContactForm>>;
    getAllGalleryImages(): Promise<Array<GalleryImage>>;
    getGalleryImage(id: bigint): Promise<GalleryImage>;
    submitContact(form: ContactForm): Promise<bigint>;
}
