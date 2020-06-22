import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { DesignerComponent } from './designer/designer.component';


const routes: Routes = [
  {
    path:'viewer',
    component:ViewerComponent
  },
  {
    path:'designer',
    component: DesignerComponent
  },
  { path: '', redirectTo: '/viewer', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
