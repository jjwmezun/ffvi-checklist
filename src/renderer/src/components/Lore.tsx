import {
	CheckData,
	CheckType,
	GameVersion,
	LoreData,
} from '../common/types';
import { EnemyData } from '../common/types';
import DialogBox from './DialogBox';

interface LoreProps {
	checked: CheckData,
	enemies: EnemyData[],
	gameVersion: GameVersion,
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void,
    list: LoreData[];
}

interface LoreRowProps {
	item: LoreData;
	checked: CheckData;
	enemies: EnemyData[],
	gameVersion: GameVersion;
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void;
}

function LoreRow( props: LoreRowProps ): React.JSX.Element {
	const { item, checked, enemies, gameVersion, generateOnCheck } = props;

	const classes = `checklist-table__row${ checked.lore[ item.id ] ? ` checklist-table__row--checked` : `` }`;

	return <tr className={ classes }>
		<td className="checklist-table__cell">
			<div className="checklist-table__check">
				<input
					type="checkbox"
					checked={ checked.lore[ item.id ] }
					onClick={ generateOnCheck( CheckType.Lore )( item.id ) }
				/>
			</div>
		</td>
		<td className="checklist-table__cell">{ item.id }</td>
		<td className="checklist-table__cell">{ item.names[ gameVersion ] }</td>
		<td className="checklist-table__cell">
			{ item.enemies.map( id => enemies.find( e => e.id === id )?.names[ gameVersion ] ?? null )
				.filter( name => name !== null ).join( `, ` ) }
		</td>
	</tr>;
}

function Lore( props: LoreProps ) {
	const { checked, enemies, list, gameVersion, generateOnCheck } = props;

	const checkedCount = list.filter( item => checked.lore[ item.id ] ).length;

	return <div>
		<h2 className="checklist__title">Lores</h2>
		<DialogBox
			checked={ checkedCount }
			title="Lores"
			total={ list.length }
		/>
		<table className="checklist-table">
			<thead>
				<tr>
					<th className="checklist-table__cell">{ checkedCount } / { list.length }</th>
					<th className="checklist-table__cell">#</th>
					<th className="checklist-table__cell">Name</th>
					<th className="checklist-table__cell">Enemies</th>
				</tr>
			</thead>
			<tbody>
				{ list.map( ( item, index ) => <LoreRow
					key={ index }
					checked={ checked }
					enemies={ enemies }
					gameVersion={ gameVersion }
					item={ item }
					generateOnCheck={ generateOnCheck }
				/> ) }
			</tbody>
		</table>
	</div>;
}

export default Lore;
