module.exports = {
  esModule: true,
  validateToken: jest.fn().mockResolvedValue(true),
};

// mock module in test file using this code
// jest.mock('@/lib/auth/utils')
