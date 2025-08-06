import { NotificationRepository } from '../repositories/NotificationRepository';
import { ValidationError } from '../middleware/errorHandler';
import { Notification } from '../models/Notification';
import { NotificationCreateRequest, NotificationUpdateRequest } from '../interface/NotificationRequest';

export class NotificationService {
  private notificationRepository: NotificationRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
  }

  async createNotification(
    buildingId: number, 
    residentId: number, 
    data: NotificationCreateRequest
  ): Promise<Notification> {
    if (!data.title || data.title.length > 100) {
      throw new ValidationError('Title is required and must be less than 100 characters');
    }
    if (!data.message || data.message.length > 500) {
      throw new ValidationError('Message is required and must be less than 500 characters');
    }
    if (!data.type) {
      throw new ValidationError('Type is required');
    }
    if (!data.priority) {
      throw new ValidationError('Priority is required');
    }

    const notificationData = {
      ...data,
      building_id: buildingId,
      resident_id: residentId,
      is_read: false
    };

    return this.notificationRepository.create(notificationData);
  }

  async getNotification(buildingId: number, notificationId: number): Promise<Notification | null> {
    const notification = await this.notificationRepository.findById(buildingId, notificationId);
    if (!notification) {
      throw new ValidationError('Notification not found');
    }
    return notification;
  }

  async getAllNotifications(buildingId: number): Promise<Notification[]> {
    return this.notificationRepository.findAll(buildingId);
  }

  async getNotificationsByResident(buildingId: number, residentId: number): Promise<Notification[]> {
    return this.notificationRepository.findByResident(buildingId, residentId);
  }

  async getUnreadNotifications(buildingId: number, residentId: number): Promise<Notification[]> {
    return this.notificationRepository.findUnread(buildingId, residentId);
  }

  async updateNotification(
    buildingId: number, 
    notificationId: number, 
    data: NotificationUpdateRequest
  ): Promise<Notification | null> {
    if (data.title && data.title.length > 100) {
      throw new ValidationError('Title must be less than 100 characters');
    }
    if (data.message && data.message.length > 500) {
      throw new ValidationError('Message must be less than 500 characters');
    }

    const notification = await this.notificationRepository.update(buildingId, notificationId, data);
    if (!notification) {
      throw new ValidationError('Notification not found');
    }
    return notification;
  }

  async markAsRead(buildingId: number, notificationId: number): Promise<Notification | null> {
    const notification = await this.notificationRepository.markAsRead(buildingId, notificationId);
    if (!notification) {
      throw new ValidationError('Notification not found');
    }
    return notification;
  }

  async markAllAsRead(buildingId: number, residentId: number): Promise<void> {
    await this.notificationRepository.markAllAsRead(buildingId, residentId);
  }

  async deleteNotification(buildingId: number, notificationId: number): Promise<void> {
    const notification = await this.notificationRepository.findById(buildingId, notificationId);
    if (!notification) {
      throw new ValidationError('Notification not found');
    }
    await this.notificationRepository.delete(buildingId, notificationId);
  }
}