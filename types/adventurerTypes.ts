export interface Adventurer {
  id: number;
  adventurerName: string;
  adventurerClass: "WARRIOR" | "MAGE" | "PRIEST" | "ROGUE";
  level: number;
  stats: Stats | BaseStats; // allow subset for new adventurers
}

export interface Stats {
  // base stats
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  // derived stats
  maxHealth: number;
  currentHealth: number;
  maxMana: number;
  currentMana: number;

  armor: number;
}

export type BaseStats = Pick<
  Stats,
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma"
>;
