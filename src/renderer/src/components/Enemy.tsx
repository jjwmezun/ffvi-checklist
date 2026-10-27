import {
	CheckData,
	CheckType,
	EnemyData,
	GameVersion,
} from '../common/types';

interface EnemyProps {
	checked: CheckData,
	gameVersion: GameVersion,
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void;
	list: EnemyData[];
}

interface CheckListRowProps {
	item: EnemyData;
	checked: CheckData;
	gameVersion: GameVersion;
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void;
}

function EnemyRow( props: CheckListRowProps ): React.JSX.Element {
	const { item, checked, gameVersion, generateOnCheck } = props;

	let classes = `checklist-table__row`;

	if (
		( gameVersion === GameVersion.GBA && checked.bestiary[ item.id ] )
		|| ( gameVersion === GameVersion.SNES && checked.veldt[ item.id ] )
	) {
		classes += ` checklist-table__row--checked`;
	}

	return <tr className={ classes }>
		{ gameVersion === GameVersion.GBA && <td className="checklist-table__cell">
			{ item.numbers.gba && <div className="checklist-table__check">
				<input
					type="checkbox"
					checked={ checked.bestiary[ item.id ] }
					onClick={ generateOnCheck( CheckType.Bestiary )( item.id ) }
				/>
			</div> }
		</td> }
		<td className="checklist-table__cell">
			<div className="checklist-table__check">
				<input
					type="checkbox"
					checked={ checked.veldt[ item.id ] }
					onClick={ generateOnCheck( CheckType.Veldt )( item.id ) }
				/>
			</div>
		</td>
		{ gameVersion === GameVersion.GBA && <td className="checklist-table__cell">
			{ item.numbers.gba }
		</td> }
		<td className="checklist-table__cell">
			{ item.names[ gameVersion ] }
		</td>
		<td className="checklist-table__cell">
			{ item.icon !== `` && <img src={ `data:image/png;base64,${ item.icon }` } /> }
		</td>
		<td className="checklist-table__cell">
			{ item.location.join( `, ` ) }
		</td>
	</tr>;
}

function Enemy( props: EnemyProps ): React.JSX.Element {
	const { checked, gameVersion, list, generateOnCheck } = props;

	const versionList = list.filter( i => i.names[ gameVersion ] );
	const validIds = versionList.map( i => i.id ).filter( i => i );
	const bestiarySize = versionList.filter( i => i.numbers.gba ).length;

	const veldtLength = checked.veldt.filter( ( v, i ) => v && validIds.includes( i ) ).length;

	return <div>
		<h2 className="checklist__title">Enemies</h2>
		<table className="checklist-table">
			<thead>
				<tr>
					{ gameVersion === GameVersion.GBA && <th className="checklist-table__cell">
						Bestiary<br />{ checked.bestiary.filter( i => i ).length } / { bestiarySize }
					</th> }
					<th className="checklist-table__cell">
						Veldt<br />{ veldtLength } / { versionList.length }
					</th>
					{ gameVersion === GameVersion.GBA && <th className="checklist-table__cell">#</th> }
					<th className="checklist-table__cell">Name</th>
					<th className="checklist-table__cell">Icon</th>
					<th className="checklist-table__cell">Location</th>
				</tr>
			</thead>
			<tbody>
				{ versionList.map( ( item, index ) => <EnemyRow
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

export default Enemy;
