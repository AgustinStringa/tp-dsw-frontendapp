export default interface IMessage {
  content: string;
  sender: string;
  receiver: string;
  createdAt: Date;
  entity?: 'client' | 'trainer';
}
