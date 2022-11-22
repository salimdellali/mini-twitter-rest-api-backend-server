export class HttpException extends Error {
  status: number;
  message: any;

  constructor(status: number, message: any) {
    super();
    this.status = status;
    this.message = message;
  }
}
