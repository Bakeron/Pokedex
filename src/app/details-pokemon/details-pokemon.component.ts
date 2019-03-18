import { Component, Input, OnInit } from '@angular/core';
import { PokemonsService } from '../pokemons.service';
import { Pokemon } from '../models/Pokemon';

@Component({
  selector: 'app-details-pokemon',
  templateUrl: './details-pokemon.component.html',
  styleUrls: ['./details-pokemon.component.scss']
})
export class DetailsPokemonComponent implements OnInit {

  @Input() selectPokemon: Pokemon;
  @Input() similarPokemons: Pokemon[];

  pokemons = [];
  spinner = '../assets/img/spinner.gif';
  offset = 100;

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit() {
    this.pokemonsService.getAllPokemons()
      .then((response: Pokemon[]) => this.pokemons = response);
  }

  select(pokemon) {
    this.similarPokemons = [];
    this.pokemonsService
      .getSimilarPokemons(pokemon.types, pokemon.rarity, pokemon.hp)
      .then((response: Pokemon[]) => {
        response.forEach((poke, index) => this.similarPokemons.push(poke));
      });

    this.selectPokemon = pokemon;
    this.selectPokemon.attacksPokemon = this.selectPokemon.attacks
        .map(attack => attack.name);

    this.selectPokemon.weaknessPokemon = this.selectPokemon.weaknesses
        .map(weakness => `${weakness.type} ${weakness.value}`);
  }
}
