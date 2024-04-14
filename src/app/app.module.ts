import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogAddEditComponent } from './components/dialog-add-edit/dialog-add-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    DialogAddEditComponent,
    DialogConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
