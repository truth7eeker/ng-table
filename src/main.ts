import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgxSpinnerModule } from "ngx-spinner";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule), 
    provideAnimationsAsync(), 
    BrowserAnimationsModule,
    NgxSpinnerModule
  ]
})
  .catch(err => console.error(err));
