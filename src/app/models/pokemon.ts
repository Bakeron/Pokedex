export interface Pokemon {
    id: string;
    name: string;
    supertype: string;
    series: string;
    types: string[];
    nationalPokedexNumber: number;
    rarity: string;
    hp: string;
    set: string;
    weaknesses: Weakness[];
    attacks: Attacks[];
    evolvesFrom: string;
    attacksPokemon?: string[];
    weaknessPokemon?: string[];
}

interface Attacks {
    name: string;
}

interface Weakness {
    type: string;
    value: string;
}
