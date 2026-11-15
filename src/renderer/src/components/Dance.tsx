import {
	CheckData,
	CheckType,
	GameVersion,
	DanceData,
} from '../common/types';

interface DanceProps {
	checked: CheckData,
	gameVersion: GameVersion,
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void,
	list: DanceData[];
}

interface DanceRowProps {
	item: DanceData;
	checked: CheckData;
	gameVersion: GameVersion;
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void;
}

function DanceRow( props: DanceRowProps ): React.JSX.Element {
	const { item, checked, gameVersion, generateOnCheck } = props;

	const classes = `checklist-table__row${ checked.dance[ item.id ] ? ` checklist-table__row--checked` : `` }`;

	return <tr className={ classes }>
		<td className="checklist-table__cell">
			<div className="checklist-table__check">
				<input
					type="checkbox"
					checked={ checked.dance[ item.id ] }
					onClick={ generateOnCheck( CheckType.Dance )( item.id ) }
				/>
			</div>
		</td>
		<td className="checklist-table__cell">{ item.id }</td>
		<td className="checklist-table__cell">{ item.names[ gameVersion ] }</td>
		<td className={ `checklist-table__cell ${ item.missable ? `no` : `yes` }` }>
			{ item.missable ? `Yes` : `No` }
		</td>
		<td className="checklist-table__cell">
			{ item.found[ gameVersion ].join( `, ` ) }
		</td>
		<td className={ `checklist-table__cell ${ item.in[ gameVersion ].wob ? `yes` : `no` }` }>
			{ item.in[ gameVersion ].wob ? `Yes` : `No` }
		</td>
		<td className={ `checklist-table__cell ${ item.in[ gameVersion ].wor ? `yes` : `no` }` }>
			{ item.in[ gameVersion ].wor ? `Yes` : `No` }
		</td>
	</tr>;
}

function Dance( props: DanceProps ) {
	const { checked, list, gameVersion, generateOnCheck } = props;

	const checkedCount = list.filter( item => checked.dance[ item.id ] ).length;

	return <div>
		<h2 className="checklist__title">Dances</h2>
		<table className="checklist-table">
			<thead>
				<tr>
					<th className="checklist-table__cell">{ checkedCount } / { list.length }</th>
					<th className="checklist-table__cell">#</th>
					<th className="checklist-table__cell">Name</th>
					<th className="checklist-table__cell">Missable</th>
					<th className="checklist-table__cell">Found</th>
					<th className="checklist-table__cell">¿In WOB?</th>
					<th className="checklist-table__cell">¿In WOR?</th>
				</tr>
			</thead>
			<tbody>
				{ list.map( ( item, index ) => <DanceRow
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

export default Dance;
