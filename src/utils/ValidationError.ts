export interface ValidationErrorField {
  field: string;
  message: string;
  value?: any;
  rule?: string;
}

export class ValidationError extends Error {
  public override readonly name = 'ValidationError';
  public readonly statusCode: number;
  public fields: ValidationErrorField[];
  public readonly timestamp: Date;

  constructor(
    message: string = 'Validation failed',
    fields: ValidationErrorField[] = [],
    statusCode: number = 400
  ) {
    super(message);
    this.statusCode = statusCode;
    this.fields = fields;
    this.timestamp = new Date();
    
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  /**
   * Tạo ValidationError từ một field lỗi
   */
  static fromField(field: string, message: string, value?: any, rule?: string): ValidationError {
    return new ValidationError(
      `Validation failed for field: ${field}`,
      [{ field, message, value, rule }]
    );
  }

  /**
   * Tạo ValidationError từ nhiều fields
   */
  static fromFields(fields: ValidationErrorField[]): ValidationError {
    const message = fields.length === 1 
      ? `Validation failed for field: ${fields[0].field}`
      : `Validation failed for ${fields.length} fields`;
    
    return new ValidationError(message, fields);
  }

  /**
   * Thêm field lỗi vào ValidationError hiện tại
   */
  addField(field: string, message: string, value?: any, rule?: string): this {
    this.fields.push({ field, message, value, rule });
    this.message = `Validation failed for ${this.fields.length} fields`;
    return this;
  }

  /**
   * Kiểm tra xem có lỗi cho field cụ thể không
   */
  hasField(fieldName: string): boolean {
    return this.fields.some(field => field.field === fieldName);
  }

  /**
   * Lấy tất cả lỗi cho field cụ thể
   */
  getFieldErrors(fieldName: string): ValidationErrorField[] {
    return this.fields.filter(field => field.field === fieldName);
  }

  /**
   * Lấy message đầu tiên cho field cụ thể
   */
  getFieldMessage(fieldName: string): string | undefined {
    const fieldError = this.fields.find(field => field.field === fieldName);
    return fieldError?.message;
  }

  /**
   * Kiểm tra xem có lỗi nào không
   */
  hasErrors(): boolean {
    return this.fields.length > 0;
  }

  /**
   * Lấy số lượng lỗi
   */
  getErrorCount(): number {
    return this.fields.length;
  }

  /**
   * Chuyển đổi thành object để serialize
   */
  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      fields: this.fields,
      timestamp: this.timestamp.toISOString(),
      errorCount: this.getErrorCount()
    };
  }

  /**
   * Tạo response object cho API
   */
  toResponse(): object {
    return {
      success: false,
      error: {
        type: this.name,
        message: this.message,
        fields: this.fields,
        timestamp: this.timestamp.toISOString()
      }
    };
  }

  /**
   * Merge với ValidationError khác
   */
  merge(other: ValidationError): this {
    this.fields.push(...other.fields);
    this.message = `Validation failed for ${this.fields.length} fields`;
    return this;
  }

  /**
   * Clear tất cả fields
   */
  clear(): this {
    this.fields = [];
    this.message = 'Validation failed';
    return this;
  }

  /**
   * Clone ValidationError
   */
  clone(): ValidationError {
    return new ValidationError(
      this.message,
      [...this.fields],
      this.statusCode
    );
  }

  /**
   * Tạo ValidationError cho required field
   */
  static required(field: string, value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} is required`,
      value,
      'required'
    );
  }

  /**
   * Tạo ValidationError cho email
   */
  static invalidEmail(field: string, value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} must be a valid email address`,
      value,
      'email'
    );
  }

  /**
   * Tạo ValidationError cho min length
   */
  static minLength(field: string, min: number, value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} must be at least ${min} characters long`,
      value,
      'minLength'
    );
  }

  /**
   * Tạo ValidationError cho max length
   */
  static maxLength(field: string, max: number, value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} must not exceed ${max} characters`,
      value,
      'maxLength'
    );
  }

  /**
   * Tạo ValidationError cho pattern
   */
  static pattern(field: string, pattern: string, value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} format is invalid`,
      value,
      'pattern'
    );
  }

  /**
   * Tạo ValidationError cho unique constraint
   */
  static unique(field: string, value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} already exists`,
      value,
      'unique'
    );
  }

  /**
   * Tạo ValidationError cho foreign key
   */
  static foreignKey(field: string, referencedTable: string, value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} references a non-existent ${referencedTable}`,
      value,
      'foreignKey'
    );
  }

  /**
   * Tạo ValidationError cho enum values
   */
  static enum(field: string, allowedValues: string[], value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} must be one of: ${allowedValues.join(', ')}`,
      value,
      'enum'
    );
  }

  /**
   * Tạo ValidationError cho numeric range
   */
  static range(field: string, min: number, max: number, value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} must be between ${min} and ${max}`,
      value,
      'range'
    );
  }

  /**
   * Tạo ValidationError cho date validation
   */
  static invalidDate(field: string, value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} must be a valid date`,
      value,
      'date'
    );
  }

  /**
   * Tạo ValidationError cho future date
   */
  static futureDate(field: string, value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} must be a future date`,
      value,
      'futureDate'
    );
  }

  /**
   * Tạo ValidationError cho past date
   */
  static pastDate(field: string, value?: any): ValidationError {
    return ValidationError.fromField(
      field,
      `${field} must be a past date`,
      value,
      'pastDate'
    );
  }
} 