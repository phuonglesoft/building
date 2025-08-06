import { Model, ModelOptions, QueryContext } from 'objection';

export class ComplaintAttachment extends Model {
  static override get tableName() {
    return 'complaint_attachments';
  }

  id!: number;
  complaint_id!: number;
  building_id!: number;
  s3_image_url!: string;
  file_type!: string;
  created_at!: Date;

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['complaint_id', 'building_id', 's3_image_url', 'file_type'],
      properties: {
        id: { type: 'integer' },
        complaint_id: { type: 'integer' },
        building_id: { type: 'integer' },
        s3_image_url: { type: 'string', minLength: 1, maxLength: 255 },
        file_type: { type: 'string', minLength: 1, maxLength: 50 },
        created_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static override get relationMappings() {
    return {
      complaint: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Complaint').Complaint,
        join: {
          from: 'complaint_attachments.complaint_id',
          to: 'complaints.id',
        },
      },
      building: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Building').Building,
        join: {
          from: 'complaint_attachments.building_id',
          to: 'building.id',
        },
      },
    };
  }

  override $beforeInsert(context: QueryContext) {
    this.created_at = new Date();
  }

  static  withBuilding(buildingId: number) {
    return this.query().where('building_id', buildingId);
  }
}