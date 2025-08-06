const { body } = require('express-validator');

// Common validation rules
const commonValidators = {
  // User validation
  username: body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  email: body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  password: body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  // Building validation
  buildingName: body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Building name must be between 2 and 100 characters'),
  
  totalFloors: body('totalFloors')
    .isInt({ min: 1, max: 200 })
    .withMessage('Total floors must be between 1 and 200'),
  
  totalUnits: body('totalUnits')
    .isInt({ min: 1 })
    .withMessage('Total units must be a positive number'),
  
  // Unit validation
  unitNumber: body('unitNumber')
    .isLength({ min: 1, max: 20 })
    .withMessage('Unit number must be between 1 and 20 characters'),
  
  floor: body('floor')
    .isInt({ min: 1 })
    .withMessage('Floor must be a positive number'),
  
  area: body('area')
    .isFloat({ min: 0 })
    .withMessage('Area must be a positive number'),
  
  rent: body('rent')
    .isFloat({ min: 0 })
    .withMessage('Rent must be a positive number'),
  
  // Maintenance validation
  title: body('title')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  description: body('description')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  category: body('category')
    .isIn(['plumbing', 'electrical', 'hvac', 'structural', 'appliance', 'other'])
    .withMessage('Invalid category'),
  
  priority: body('priority')
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority'),
  
  status: body('status')
    .isIn(['pending', 'in-progress', 'completed', 'cancelled'])
    .withMessage('Invalid status')
};

// Validation chains for different operations
const validationChains = {
  // User registration
  registerUser: [
    commonValidators.username,
    commonValidators.email,
    commonValidators.password,
    body('role').optional().isIn(['admin', 'manager', 'tenant']).withMessage('Invalid role')
  ],
  
  // User login
  loginUser: [
    commonValidators.email,
    body('password').exists().withMessage('Password is required')
  ],
  
  // Create building
  createBuilding: [
    commonValidators.buildingName,
    commonValidators.totalFloors,
    commonValidators.totalUnits,
    body('yearBuilt').optional().isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage('Year built must be between 1900 and current year')
  ],
  
  // Create unit
  createUnit: [
    commonValidators.unitNumber,
    body('building').isMongoId().withMessage('Valid building ID is required'),
    commonValidators.floor,
    body('type').isIn(['studio', '1BR', '2BR', '3BR', 'penthouse']).withMessage('Invalid unit type'),
    commonValidators.area,
    commonValidators.rent
  ],
  
  // Create maintenance request
  createMaintenance: [
    commonValidators.title,
    commonValidators.description,
    body('building').isMongoId().withMessage('Valid building ID is required'),
    commonValidators.category,
    commonValidators.priority.optional()
  ]
};

module.exports = {
  commonValidators,
  validationChains
}; 