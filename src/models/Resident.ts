import { Model, ModelOptions, QueryContext } from 'objection';

export class Resident extends Model {
  static override get  tableName() {
    return 'residents';
  }

  id!: number;
  building_id!: number;
  name!: string;
  phone!: string;
  email?: string;
  cognito_sub!: string;
  apartment_number!: string;
  created_at!: Date;
  updated_at!: Date;

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['building_id', 'name', 'phone', 'apartment_number'],
      properties: {
        id: { type: 'integer' },
        building_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        phone: { type: 'string', minLength: 1, maxLength: 20 },
        email: { type: ['string', 'null'], format: 'email', maxLength: 100 },
        apartment_number: { type: 'string', minLength: 1, maxLength: 50 },
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
          from: 'residents.building_id',
          to: 'building.id',
        },
      },
      complaints: {
        relation: Model.HasManyRelation,
        modelClass: require('./Complaint').Complaint,
        join: {
          from: 'residents.id',
          to: 'complaints.resident_id',
        },
      },
      notifications: {
        relation: Model.HasManyRelation,
        modelClass: require('./Notification').Notification,
        join: {
          from: 'residents.id',
          to: 'notifications.resident_id',
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