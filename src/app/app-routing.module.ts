import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VestaPedigreeDendrogramsComponent } from './vesta-pedigree-dendrograms/vesta-pedigree-dendrograms.component';


const routes: Routes = [
  { path: '', component: VestaPedigreeDendrogramsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
