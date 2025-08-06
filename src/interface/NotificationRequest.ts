export interface NotificationData {
  building_id: number;
  resident_id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  is_read: boolean;
  priority: 'low' | 'medium' | 'high';
  scheduled_at?: Date;
  sent_at?: Date;
}

export interface NotificationCreateRequest {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  priority: 'low' | 'medium' | 'high';
  scheduled_at?: Date;
}

export interface NotificationUpdateRequest {
  title?: string;
  message?: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  is_read?: boolean;
  priority?: 'low' | 'medium' | 'high';
  scheduled_at?: Date;
  sent_at?: Date;
} 