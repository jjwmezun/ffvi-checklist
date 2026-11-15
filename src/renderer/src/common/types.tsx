interface CheckData {
	bestiary: boolean[],
	lore: boolean[],
	dance: boolean[],
	magicite: boolean[],
	rage: boolean[],
	veldt: boolean[],
}

enum CheckType {
	Bestiary = `bestiary`,
	Lore = `lore`,
	Dance = `dance`,
	Magicite = `magicite`,
	Rage = `rage`,
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
};
