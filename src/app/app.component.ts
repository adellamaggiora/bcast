import { Component, ViewChild } from "@angular/core";
import { AuthService } from "src/services/auth.service";
import packageJson from "../../package.json";
import { Session } from "@supabase/supabase-js";
import { Router } from "@angular/router";
import { BcastService } from "src/services/bcast.service";
import { IGeoLocation } from "src/interfaces/geo-location";
import { IonRouterOutlet, Platform } from "@ionic/angular";
import { LoaderService } from "src/services/loader.service";
import { DataService } from "src/services/data.service";
import { App } from "@capacitor/app";
import { fromEvent, share, switchMap } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true })
  routerOutlet: IonRouterOutlet;
  userSession: Session;
  appVersion: string = packageJson.version;
  appPages = [
    { title: "Profile", url: "/profile", icon: "person" },
    { title: "Broadcast", url: "/bcast", icon: "megaphone" },
  ];

  get isLoginPage(): boolean {
    return this.router.url === "/login";
  }

  get isBcastListPage(): boolean {
    return this.router.url === "/bcast/list";
  }

  constructor(
    public bcastService: BcastService,
    public loaderService: LoaderService,
    public dataService: DataService,
    private router: Router,
    private authService: AuthService,
    private platform: Platform,
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === "/bcast/list") {
        App.exitApp();
      }
      this.router.navigate(["bcast", "list"]);
    });
  }

  ngOnInit() {
    if (this.platform.is("pwa") || this.platform.is("mobileweb")) {
      const popstate$ = fromEvent(window, "popstate").pipe(share());

      popstate$
        .pipe(
          switchMap(() => this.dataService.currentModal.get$()),
        )
        .subscribe((modal) => {
          if (modal) {
            modal.dismiss();
          }
        });

      popstate$.subscribe((state) => {
        if (this.router.url === "/bcast/list") {
          App.exitApp();
        }
        setTimeout(() => {
          this.router.navigate(["bcast", "list"]);
        })
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  onSelectedLocation(location: IGeoLocation) {
    this.dataService.selectedLocation.set(location);
  }
}
