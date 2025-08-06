
interface ResponseMetadata {
  total?: number;
  page?: number;
  limit?: number;
}

interface CommonResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T | null;
  metadata: ResponseMetadata | null;
}

export const successResponse = <T>(data: T, message = 'Request processed successfully', metadata: ResponseMetadata = {}): CommonResponse<T> => ({
  status: 'success',
  message,
  data,
  metadata,
});

export const errorResponse = (message: string, metadata: ResponseMetadata | null = null): CommonResponse<null> => ({
  status: 'error',
  message,
  data: null,
  metadata,
});