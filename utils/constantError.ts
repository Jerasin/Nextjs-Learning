class ValidationError extends Error {
  debug?: string;
  constructor(message: string, debug?: string) {
    super(message);
    this.name = "ValidationError";
    if (debug) {
      this.debug = debug;
    }
    Object.setPrototypeOf(this, ValidationError.prototype); // กำหนด prototype ให้ถูกต้อง
  }
}

export default ValidationError;
