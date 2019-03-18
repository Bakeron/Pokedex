import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './models/Pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemons',
  template: `
    <div class="row text-center pokemons"
      infiniteScroll
      [infiniteScrollContainer]="main-panel"
      (scrolled)="onScroll()">
      <div class="col-lg-4 col-md-6 col-sm-12 pokemon" *ngFor="let pokemon of pokemons">
        <a data-toggle="modal" data-toggle="modal"
            [attr.data-target]="'#' + target"
            (click)="showPokemon(pokemon)">
          <img [defaultImage]="spinner" [lazyLoad]="pokemon.imageUrl" [offset]="offset" [alt]="pokemon.name">
          <h3>{{ pokemon.name }}</h3>
          <small>{{ pokemon.supertype }}</small>
        </a>
      </div>
      <h2 *ngIf="noMore">no more requests should be triggered</h2>
    </div>
    `,
    styles: [`
      .pokemon {
        margin-top: 20px;
        margin-bottom: 0;
        position: relative;
      }
      .pokemon img {
        cursor: pointer;
        transition: opacity .5s;
        width: 225px;
        z-index: 100;
      }
      .pokemon img:hover {
        opacity: .7;
      }
    `]
  })
  export class PokemonsComponent implements AfterViewInit {

  constructor(private router: Router,
              private pokemonsService: PokemonsService) {}

  @Input() pokemons: Pokemon[];
  @Input() target = 'none';
  @Output() selectedPokemon = new EventEmitter();
  @Output() out = new EventEmitter();

  noMore = false;
  spinner = '../assets/img/spinner.gif';
  offset = 100;

  ngAfterViewInit() {
    $('#showPokemon').modal('show');
  }

  showPokemon(pokemon) {
    this.selectedPokemon.emit(pokemon);
    this.router.navigate([`./details/${pokemon.id}`]);
  }
  onScroll() {
    if (this.target === 'showPokemon') {
      this.pokemonsService.getNextPokemons().then((response: Pokemon[]) => {
        if (typeof response === 'object') {
          this.pokemons = this.pokemons.concat(response);
        } else {
          this.noMore = true;
        }
      });
    }
  }
}
