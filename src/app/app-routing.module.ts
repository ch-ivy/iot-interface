import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { IamgeComponent } from './iamge/iamge.component';


const routes: Routes = [
  {
    path: '', component: IamgeComponent
  },
  {
    path: ':city', component: ModalComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
