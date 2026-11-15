import { useEffect, useState } from 'react';

import {
	CheckData,
	CheckType,
	DanceData,
	EnemyData,
	GameVersion,
	RageData,
	LoreData,
	MagiciteData,
} from '../common/types';

import Enemy from './Enemy';
import Dance from './Dance';
import Lore from './Lore';
import Rage from './Rage';
import Search from './Search';
import Magicite from './Magicite';
import Logo from './Logo';

interface DataType {
	enemy: EnemyData[],
	dance: DanceData[],
	lore: LoreData[],
	magicite: MagiciteData[],
	rage: RageData[],
}

interface appPropTypes {
	data: DataType,
}

interface typeMenuPropTypes {
	currentType: ItemType,
	setItemType: ( type: ItemType ) => void,
}

interface typeMenuItemPropTypes {
	isSelected: boolean,
	setItemType: () => void,
	title: string,
}

enum ItemType {
	Enemy = `enemy`,
	Lore = `lore`,
	Magicite = `magicite`,
	Rage = `rage`,
	Dance = `dance`,
}

function App( props: appPropTypes ): React.JSX.Element {
	const { data } = props;
	const {
		enemy,
		lore,
		magicite,
		rage,
		dance,
	} = data as DataType;
	const [ gameVersion, setGameVersion ] = useState<GameVersion>( GameVersion.GBA );
	const [ itemType, setItemType ] = useState<ItemType>( ItemType.Enemy );
	const [ checked, setChecked ] = useState<CheckData>( generateCheckData( data ) );
	const [ hardSave, setHardSave ] = useState<CheckData | null>( generateHardSaveData( data ) );

	const dataIsEmpty = isDataEmpty( checked );
	const disableHardSave = dataIsEmpty || ( hardSave !== null && testDataAreEqual( checked, hardSave ) );
	const disableLoadHardSave = hardSave === null || testDataAreEqual( checked, hardSave );

	const clearChecklist = () => {
		if ( confirm( `¿Are you sure you want to clear your checklist? This action can’t be undone.` ) ) {
			const newChecked = generateEmptyCheckData( data );
			setChecked( newChecked );
			setHardSave( null );
			for ( let i = 0; i < data.enemy.length; i++ ) {
				localStorage.removeItem( `bestiary-${ i }` );
				localStorage.removeItem( `veldt-${ i }` );
			}
			for ( const type in data ) {
				for ( let i = 0; i < data[ type ].length; i++ ) {
					localStorage.removeItem( `${ type }-${ i }` );
				}
			}
			localStorage.removeItem( `hard-save` );
		}
	};

	const onImportData = ( _event: Electron.IpcRendererEvent, importData: object ) => {
		setChecked( importData as CheckData );
		updateLocalStorage( importData );
	};

	const generateOnCheck = ( type: CheckType ) => ( index: number ) => {
		return () => {
			const newChecked = { ...checked };
			newChecked[ type ][ index ] = !newChecked[ type ][ index ];
			setChecked( newChecked );
			saveCheck( type, index, newChecked );
		};
	};

	const startExport = () => window.electronAPI.openExportWindow( checked );

	const startImport = () => {
		if ( dataIsEmpty
			|| confirm( `Importing a checklist will o’erwrite your current checklist.
				¿Are you sure you want to continue?` )
		) {
			window.electronAPI.openImportWindow();
		}
	};

	const updateHardSave = () => {
		const newHardSave = structuredClone( checked );
		setHardSave( newHardSave );
		const hardSaveString = createHardSaveString( newHardSave );
		localStorage.setItem( `hard-save`, hardSaveString );
	};

	const loadHardSave = () => {
		if ( hardSave === null ) {
			return;
		}
		if ( confirm( `¿Are you sure you want to load the hard save? This will o’erwrite your current checklist.` ) ) {
			const newChecked = structuredClone( hardSave );
			setChecked( newChecked );
			updateLocalStorage( newChecked );
		}
	};

	useEffect( () => {
		window.electronAPI.on( `import-data`, onImportData );
		return () => window.electronAPI.remove( `import-data` );
	}, [] );

	return <div className="app">
		<div>
			<Logo />
		</div>
		<h1 className="app__title" title="Final Fantasy VI Checklist">Checklist</h1>
		<div className="export">
			<button
				className="btn btn-secondary"
				disabled={ gameVersion === GameVersion.GBA }
				type="button"
				onClick={ () => setGameVersion( GameVersion.GBA ) }
			>
				GBA
			</button>
			<button
				className="btn btn-secondary"
				disabled={ gameVersion === GameVersion.SNES }
				type="button"
				onClick={ () => setGameVersion( GameVersion.SNES ) }
			>
				SNES
			</button>
		</div>
		<TypeMenu currentType={ itemType } setItemType={ setItemType } />
		<div className="export">
			<button
				className="btn btn-secondary"
				disabled={ disableHardSave }
				type="button"
				onClick={ updateHardSave }
			>
				Create Hard Save
			</button>
			<button
				className="btn btn-secondary"
				disabled={ disableLoadHardSave }
				type="button"
				onClick={ loadHardSave }
			>
				Load Hard Save
			</button>
			<button
				className="btn btn-secondary"
				disabled={ dataIsEmpty }
				type="button"
				onClick={ startExport }
			>
				Export Checklist
			</button>
			<button
				className="btn btn-secondary"
				type="button"
				onClick={ startImport }
			>
				Import Checklist
			</button>
			<button
				className="btn btn-secondary"
				disabled={ dataIsEmpty }
				type="button"
				onClick={ clearChecklist }
			>
				Clear Checklist
			</button>
		</div>
		<div>
			{ itemType === ItemType.Enemy && <Enemy
				checked={ checked }
				gameVersion={ gameVersion }
				generateOnCheck={ generateOnCheck }
				list={ enemy }
			/> }
			{ itemType === ItemType.Lore && <Lore
				list={ lore }
				checked={ checked }
				gameVersion={ gameVersion }
				generateOnCheck={ generateOnCheck }
			/> }
			{ itemType === ItemType.Magicite && <Magicite
				list={ magicite }
				checked={ checked }
				gameVersion={ gameVersion }
				generateOnCheck={ generateOnCheck }
			/> }
			{ itemType === ItemType.Rage && <Rage
				enemies={ enemy.sort( ( a, b ) => a.id - b.id ) }
				list={ rage }
				checked={ checked }
				gameVersion={ gameVersion }
				generateOnCheck={ generateOnCheck }
			/> }
			{ itemType === ItemType.Dance && <Dance
				list={ dance }
				checked={ checked }
				gameVersion={ gameVersion }
				generateOnCheck={ generateOnCheck }
			/> }
		</div>
		<Search />
	</div>;
}

