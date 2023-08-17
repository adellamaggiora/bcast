import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BcastComponent } from "./pages/bcast/bcast.component";
import { BcastListComponent } from "./pages/bcast-list/bcast-list.component";
import { BcastCreationComponent } from "./pages/bcast-creation/bcast-creation.component";
import { NotificationsComponent } from "./pages/notifications/notifications.component";
import { HomeComponent } from "./pages/home/home.component";
import { BcastDetailComponent } from "./pages/bcast-detail/bcast-detail.component";

const routes: Routes = [
  {
    path: "",
    component: BcastComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "list",
        component: BcastListComponent,
      },
      {
        path: "create",
        component: BcastCreationComponent,
      },
      {
        path: "detail/:id",
        component: BcastDetailComponent,
      },
      {
        path: "notifications",
        component: NotificationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BcastRoutingModule {}
