import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StreamsComponent
  ],
  exports: [StreamsComponent]
})
export class StreamsModule { }
