export class ServerError extends Error {
  constructor(public readonly statusCode: number, public readonly message: string) {
    super(message);

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}