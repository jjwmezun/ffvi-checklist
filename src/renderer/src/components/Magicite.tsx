import {
	CheckData,
	CheckType,
	GameVersion,
	MagiciteData,
} from '../common/types';

interface MagiciteProps {
	checked: CheckData,
	gameVersion: GameVersion,
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void,
    list: MagiciteData[];
}

interface MagiciteRowProps {
	item: MagiciteData;
	checked: CheckData;
	gameVersion: GameVersion;
	generateOnCheck: ( type: CheckType ) => ( index: number ) => () => void;
}

function MagiciteRow( props: MagiciteRowProps ): React.JSX.Element {
	const { item, checked, gameVersion, generateOnCheck } = props;

	const classes = `checklist-table__row${ checked.magicite[ item.id ] ? ` checklist-table__row--checked` : `` }`;

	return <tr className={ classes }>
		<td className="checklist-table__cell">
			{ ! item.ignore[ gameVersion ] && <div className="checklist-table__check">
				<input
					type="checkbox"
					checked={ checked.magicite[ item.id ] }
					onClick={ generateOnCheck( CheckType.Magicite )( item.id ) }
				/>
			</div> }
		</td>
		<td className="checklist-table__cell">{ item.id }</td>
		<td className="checklist-table__cell">{ item.names[ gameVersion ] }</td>
	</tr>;
}

function Magicite( props: MagiciteProps ) {
	const { checked, list, gameVersion, generateOnCheck } = props;

	// eslint-disable-next-line function-paren-newline
	const versionList = list.filter(
		i => ( gameVersion === GameVersion.GBA && i.in.gba )
			|| ( gameVersion === GameVersion.SNES && i.in.snes )
			|| ( gameVersion === GameVersion.PIXEL && i.in.pixel ),
	// eslint-disable-next-line function-paren-newline
	);

	const validIds = versionList.filter( i => ! i.ignore[ gameVersion ] ).map( i => i.id );
	const checkedCount = validIds.filter( id => checked.magicite[ id ] ).length;

	return <div>
		<h2 className="checklist__title">Magicites</h2>
		<table className="checklist-table">
			<thead>
				<tr>
					<th className="checklist-table__cell">{ checkedCount } / { validIds.length }</th>
					<th className="checklist-table__cell">#</th>
					<th className="checklist-table__cell">Name</th>
				</tr>
			</thead>
			<tbody>
				{ versionList.map( ( item, index ) => <MagiciteRow
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

export default Magicite;
