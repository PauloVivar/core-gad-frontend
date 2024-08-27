function sum(a, b) {
  return a + b
};

describe('sum function', () => {
  it('should correctly add two numbers', () => {
    // Arrange
    const a = 3
    const b = 5

    // Act
    const result = sum(a, b)

    // Assert
    expect(result).toBe(8)
  })
});
