import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bcast',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/features/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'bcast',
    loadChildren: () => import('./modules/features/bcast/bcast.module').then( m => m.BcastModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/features/profile/profile.module').then( m => m.ProfileModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
