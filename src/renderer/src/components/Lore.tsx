import {
	CheckData,
	CheckType,
	GameVersion,
	LoreData,
} from '../common/types';

interface LoreProps {
	checked: CheckData,
	gameVersion: GameVersion,
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void,
    list: LoreData[];
}

interface LoreRowProps {
	item: LoreData;
	checked: CheckData;
	gameVersion: GameVersion;
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void;
}

function LoreRow( props: LoreRowProps ): React.JSX.Element {
	const { item, checked, gameVersion, generateOnCheck } = props;

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
	</tr>;
}

function Lore( props: LoreProps ) {
	const { checked, list, gameVersion, generateOnCheck } = props;

	const checkedCount = list.filter( item => checked.lore[ item.id ] ).length;

	return <div>
		<h2 className="checklist__title">Lore</h2>
		<table className="checklist-table">
			<thead>
				<tr>
					<th className="checklist-table__cell">{ checkedCount } / { list.length }</th>
					<th className="checklist-table__cell">#</th>
					<th className="checklist-table__cell">Name</th>
				</tr>
			</thead>
			<tbody>
				{ list.map( ( item, index ) => <LoreRow
					key={ index }
					checked={ checked }
					gameVersion={ gameVersion }
					item={ item }
					generateOnCheck={ generateOnCheck }
				/> ) }
			</tbody>
		</table>
	</div>;
}

export default Lore;
