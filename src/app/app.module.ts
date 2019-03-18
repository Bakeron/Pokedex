import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { DetailsPokemonComponent } from './details-pokemon/details-pokemon.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PokemonsComponent } from './pokemons.component';
import { PokemonsService } from './pokemons.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsPokemonComponent,
    PokemonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    HttpModule,
    InfiniteScrollModule,
    LazyLoadImageModule
  ],
  providers: [PokemonsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
