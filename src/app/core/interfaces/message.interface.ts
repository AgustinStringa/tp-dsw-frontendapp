export interface IMessage {
  content: string;
  sender: string;
  receiver: string;
  createdAt?: Date;
  readAt?: Date;
}
