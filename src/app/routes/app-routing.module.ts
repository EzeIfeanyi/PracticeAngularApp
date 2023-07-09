import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DetailsComponent } from '../details/details.component';

export const routes: Routes = [
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  
  {
    path: '',
    redirectTo : 'home',
    pathMatch : "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export default routeConfig;