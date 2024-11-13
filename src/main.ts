import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './application-module/app.config';
import { AppComponent } from './application-module/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));