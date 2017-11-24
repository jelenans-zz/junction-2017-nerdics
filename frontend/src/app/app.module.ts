import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import '../styles/styles.scss';
import '../styles/headings.css';

/**
 * Main entry point
 */
@NgModule({
  bootstrap: [ AppComponent ],
  /**
   * Components and directives
   */
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent
  ],
  /**
   * Other dependencies
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  /**
   * Services
   */
  providers: [
  ]
})
export class AppModule {}
