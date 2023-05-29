export class APIError extends Error {
  constructor(public readonly status: number, public readonly message: string) {
    super(message);

    Object.setPrototypeOf(this, APIError.prototype);
  }
}
