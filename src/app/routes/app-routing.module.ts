import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DetailsComponent } from '../details/details.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(routeConfig)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
export default routeConfig;