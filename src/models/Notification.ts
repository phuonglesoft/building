import { Model, ModelOptions, QueryContext } from 'objection';

export class Notification extends Model {
  static override get tableName() {
    return 'notifications';
  }

  id!: number;
  building_id!: number;
  resident_id!: number;
  is_read!: boolean;
  message!: string;
  channel!: 'EMAIL' | 'SMS' | 'APP';
  sent_at!: Date;

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['building_id', 'resident_id', 'message', 'channel'],
      properties: {
        id: { type: 'integer' },
        is_read: {type:  'boolean'},
        building_id: { type: 'integer' },
        resident_id: { type: 'integer' },
        message: { type: 'string', minLength: 1 },
        channel: { type: 'string', enum: ['EMAIL', 'SMS', 'APP'] },
        sent_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static override get relationMappings() {
    return {
      building: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Building').Building,
        join: {
          from: 'notifications.building_id',
          to: 'building.id',
        },
      },
      resident: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Resident').Resident,
        join: {
          from: 'notifications.resident_id',
          to: 'residents.id',
        },
      },
    };
  }

  override $beforeInsert(context: QueryContext) {
    this.sent_at = new Date();
  }

  static  withBuilding(buildingId: number) {
    return this.query().where('building_id', buildingId);
  }
}