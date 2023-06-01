export const mockOrders = [
  {
    _id: 'orderId1',
    userId: 'userId1',
    deliveryAddress: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      street: '123 Main St',
      city: 'New York',
      zipCode: 10001,
      phoneNumber: 1234567890,
    },
    orderItems: [
      { _id: 'productId1', quantity: 1 },
      { _id: 'productId2', quantity: 2 },
    ],
    createdAt: new Date(),
    isShipped: true,
    totalPrice: 300,
    updatedAt: new Date(),
  },
  {
    _id: 'orderId13',
    userId: 'userId1',
    deliveryAddress: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      street: '123 Main St',
      city: 'New York',
      zipCode: 10001,
      phoneNumber: 1234567890,
    },
    orderItems: [{ _id: 'productId1', quantity: 1 }],
    createdAt: new Date(),
    isShipped: false,
    totalPrice: 300,
    updatedAt: new Date(),
  },
  {
    _id: 'orderId124',
    userId: 'userId1',
    deliveryAddress: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      street: '123 Main St',
      city: 'New York',
      zipCode: 10001,
      phoneNumber: 1234567890,
    },
    orderItems: [
      { _id: 'productId1', quantity: 1 },
      { _id: 'productId2', quantity: 2 },
      { _id: 'productId4', quantity: 3 },
    ],
    createdAt: new Date(),
    isShipped: false,
    totalPrice: 300,
    updatedAt: new Date(),
  },
];