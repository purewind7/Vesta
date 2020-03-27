import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VestaPedigreeDendrogramsComponent } from './vesta-pedigree-dendrograms/vesta-pedigree-dendrograms.component';

@NgModule({
  declarations: [
    AppComponent,
    VestaPedigreeDendrogramsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
