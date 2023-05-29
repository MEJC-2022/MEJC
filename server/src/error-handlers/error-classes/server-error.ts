interface user {
  _id: string;
  email: string;
  isAdmin: boolean;
}

export class SessionError extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly session?: user,
  ) {
    super(message);

    Object.setPrototypeOf(this, SessionError.prototype);
  }
}
