import { BuildingRepository } from "../repositories/BuildingRepository";
import { ValidationError } from "../middleware/errorHandler";
import { Building } from "../models/Building";
import { BuildingCreateRequest, BuildingUpdateRequest } from '../interface/BuildingRequest';

export class BuildingService {
    private buildingRepository: BuildingRepository;
    constructor() {
        this.buildingRepository = new BuildingRepository();
    }

    async createBuilding(data: BuildingCreateRequest): Promise<Building> {
        if (!data.name || data.name.length > 100) {
            throw new ValidationError('Building name is required and must be less than 100 characters');
        }
        return this.buildingRepository.create(data);
    }

    async getBuilding(buildingId: number): Promise<Building | null> {
        const building = await this.buildingRepository.findById(buildingId);
        if (!building) {
          throw new ValidationError('Building not found');
        }
        return building;
    }
    
    async getAllBuildings(): Promise<Building[]> {
        return this.buildingRepository.findAll();
    }
    
    async updateBuilding(buildingId: number, data: BuildingUpdateRequest): Promise<Building | null> {
        if (data.name && data.name.length > 100) {
          throw new ValidationError('Building name must be less than 100 characters');
        }
        const building = await this.buildingRepository.update(buildingId, data);
        if (!building) {
          throw new ValidationError('Building not found');
        }
        return building;
    }
    
    async deleteBuilding(buildingId: number): Promise<void> {
        const building = await this.buildingRepository.findById(buildingId);
        if (!building) {
          throw new ValidationError('Building not found');
        }
        await this.buildingRepository.delete(buildingId);
    }
}