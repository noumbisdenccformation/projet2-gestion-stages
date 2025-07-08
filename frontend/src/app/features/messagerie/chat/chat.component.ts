import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { WebSocketService, Message } from '../../../core/services/websocket.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="h-screen flex bg-gray-100">
      <!-- Liste des conversations -->
      <div class="w-1/3 bg-white border-r">
        <div class="p-4 border-b">
          <h2 class="text-lg font-semibold">Messages</h2>
        </div>
        <div class="overflow-y-auto h-full">
          <div *ngFor="let contact of contacts" 
               (click)="selectContact(contact)"
               [class]="selectedContact?.id === contact.id ? 'bg-blue-50' : ''"
               class="p-4 border-b hover:bg-gray-50 cursor-pointer">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                {{ contact.nom[0] }}{{ contact.prenom[0] }}
              </div>
              <div class="flex-1">
                <p class="font-medium">{{ contact.nom }} {{ contact.prenom }}</p>
                <p class="text-sm text-gray-500">{{ contact.role }}</p>
                <div *ngIf="contact.unreadCount > 0" 
                     class="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {{ contact.unreadCount }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Zone de chat -->
      <div class="flex-1 flex flex-col">
        <div *ngIf="selectedContact" class="flex-1 flex flex-col">
          <!-- Header du chat -->
          <div class="p-4 bg-white border-b flex items-center space-x-3">
            <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              {{ selectedContact.nom[0] }}{{ selectedContact.prenom[0] }}
            </div>
            <div>
              <p class="font-medium">{{ selectedContact.nom }} {{ selectedContact.prenom }}</p>
              <p class="text-sm text-gray-500">{{ selectedContact.role }}</p>
            </div>
          </div>

          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <div *ngFor="let message of getMessagesForContact(selectedContact.id)" 
                 [class]="message.senderId === currentUser?.id ? 'flex justify-end' : 'flex justify-start'">
              <div [class]="message.senderId === currentUser?.id ? 'bg-blue-500 text-white' : 'bg-white'"
                   class="max-w-xs px-4 py-2 rounded-lg shadow">
                <p>{{ message.content }}</p>
                <p class="text-xs opacity-75 mt-1">
                  {{ message.timestamp | date:'short' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Input de message -->
          <form [formGroup]="messageForm" (ngSubmit)="sendMessage()" 
                class="p-4 bg-white border-t flex space-x-2">
            <input formControlName="content" 
                   placeholder="Tapez votre message..."
                   class="flex-1 p-2 border border-gray-300 rounded-md">
            <button type="submit" [disabled]="messageForm.invalid"
                    class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50">
              Envoyer
            </button>
          </form>
        </div>

        <!-- Message de sélection -->
        <div *ngIf="!selectedContact" class="flex-1 flex items-center justify-center">
          <p class="text-gray-500">Sélectionnez une conversation pour commencer</p>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit, OnDestroy {
  private wsService = inject(WebSocketService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  currentUser = this.authService.getCurrentUser();
  selectedContact: any = null;
  contacts: any[] = [];
  messages: Message[] = [];

  messageForm = this.fb.group({
    content: ['']
  });

  ngOnInit() {
    this.wsService.connect();
    this.loadContacts();
    
    this.wsService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    this.wsService.disconnect();
  }

  loadContacts() {
    // Simulation de contacts selon le rôle
    if (this.currentUser?.role === 'ETUDIANT') {
      this.contacts = [
        { id: 2, nom: 'TechCorp', prenom: 'RH', role: 'ENTREPRISE', unreadCount: 2 },
        { id: 3, nom: 'Dupont', prenom: 'Prof', role: 'ENSEIGNANT', unreadCount: 0 }
      ];
    } else if (this.currentUser?.role === 'ENTREPRISE') {
      this.contacts = [
        { id: 1, nom: 'Martin', prenom: 'Jean', role: 'ETUDIANT', unreadCount: 1 },
        { id: 4, nom: 'Dubois', prenom: 'Marie', role: 'ETUDIANT', unreadCount: 0 }
      ];
    }
  }

  selectContact(contact: any) {
    this.selectedContact = contact;
    contact.unreadCount = 0;
  }

  getMessagesForContact(contactId: number): Message[] {
    return this.messages.filter(m => 
      (m.senderId === contactId && m.receiverId === this.currentUser?.id) ||
      (m.senderId === this.currentUser?.id && m.receiverId === contactId)
    );
  }

  sendMessage() {
    if (this.messageForm.valid && this.selectedContact) {
      const content = this.messageForm.get('content')?.value;
      if (content?.trim()) {
        this.wsService.sendMessage(this.selectedContact.id, content);
        this.messageForm.reset();
      }
    }
  }
}