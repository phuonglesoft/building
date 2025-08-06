import { Notification } from '../models/Notification';
import {NotificationCreateRequest} from '../interface/NotificationRequest';

export class NotificationRepository {
  async create(data: NotificationCreateRequest): Promise<Notification> {
    return Notification.query().insert(data);
  }

  async findById(buildingId: number, notificationId: number): Promise<Notification | undefined> {
    return Notification.withBuilding(buildingId)
      .findById(notificationId)
      .withGraphFetched('resident')
      .withGraphFetched('building');
  }

  async findByResident(buildingId: number, residentId: number, channel?: string): Promise<Notification[]> {
    let query = Notification.withBuilding(buildingId)
      .where('resident_id', residentId)
      .withGraphFetched('resident')
      .withGraphFetched('building');
    if (channel) {
      query = query.where('channel', channel);
    }
    return query;
  } 
  // Add these methods inside the NotificationRepository class

async findAll(buildingId: number): Promise<Notification[]> {
    return Notification.withBuilding(buildingId)
      .withGraphFetched('resident')
      .withGraphFetched('building');
  }
  
  async findUnread(buildingId: number, residentId: number): Promise<Notification[]> {
    return Notification.withBuilding(buildingId)
      .where('resident_id', residentId)
      .where('is_read', false)
      .withGraphFetched('resident')
      .withGraphFetched('building');
  }
  
  async update(buildingId: number, notificationId: number, data: Partial<Notification>): Promise<Notification | null> {
    return Notification.withBuilding(buildingId)
      .patchAndFetchById(notificationId, data);
  }
  
  async markAsRead(buildingId: number, notificationId: number): Promise<Notification | null> {
    return this.update(buildingId, notificationId, { is_read: true });
  }
  
  async markAllAsRead(buildingId: number, residentId: number): Promise<void> {
    await Notification.withBuilding(buildingId)
      .where('resident_id', residentId)
      .patch({ is_read: true });
  }
  
  async delete(buildingId: number, notificationId: number): Promise<void> {
    await Notification.withBuilding(buildingId)
      .deleteById(notificationId);
  }
}