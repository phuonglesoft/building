export interface ComplaintAttachmentData {
  complaint_id: number;
  building_id: number;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_by_id: number;
  description?: string;
}

export interface ComplaintAttachmentCreateRequest {
  complaint_id: number;
  building_id: number;
  uploaded_by_id: number;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  description?: string;
}

export interface ComplaintAttachmentUpdateRequest {
  file_name?: string;
  file_path?: string;
  file_size?: number;
  mime_type?: string;
  description?: string;
} 