import { Model, ModelOptions, QueryContext } from 'objection';

export class Complaint extends Model {
  static override get tableName() {
    return 'complaints';
  }

  id!: number;
  building_id!: number;
  resident_id!: number;
  description!: string;
  title!: string;
  category!: string;
  status!: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority!: 'LOW' | 'MEDIUM' | 'HIGH';
  created_at!: Date;
  updated_at!: Date;

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['building_id', 'resident_id', 'title', 'description', 'category', 'status', 'priority'],
      properties: {
        id: { type: 'integer' },
        building_id: { type: 'integer' },
        resident_id: { type: 'integer' },
        description: { type: 'string', minLength: 1 },
        title: { type: 'string', minLength: 1 },
        category: { type: 'string', minLength: 1 },
        status: { type: 'string', enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] },
        priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static override get relationMappings() {
    return {
      building: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Building').Building,
        join: {
          from: 'complaints.building_id',
          to: 'building.id',
        },
      },
      resident: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Resident').Resident,
        join: {
          from: 'complaints.resident_id',
          to: 'residents.id',
        },
      },
      attachments: {
        relation: Model.HasManyRelation,
        modelClass: require('./ComplaintAttachment').ComplaintAttachment,
        join: {
          from: 'complaints.id',
          to: 'complaint_attachments.complaint_id',
        },
      },
    };
  }

 override $beforeInsert(context: QueryContext) {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  override $beforeUpdate(opt: ModelOptions, context: QueryContext) {
    this.updated_at = new Date();
  }

  static withBuilding(buildingId: number) {
    return this.query().where('building_id', buildingId);
  }
}