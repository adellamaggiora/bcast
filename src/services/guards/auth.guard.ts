import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { toast } from 'src/api/utils/toast';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    const isAuthenticated = !!this.userService.userSession.get();
    if (!isAuthenticated) {
      toast.warning(`User is not allowed to the route`);
      this.router.navigate(['login']);
    }
    return isAuthenticated;
  }

}
