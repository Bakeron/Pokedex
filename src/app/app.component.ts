import { Component, OnInit} from '@angular/core';
import { PokemonsService } from './pokemons.service';
import { InfiniteScrollDirective  } from 'ngx-infinite-scroll';
import { Pokemon } from './models/Pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [InfiniteScrollDirective]
})

export class AppComponent implements OnInit {

  title = 'NeoPOKEDEX';
  pokemons: Pokemon[];
  selectPokemon = {};
  see: boolean;
  similarPokemons = [];
  selector = '.main-panel';

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit() {
    this.pokemonsService.getAllPokemons()
      .then((response: any) => this.pokemons = response);

    if (location.href.indexOf('/details/') !== -1) {
      const params = location.href.indexOf('/details/') + 9;
      const id = location.href.substr(params);
      this.pokemonsService.getPokemon(id)
        .then((response: any) => this.openDetails(response[0]));
    } else {
      this.see = false;
    }
  }

  openDetails(pokemon) {
    pokemon.attacksPokemon = pokemon.attacks
      .map(attack => attack.name);

    pokemon.weaknessPokemon = pokemon.weaknesses
      .map(weakness => `${weakness.type} ${weakness.value}`);

    this.pokemonsService
      .getSimilarPokemons(pokemon.types, pokemon.rarity, pokemon.hp)
      .then((response: any) => this.similarPokemons = response);

    this.selectPokemon = pokemon;
    this.see = true;
  }
}
