import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNotificationComponent } from './components/notification/create-notification/create-notification.component';
import { ListNotificationsComponent } from './components/notification/list-notifications/list-notifications.component';

const routes: Routes = [
  {path: '', component: ListNotificationsComponent},
  {path: 'new', component: CreateNotificationComponent},
  {path: 'edit/:id', component: CreateNotificationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
