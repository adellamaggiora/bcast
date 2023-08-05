import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user.service';
import { utilsFns } from 'src/functions/utils-fns';
import { toast } from 'src/functions/notifiers/toast';
import { Session } from '@supabase/supabase-js';
import client from 'src/api/client';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private userService: UserService, private router: Router) { }

  private _parseFragmentUrl(fragment: string): Partial<Session> | null {
    const paramsArray = fragment.split('&');
    const params: any = {};
  
    paramsArray.forEach((param: string) => {
      const [key, value] = param.split('=');
      params[key] = value;
    });
  
    return params;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const oauthUserSession = this._parseFragmentUrl(route.fragment);
    if (oauthUserSession.access_token) {
      const refreshedSession = await client.auth.refresh();
      console.log(refreshedSession)
      // this.userService.userSession.set(refreshedSession);
      // this.router.navigate(['bcast', 'list']);
    }

    const userSessionExists = await this.userService.userSession.get().then(utilsFns.existy);
    if (!userSessionExists) {
      toast.warning(`User is not allowed to the route`);
      this.router.navigate(['login']);
    }
    return userSessionExists;
  }

}

