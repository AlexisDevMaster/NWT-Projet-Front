import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PersonComponent } from './person/person.component';
import { AppRoutingModule } from './app-routing.module';
import { PeopleComponent } from './people/people.component';
import { CardComponent } from './shared/card/card.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormComponent } from './shared/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { NaPipe } from './shared/pipes/na.pipe';
import { BadgeDirective } from './shared/directives/badge.directive';
import {MatMenuModule} from '@angular/material/menu';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DrawerContainerComponent} from './drawer-container/drawer-container.component';
import {SidenavContentComponent} from './sidenav-content/sidenav-content.component';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselCategoryComponent } from './carousel-category/carousel-category.component';
import { CarouselVideoComponent } from './carousel-video/carousel-video.component';
import { CarouselUserComponent } from './carousel-user/carousel-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonComponent,
    PeopleComponent,
    CardComponent,
    DialogComponent,
    FormComponent,
    UpdateComponent,
    NaPipe,
    BadgeDirective,
    SearchBarComponent,
    DrawerContainerComponent,
    SidenavContentComponent,
    DrawerContentComponent,
    CarouselCategoryComponent,
    CarouselVideoComponent,
    CarouselUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatMenuModule,
    NgMatSearchBarModule,
    FormsModule,
    MatAutocompleteModule,
    MatSidenavModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
