class BaseError extends Error {
  data = {};
  name: string;

  constructor(message) {
    super(message);
    this.name = '';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class PaymentProcessError extends BaseError {
  constructor(error) {
    super(error.message);
    this.name = 'PaymentProcessError';
    this.data = { error };
  }
}

export class OrderUpdateError extends BaseError {
  constructor(error) {
    super(error.message);
    this.name = 'OrderUpdateError';
    this.data = { error };
  }
}
