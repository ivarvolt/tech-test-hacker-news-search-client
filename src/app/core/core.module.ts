import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

const moduleImport = [
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    moduleImport,
  ],
  exports: [
    moduleImport
  ]
})
export class CoreModule { }
