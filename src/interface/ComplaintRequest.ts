import { ComplaintAttachment } from "../models/ComplaintAttachment";

export interface ComplaintCreateRequest {
    building_id: number, 
    resident_id: number, 
    title: string, 
    description: string, 
    category: string, 
    imageUrl: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH',
    image: ComplaintAttachment
}

export interface ComplaintUpdateRequest {
    building_id: number, 
    resident_id: number, 
    title: string, 
    description: string, 
    category: string, 
    priority?: 'LOW' | 'MEDIUM' | 'HIGH',
    image: ComplaintAttachment
}