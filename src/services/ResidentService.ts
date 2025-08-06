import { ResidentRepository } from '../repositories/ResidentRepository';
import { ValidationError } from '../middleware/errorHandler';
import { Resident } from '../models/Resident';
import { ResidentCreateRequest, ResidentUpdateRequest } from '../interface/ResidentRequest';

export class ResidentService {
  private residentRepository: ResidentRepository;

  constructor() {
    this.residentRepository = new ResidentRepository();
  }

  async createResident(buildingId: number, data: ResidentCreateRequest): Promise<Resident> {
    if (!data.name || !data.phone || !data.apartment_number) {
      throw new ValidationError('Name, phone, and apartment number are required');
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new ValidationError('Invalid email format');
    }
    const existing = await this.residentRepository.findByApartment(buildingId, data.apartment_number);
    if (existing) {
      throw new ValidationError('Apartment number already exists in this building');
    }
    return this.residentRepository.create({ ...data, building_id: buildingId });
  }

  async getResident(buildingId: number, residentId: number): Promise<Resident | null> {
    const resident = await this.residentRepository.findById(buildingId, residentId);
    if (!resident) {
      throw new ValidationError('Resident not found');
    }
    return resident;
  }

  async getAllResidents(buildingId: number): Promise<Resident[]> {
    return this.residentRepository.findAll(buildingId);
  }

  async updateResident(buildingId: number, residentId: number, data: ResidentUpdateRequest): Promise<Resident | null> {
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new ValidationError('Invalid email format');
    }
    const resident = await this.residentRepository.update(buildingId, residentId, data);
    if (!resident) {
      throw new ValidationError('Resident not found');
    }
    return resident;
  }

  async deleteResident(buildingId: number, residentId: number): Promise<void> {
    const resident = await this.residentRepository.findById(buildingId, residentId);
    if (!resident) {
      throw new ValidationError('Resident not found');
    }
    await this.residentRepository.delete(buildingId, residentId);
  }
}