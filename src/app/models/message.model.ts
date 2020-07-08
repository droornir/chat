export class Message {
  timeStamp: number;
  sender: string;
  message: string;

  constructor(_timeStamp: number, _sender: string, _message: string) {
    this.message = _message;
    this.sender = _sender;
    this.timeStamp = _timeStamp;
  }
}
