import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  // templateUrl: './alert.component.html',
  template: `
  
    <div class="backdrop" (click)="onClose()"></div>
    <div class="alert-box">
        <h3 class="text-danger">An error occured!</h3>
        <p class="lead text-danger">{{ message }}</p>
        <div class="alert-box-actions">
            <button class="btn btn-danger" (click)="onClose()">close</button>
        </div>
    </div>
    
  `,
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  
  @Input() message?:string;
  @Output() close = new EventEmitter<void>();

  onClose():void {
    this.close.emit();
  }
  
}
