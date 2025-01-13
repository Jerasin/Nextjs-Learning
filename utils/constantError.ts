export class ValidationError extends Error {
  debug?: string;
  constructor(message: string, debug?: string) {
    super(message);
    this.name = "ValidationError";
    this.debug = debug;
  }
}
