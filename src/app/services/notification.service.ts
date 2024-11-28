import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Notification {
  id: number;
  message: string;
  type: string; // 'info', 'error', 'success', etc.
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: Notification[] = [];
  private notificationSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationSubject.asObservable();
  private nextId = 1;

  constructor() { }

  addNotification(message: string, type: string): void {
    const notification: Notification = {
      id: this.nextId++, // Increment the ID for each new notification
      message,
      type,
    };
    this.notifications.push(notification); // Add the new notification to the list
    this.notificationSubject.next([...this.notifications]); // Update the observable
  }

  dismissNotification(id: number): void {
    this.notifications = this.notifications.filter((n) => n.id !== id); // Remove the dismissed notification
    this.notificationSubject.next([...this.notifications]); // Update the observable
  }
}
