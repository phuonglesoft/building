import { Model, ModelOptions, QueryContext } from 'objection';

export class Building extends Model {
  static override get tableName() {
    return 'building';
  }

  id!: number;
  name!: string;
  created_at!: Date;
  updated_at!: Date;

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static override get relationMappings() {
    return {
      residents: {
        relation: Model.HasManyRelation,
        modelClass: require('./Resident').Resident,
        join: {
          from: 'building.id',
          to: 'residents.building_id',
        },
      },
      complaints: {
        relation: Model.HasManyRelation,
        modelClass: require('./Complaint').Complaint,
        join: {
          from: 'building.id',
          to: 'complaints.building_id',
        },
      },
      complaintAttachments: {
        relation: Model.HasManyRelation,
        modelClass: require('./ComplaintAttachment').ComplaintAttachment,
        join: {
          from: 'building.id',
          to: 'complaint_attachments.building_id',
        },
      },
      notifications: {
        relation: Model.HasManyRelation,
        modelClass: require('./Notification').Notification,
        join: {
          from: 'building.id',
          to: 'notifications.building_id',
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

  static async withBuilding(buildingId: number) {
    return this.query().where('id', buildingId);
  }
}