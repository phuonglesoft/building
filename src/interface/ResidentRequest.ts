export interface ResidentData {
  building_id: number;
  name: string;
  phone: string;
  email?: string;
  apartment_number: string;
}

export interface ResidentCreateRequest {
  name: string;
  phone: string;
  email?: string;
  apartment_number: string;
}

export interface ResidentUpdateRequest {
  name?: string;
  phone?: string;
  email?: string;
  apartment_number?: string;
}