import { GameVersion } from './types';

interface CheckListProps {
	checked: object,
	generateOnCheck: ( index: number ) => () => void,
	list: object[];
}

interface CheckListRowProps {
	item: object;
	checked: boolean;
	generateOnCheck: () => void;
	gameVersion: GameVersion;
}

interface ColumnType {
	render: ( item: object, gameVersion: GameVersion ) => React.JSX.Element;
	title: string;
}

function generateCheckListType( type: string, columns: ColumnType[] ) {
	function CheckListRow( props: CheckListRowProps ): React.JSX.Element {
		const { item, checked, gameVersion, generateOnCheck } = props;

		const classes = [ `checklist-table__row` ];
		if ( checked ) {
			classes.push( `checklist-table__row--checked` );
		}

		return <tr className={ classes.join( ` ` ) } onClick={ generateOnCheck }>
			<td className="checklist-table__cell">
				<div className="checklist-table__check">
					<input type="checkbox" checked={ checked } />
				</div>
			</td>
			{ columns.map( ( column: ColumnType, index: number ) => <td key={ index } className="checklist-table__cell">
				{ column.render( item, gameVersion ) }
			</td> ) }
		</tr>;
	}

	return function CheckList( props: CheckListProps & { gameVersion: GameVersion } ): React.JSX.Element {
		const { checked, gameVersion, generateOnCheck, list } = props;
		const numberChecked = Object.values( checked ).filter( v => v ).length;

		return <div>
			<h2 className="checklist__title">{ toTitleCase( type ) }</h2>
			<table className="checklist-table">
				<thead>
					<tr>
						<th className="checklist-table__cell checklist-table__check-count">
							{ numberChecked } / { list.length }
						</th>
						{ columns.map( ( column: ColumnType, index: number ) => <th
							key={ index }
							className="checklist-table__cell"
						>
							{ column.title }
						</th> ) }
					</tr>
				</thead>
				<tbody>
					{ list.map( ( item, index ) => <CheckListRow
						key={ index }
						item={ item }
						checked={ checked[ index ] }
						gameVersion={ gameVersion }
						generateOnCheck={ generateOnCheck( index ) }
					/> ) }
				</tbody>
			</table>
		</div>;
	};
}

function toTitleCase( str: string ): string {
	return str.charAt( 0 ).toUpperCase() + str.slice( 1 ).toLowerCase();
}

export {
	generateCheckListType,
};

export type {
	CheckListProps,
	CheckListRowProps,
	ColumnType,
};
