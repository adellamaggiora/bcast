import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { utilsFns } from 'src/functions/utils-fns';
import client from 'src/api/client';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const userSessionExists = await client.auth.getSession().then(utilsFns.existy);

    if (!userSessionExists) {
      this.router.navigate(['login']);
    }

    return userSessionExists;

  }

}

