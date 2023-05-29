export class UserError extends Error {
  constructor(public readonly status: number, public readonly message: string) {
    super(message);

    Object.setPrototypeOf(this, UserError.prototype);
  }
}
