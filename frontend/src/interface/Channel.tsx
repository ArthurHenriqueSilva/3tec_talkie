import { SocketUser } from "./SocketUser";

export interface Channel {
  id: number; // Identificador único do canal
  name: string; // Nome do canal
  password: string; // Senha do canal
  createdAt: Date; // Data de criação do canal
  updatedAt: Date; // Data da última atualização do canal
  reactivationTime?: Date; // Tempo de reativação, opcional
  deactivationTime?: Date; // Tempo de desativação, opcional
  users: SocketUser[]; // Usuários associados ao canal
}
