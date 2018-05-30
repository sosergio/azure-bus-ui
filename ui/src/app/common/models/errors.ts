export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ApplicationError extends Error{
  unrecoverable: boolean;
  constructor(message?: string, isRecoverable?:boolean) {
    super(message);
    this.unrecoverable = isRecoverable ? false : true;
    this.name = "ApplicationError";
  }
}
