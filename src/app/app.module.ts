import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { ApiServiceService } from './api-service.service';
import { provideHttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimations } from '@angular/platform-browser/animations';


import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './header/header.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardOverviewComponent } from './card-overview/card-overview.component';
// import { AvataarComponent } from './avataar/avataar.component';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    AvatarModule,
    AvatarGroupModule,
    MatTabsModule
  ],
  providers: [ApiServiceService, provideHttpClient(), provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
