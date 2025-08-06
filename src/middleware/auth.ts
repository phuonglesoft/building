
import { Request, Response, NextFunction } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { UserPayload } from '../interface/Authentication';
import knexInstance from '../config/database';
import { Resident } from '../models/Resident';
import { checkPermission } from './permission';
import { errorResponse } from '../utils/response';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(errorResponse('Unauthorized: No token provided'));
    }

    const token = authHeader.split(' ')[1];

    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID || 'your_user_pool_id',
      tokenUse: 'access',
      clientId: process.env.AWS_COGNITO_CLIENT_ID || 'your_client_id',
    });

    const payload = await verifier.verify(token) as UserPayload;

    // Kiểm tra vai trò
    const isAdmin = payload.groups?.includes('admin');
    const isBuildingManager = payload.groups?.includes('building_manager');
    if (!isAdmin && !isBuildingManager && !payload.groups?.includes('resident')) {
      return res.status(403).json(errorResponse('Unauthorized: Invalid role'));
    }

    // Kiểm tra resident (nếu là cư dân)
    let resident = null;
    if (payload.groups?.includes('resident')) {
      resident = await Resident.query(knexInstance).findOne({ cognito_sub: payload.sub });
      if (!resident) {
        return res.status(401).json(errorResponse('Unauthorized: Invalid resident'));
      }
    }

    if (!payload.preferred_username) {
      return res.status(401).json(errorResponse('Unauthorized: Missing preferred username'));
    }

    if (!payload['eslint_config'] || payload['eslint_config'] !== 'enabled') {
      return res.status(403).json(errorResponse('Unauthorized: ESLint config not enabled'));
    }

    req.user = { id: resident?.id || null, email: payload.email || '', role: payload.groups || [] };

    // Kiểm tra quyền theo endpoint
    const endpoint = req.path.split('/')[3]; // Ví dụ: 'residents' hoặc 'complaints'
    const permissionMap: { [key: string]: string[] } = {
      residents: ['admin', 'building_manager', 'resident'], // Tất cả có thể xem
      complaints: ['admin', 'building_manager'], // Chỉ admin và manager tạo/phê duyệt
    };
    const requiredGroups = permissionMap[endpoint] || ['resident'];
    checkPermission(payload, requiredGroups);

    return next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json(errorResponse('Unauthorized: Invalid token'));
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: { id: number | null; email: string; role: string[] };
    }
  }
}