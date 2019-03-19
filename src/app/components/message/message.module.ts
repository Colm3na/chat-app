import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { EmojiPickerModule } from 'ng2-emoji-picker';

@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    EmojiPickerModule.forRoot(),
  ],
  exports: [MessageComponent],
})
export class MessageModule { }
