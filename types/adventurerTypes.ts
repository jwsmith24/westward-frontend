export interface Adventurer {
  id: number;
  adventurerName: string;
  adventurerClass: "WARRIOR" | "MAGE" | "PRIEST" | "ROGUE";
  level: number;
}

export interface Stats {
  id: number;

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
