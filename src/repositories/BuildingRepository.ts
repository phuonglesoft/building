import { Building } from '../models/Building';
import { BuildingCreateRequest, BuildingUpdateRequest } from '../interface/BuildingRequest';

export class BuildingRepository {
  async create(data: BuildingCreateRequest): Promise<Building> {
    return Building.query().insert(data);
  }

  async findById(buildingId: number): Promise<Building | undefined> {
    return Building.query().findById(buildingId);
  }

  async findAll(): Promise<Building[]> {
    return Building.query();
  }

  async update(buildingId: number, data: BuildingUpdateRequest): Promise<Building | undefined> {
    return Building.query().patchAndFetchById(buildingId, data);
  }

  async delete(buildingId: number): Promise<void> {
    await Building.query().deleteById(buildingId);
  }
}