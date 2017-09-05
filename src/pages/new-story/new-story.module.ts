import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewStoryPage } from './new-story';

@NgModule({
  declarations: [
    NewStoryPage,
  ],
  imports: [
    IonicPageModule.forChild(NewStoryPage),
  ],
})
export class StoryPageModule {}
