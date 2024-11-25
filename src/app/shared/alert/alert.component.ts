import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
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
  styles: [`
    
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #00000080;
        z-index: 50;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
    }
    .alert-box {
        position: fixed;
        top: 30vh;
        left: 20vw;
        width: 60vw;
        padding: 20px 40px 30px;
        z-index: 100;
        background: rgb(255, 222, 225);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        border: 1px solid rgb(255, 153, 153);
        border-radius: 5px;
    }
    .alert-box-actions {
        text-align: right;
    }
    
    
  `]
})
export class AlertComponent {
  
  @Input() message?: string;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
  
}
