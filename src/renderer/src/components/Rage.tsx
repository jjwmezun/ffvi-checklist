import {
	CheckData,
	EnemyData,
	RageData,
	GameVersion,
	CheckType,
} from '../common/types';
import DialogBox from './DialogBox';

interface RageProps {
	checked: CheckData,
	enemies: EnemyData[],
	gameVersion: GameVersion,
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void,
    list: RageData[];
}

interface RageRowProps {
	item: RageData;
	checked: CheckData;
	enemies: EnemyData[];
	gameVersion: GameVersion;
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void;
}

function RageRow( props: RageRowProps ): React.JSX.Element {
	const { item, checked, enemies, gameVersion, generateOnCheck } = props;

	const classes = `checklist-table__row${ checked.rage[ item.id ] ? ` checklist-table__row--checked` : `` }`;

	return <tr className={ classes }>
		<td className="checklist-table__cell">
			{ item.obtainable[ gameVersion ] && <div className="checklist-table__check">
				<input
					type="checkbox"
					checked={ checked.rage[ item.id ] }
					onClick={ generateOnCheck( CheckType.Rage )( item.id ) }
				/>
			</div> }
		</td>
		<td className="checklist-table__cell">{ item.id }</td>
		<td className="checklist-table__cell">
			{ enemies.find( enemy => enemy.id === item.enemy )?.names[ gameVersion ] ?? `Unknown` }
		</td>
		<td className="checklist-table__cell">{ item.location }</td>
		<td className="checklist-table__cell">{ item.regularAttack[ gameVersion ] }</td>
		<td className="checklist-table__cell">{ item.specialAttack[ gameVersion ] }</td>
		<td className="checklist-table__cell">{ item.innateAbilities.split( `\n` )
			.map( ( ability, index ) => <div key={ index }>{ ability }</div> ) }
		</td>
		<td className="checklist-table__cell">{ item.statusImmunity }</td>
	</tr>;
}

function Rage( props: RageProps ) {
	const { checked, enemies, list, gameVersion, generateOnCheck } = props;

	const obtainable = list.filter( item => item.obtainable[ gameVersion ] );
	const obtainableIds = obtainable.map( item => item.id );
	const obtainableLength = obtainable.length;
	const checkedLength = checked.rage.filter( ( c, i ) => c && obtainableIds.includes( i ) ).length;

	return <div>
		<h2 className="checklist__title">Rages</h2>
		<DialogBox
			checked={ checkedLength }
			title="Rages"
			total={ obtainableLength }
		/>
		<table className="checklist-table">
			<thead>
				<tr>
					<th className="checklist-table__cell">{ checkedLength } / { obtainableLength }</th>
					<th className="checklist-table__cell">#</th>
					<th className="checklist-table__cell">Name</th>
					<th className="checklist-table__cell">Location</th>
					<th className="checklist-table__cell">Regular Attack</th>
					<th className="checklist-table__cell">Special Attack</th>
					<th className="checklist-table__cell">Innate Abilities</th>
					<th className="checklist-table__cell">Status Immunity</th>
				</tr>
			</thead>
			<tbody>
				{ list.map( ( item, index ) => <RageRow
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

export default Rage;
