import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  pokemons: Array<object> = [];
  similarPokemon: Array<object> = [];
  url = 'https://api.pokemontcg.io/v1/cards';
  page = 1;

  constructor(private http: Http) {}

  getAllPokemons(): Promise<any> {
    const url = `${this.url}?page=${this.page}`;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe((result: any) => {
          this.pokemons = JSON.parse(result._body).cards
            .filter(pokemon => pokemon.supertype === 'Pokémon');
          resolve(this.pokemons);
        });
    });
  }

  getNextPokemons(): Promise<any> {
    const url = `${this.url}?page=${++this.page}`;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe((result: any) => {
          this.pokemons = JSON.parse(result._body).cards
            .filter(pokemon => pokemon.supertype === 'Pokémon');
          resolve(this.pokemons);
        });
    });
  }

  getPokemon(id): Promise<any> {
    const url = `${this.url}?id=${id}`;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe((result: any) => {
          this.pokemons = JSON.parse(result._body).cards
            .filter(pokemon => pokemon.supertype === 'Pokémon');
          resolve(this.pokemons);
        });
    });
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getSimilarPokemons(types, rarity, hp) {
    const url = `${this.url}?hp=gt${0.9 * hp}&rarity=${rarity}&types=${types}`;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe((result: any) => {
          let similar = JSON.parse(result._body).cards
            .filter(pokemon => pokemon.supertype === 'Pokémon')
            .filter(pokemon => pokemon.hp <= hp * 1.1);
          if (similar.length > 3) {
            similar = this.shuffle(similar).slice(0, 3);
          } else if (similar.length === 0) {
            similar = '';
          } else {
            similar = this.shuffle(similar);
          }
          resolve(similar);
        });
    });
  }
}
