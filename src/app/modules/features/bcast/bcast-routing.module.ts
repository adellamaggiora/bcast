import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BcastComponent } from './components/bcast/bcast.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { JoinedComponent } from './components/joined/joined.component';

const routes: Routes = [
  {
    path: '',
    component: BcastComponent,
    children: [
      {
        path: 'candidate',
        component: CandidateComponent
      },
      {
        path: 'joined',
        component: JoinedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcastRoutingModule { }
