import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { AboutComponent } from './about';

/**
 * Main entry point
 */
@NgModule({
  /**
   * Other dependencies
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  /**
   * Components and directives
   */
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent
  ],
  bootstrap: [ AppComponent ]

})
export class AppModule { }
