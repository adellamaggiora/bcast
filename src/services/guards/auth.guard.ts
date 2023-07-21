import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { toast } from 'src/api/utils/toast';
import { UserService } from '../user.service';
import { utilsFns } from 'src/functions/utils-fns';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private userService: UserService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const userSessionExists = await this.userService.userSession.get().then(utilsFns.existy);
    if (!userSessionExists) {
      toast.warning(`User is not allowed to the route`);
      this.router.navigate(['login']);
    }
    return userSessionExists;
  }

}
