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
		snes: {
			wob: boolean,
			wor: boolean,
		},
	},
	found: {
		gba: string[],
		snes: string[],
	},
	missible: boolean,
	names: {
		gba: string,
		snes?: string,
	},
}

interface EnemyData {
	icon: string,
	id: number,
	location: string[],
	names: {
		gba: string,
		snes?: string,
	},
	numbers: {
		gba?: number,
		snes?: number,
	}
}

enum GameVersion {
	GBA = `gba`,
	SNES = `snes`,
}

interface LoreData {
	id: number,
	names: {
		gba: string,
		snes?: string,
	},
}

interface MagiciteData {
	inSNES: boolean,
	id: number,
	names: {
		gba: string,
		snes?: string,
	},
}

interface RageData {
	enemy: number,
	id: number,
	location: string,
	obtainable: {
		gba: boolean,
		snes: boolean,
	},
	regularAttack: string,
	specialAttack: string,
	innateAbilities: string,
	statusImmunity: string,
}

interface TreasureAreaData {
	title: string,
	inSNES: boolean,
	items: TreasureItemData[],
}

interface TreasureData {
	title: string,
	areas: TreasureAreaData[],
}

interface TreasureItemData {
	names: {
		gba: string,
		snes: string,
	},
	location: string,
	missable: boolean,
	type: string,
}

interface TreasureItemDataFlattened {
	inSNES: boolean,
	names: {
		gba: string,
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
