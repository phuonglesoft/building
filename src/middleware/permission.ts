
import { ValidationError } from '../middleware/errorHandler';

export const checkPermission = (payload: any, requiredGroups: string[] = ['admin']): void => {
  const groups = (payload.groups as string[]) || [];
  if (!groups.some(group => requiredGroups.includes(group))) {
    throw new ValidationError('Insufficient permissions', 403);
  }
};