import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HeaderModule } from './modules/header/header.module';
import { MatTableModule } from '@angular/material/table';
import { ProductModule } from './modules/product/product.module';
import { ProductFormComponent } from './modules/product/product-form/product-form.component';
import { StockModule } from './modules/stock/stock.module';
import { UserComponent } from './modules/user/user.component';
import { UserModule } from './modules/user/user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthenticationModule,
    HeaderModule,
    MatTableModule,
    ProductModule,
    StockModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
