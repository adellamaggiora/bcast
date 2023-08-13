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

  constructor(private router: Router) { }

  private _parseFragmentUrl(fragment: string): Partial<Session> | null {
    const paramsArray = fragment?.split('&');
    const params: any = {};
  
    paramsArray?.forEach((param: string) => {
      const [key, value] = param?.split('=');
      params[key] = value;
    });
  
    return params;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const oauthUserSession = this._parseFragmentUrl(route?.fragment) as Session;
    console.log('oauthUserSession:');
    console.log(oauthUserSession);

    // if (oauthUserSession?.access_token) {
    //   const session = await client.auth.initilaizeSession();
    //   console.log('session');
    //   console.log(session);
    // }

    const userSessionExists = client.auth.getSession().then(utilsFns.existy);

    console.log('user session exists');
    console.log(userSessionExists);

    if (!userSessionExists) {
      toast.warning(`User is not allowed to the route`);
      this.router.navigate(['login']);
    }
    return userSessionExists;
  }

}