function TypeMenu( props: typeMenuPropTypes ): React.JSX.Element {
	const { currentType, setItemType } = props;
	return <nav className="type-menu">
		<ul className="type-menu__list">
			{ Object.values( ItemType ).map( type => <TypeMenuItem
				key={ type }
				isSelected={ currentType === type }
				setItemType={ () => setItemType( type ) }
				title={ type.charAt( 0 ).toUpperCase() + type.slice( 1 ) }
			/> ) }
		</ul>
	</nav>;
}

function TypeMenuItem( props: typeMenuItemPropTypes ): React.JSX.Element {
	const { isSelected, setItemType, title } = props;
	return <li className="type-menu__item">
		<button
			className="btn btn-primary type-menu__button"
			disabled={ isSelected }
			type="button"
			onClick={ () => setItemType() }
		>
			{ title }
		</button>
	</li>;
}

function isDataEmpty( data: object ): boolean {
	for ( const type in data ) {
		for ( const item of data[ type ] ) {
			if ( item ) {
				return false;
			}
		}
	}
	return true;
}

function generateHardSaveData( data: DataType ): CheckData | null {
	const save = localStorage.getItem( `hard-save` );
	if ( ! save ) {
		return null;
	}
	const saveData: boolean[] = save.split( `` ).map( char => char === `1` );
	return {
		bestiary: data.enemy.map( () => saveData.shift() || false ),
		dance: data.dance.map( () => saveData.shift() || false ),
		lore: data.lore.map( () => saveData.shift() || false ),
		magicite: data.magicite.map( () => saveData.shift() || false ),
		rage: data.rage.map( () => saveData.shift() || false ),
		veldt: data.enemy.map( () => saveData.shift() || false ),
	};
}

function createHardSaveString( data: CheckData ): string {
	let out = ``;
	for ( const type in data ) {
		for ( const item of data[ type ] ) {
			out += item ? `1` : `0`;
		}
	}
	return out;
}

function generateCheckData( data: DataType ): CheckData {
	return {
		bestiary: data.enemy.filter( i => i.numbers.gba ).map( ( _: EnemyData, index: number ) => {
			const stored = localStorage.getItem( `bestiary-${ index }` );
			return stored === `1` ? true : false;
		} ),
		dance: data.dance.map( ( _: DanceData, index: number ) => {
			const stored = localStorage.getItem( `dance-${ index }` );
			return stored === `1` ? true : false;
		} ),
		lore: data.lore.map( ( _: LoreData, index: number ) => {
			const stored = localStorage.getItem( `lore-${ index }` );
			return stored === `1` ? true : false;
		} ),
		magicite: data.magicite.map( ( _: MagiciteData, index: number ) => {
			const stored = localStorage.getItem( `magicite-${ index }` );
			return stored === `1` ? true : false;
		} ),
		rage: data.rage.map( ( _: RageData, index: number ) => {
			const stored = localStorage.getItem( `rage-${ index }` );
			return stored === `1` ? true : false;
		} ),
		veldt: data.enemy.map( ( _: EnemyData, index: number ) => {
			const stored = localStorage.getItem( `veldt-${ index }` );
			return stored === `1` ? true : false;
		} ),
	};
}

function generateEmptyCheckData( data: DataType ): CheckData {
	return {
		bestiary: data.enemy.filter( i => i.numbers.gba ).map( () => {
			return false;
		} ),
		dance: data.dance.map( () => {
			return false;
		} ),
		lore: data.lore.map( () => {
			return false;
		} ),
		magicite: data.magicite.map( () => {
			return false;
		} ),
		rage: data.rage.map( () => {
			return false;
		} ),
		veldt: data.enemy.map( () => {
			return false;
		} ),
	};
}

function testDataAreEqual( data1: object, data2: object ): boolean {
	for ( const type in data1 ) {
		for ( let i = 0; i < data1[ type ].length; i++ ) {
			if ( data1[ type ][ i ] !== data2[ type ][ i ] ) {
				return false;
			}
		}
	}
	return true;
}

function updateLocalStorage( list: object ): void {
	for ( const type in list ) {
		for ( let i = 0; i < list[ type ].length; i++ ) {
			saveCheck( type, i, list );
		}
	}
}

function saveCheck( type: string, index: number, list: object ): void {
	localStorage.setItem( `${ type }-${ index }`, list[ type ][ index ] ? `1` : `0` );
}

export default App;
