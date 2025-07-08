import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

export interface Message {
  id: string;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: Date;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private authService = inject(AuthService);
  private socket: Socket | null = null;
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  private onlineUsersSubject = new BehaviorSubject<number[]>([]);

  messages$ = this.messagesSubject.asObservable();
  onlineUsers$ = this.onlineUsersSubject.asObservable();

  connect() {
    const user = this.authService.getCurrentUser();
    if (!user || this.socket?.connected) return;

    this.socket = io(environment.wsUrl || 'http://localhost:8080', {
      auth: { token: this.authService.getToken() }
    });

    this.socket.on('connect', () => console.log('WebSocket connecté'));
    
    this.socket.on('message', (message: Message) => {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, message]);
    });

    this.socket.on('onlineUsers', (users: number[]) => {
      this.onlineUsersSubject.next(users);
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  sendMessage(receiverId: number, content: string) {
    if (this.socket?.connected) {
      this.socket.emit('sendMessage', { receiverId, content });
    }
  }

  markAsRead(messageId: string) {
    if (this.socket?.connected) {
      this.socket.emit('markAsRead', { messageId });
    }
  }
}