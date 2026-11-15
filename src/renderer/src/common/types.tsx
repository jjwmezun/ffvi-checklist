interface CheckData {
	bestiary: boolean[],
	lore: boolean[],
	dance: boolean[],
	magicite: boolean[],
	rage: boolean[],
	treasure: boolean[][][],
	veldt: boolean[],
}

enum CheckType {
	Bestiary = `bestiary`,
	Lore = `lore`,
	Dance = `dance`,
	Magicite = `magicite`,
	Rage = `rage`,
	Treasure = `treasure`,
	Veldt = `veldt`,
}

interface DanceData {
	id: number,
	in: {
		gba: {
			wob: boolean,
			wor: boolean,
		},
		pixel: {
			wob: boolean,
			wor: boolean,
		},
		snes: {
			wob: boolean,
			wor: boolean,
		},
	},
	found: {
		gba: string[],
		pixel: string[],
		snes: string[],
	},
	missable: boolean,
	names: {
		gba: string,
		pixel: string,
		snes?: string,
	},
}

interface EnemyData {
	drops: EnemyItem[],
	icon: string,
	id: number,
	location: string[],
	names: {
		gba: string,
		pixel: string,
		snes?: string,
	},
	numbers: {
		gba?: number,
		pixel?: number,
		snes?: number,
	},
	steal: EnemyItem[],
}

interface EnemyItem {
	chance: string,
	names: {
		gba: string,
		pixel: string,
		snes: string,
	},
}

enum GameVersion {
	GBA = `gba`,
	PIXEL = `pixel`,
	SNES = `snes`,
}

interface LoreData {
	enemies: number[],
	id: number,
	names: {
		gba: string,
		pixel: string,
		snes?: string,
	},
}

interface MagiciteData {
	ignore: {
		gba: boolean,
		pixel: boolean,
		snes: boolean,
	},
	in: {
		gba: boolean,
		pixel: boolean,
		snes: boolean,
	},
	id: number,
	found: string,
	lvBonus: {
		gba: string,
		pixel: string,
		snes: string,
	},
	mainSpell: string,
	names: {
		gba: string,
		pixel: string,
		snes?: string,
	},
	spells: MagiciteSpellData[],
}
interface MagiciteSpellData {
	multiplier: number,
	names: {
		gba: string,
		pixel: string,
		snes: string,
	},
	type: string,
}

interface RageData {
	enemy: number,
	id: number,
	location: string,
	obtainable: {
		gba: boolean,
		pixel: boolean,
		snes: boolean,
	},
	regularAttack: {
		gba: string,
		pixel: string,
		snes: string,
	},
	specialAttack: {
		gba: string,
		pixel: string,
		snes: string,
	},
	innateAbilities: string,
	statusImmunity: string,
}

interface TreasureAreaData {
	in: {
		gba: boolean,
		pixel: boolean,
		snes: boolean,
	},
	items: TreasureItemData[],
	title: string,
}

interface TreasureData {
	title: string,
	areas: TreasureAreaData[],
}

interface TreasureItemData {
	names: {
		gba: string,
		pixel: string,
		snes: string,
	},
	location: string,
	missable: boolean,
	type: string,
}

interface TreasureItemDataFlattened {
	in: {
		gba: boolean,
		pixel: boolean,
		snes: boolean,
	},
	names: {
		gba: string,
		pixel: string,
		snes: string,
	},
	location: string,
	missable: boolean,
	type: string,
}

export {
	CheckType,
	GameVersion,
};

export type {
	CheckData,
	EnemyData,
	LoreData,
	DanceData,
	MagiciteData,
	RageData,
	TreasureAreaData,
	TreasureData,
	TreasureItemData,
	TreasureItemDataFlattened,
};
