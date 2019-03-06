import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';

@NgModule({
  declarations: [AuthTabsComponent],
  imports: [CommonModule, FormsModule],
  exports: [AuthTabsComponent]
})
export class AuthModule {}
