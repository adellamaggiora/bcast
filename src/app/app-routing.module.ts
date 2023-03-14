import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'bcast',
    loadChildren: () => import('./modules/features/bcast/bcast.module').then( m => m.BcastModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/features/profile/profile.module').then( m => m.ProfileModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
