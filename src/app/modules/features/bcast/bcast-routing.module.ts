import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BcastComponent } from './components/bcast/bcast.component';
import { CandidateBcastComponent } from './components/candidate-bcast/candidate-bcast.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';

const routes: Routes = [
  {
    path: '',
    component: BcastComponent,
    children: [
      {
        path: 'candidate',
        component: CandidateBcastComponent
      },
      {
        path: 'chatlist',
        component: ChatListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcastRoutingModule { }
