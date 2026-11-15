import {
	CheckData,
	GameVersion,
	TreasureAreaData,
	TreasureData,
	TreasureItemData,
	TreasureItemDataFlattened,
} from '../common/types';

interface TreasureProps {
	checked: CheckData,
	gameVersion: GameVersion,
	generateOnCheck: ( sectionIndex: number ) => ( areaIndex: number ) => ( itemIndex: number ) => () => void,
	data: TreasureData[];
}

interface TreasureSectionProps {
	checked: boolean[][];
	generateOnCheck: ( areaIndex: number ) => ( itemIndex: number ) => () => void,
	data: TreasureData;
	gameVersion: GameVersion;
}

interface TreasureAreaProps {
	checked: boolean[];
	generateOnCheck: ( itemIndex: number ) => () => void,
	data: TreasureAreaData;
	gameVersion: GameVersion;
}

interface TreasureRowProp {
	checked: boolean;
	gameVersion: GameVersion;
	generateOnCheck: () => void,
	data: TreasureItemData;
}

function TreasureRow( props: TreasureRowProp ) {
	const { checked, data, gameVersion, generateOnCheck } = props;
	const { location, names, missable, type } = data;

	const classes = `checklist-table__row${ checked ? ` checklist-table__row--checked` : `` }`;

	return <tr className={ classes }>
		<td className="checklist-table__cell">
			<div className="checklist-table__check">
				<input
					type="checkbox"
					checked={ checked }
					onChange={ generateOnCheck }
				/>
			</div>
		</td>
		<td className="checklist-table__cell">{ names[ gameVersion ] }</td>
		<td className="checklist-table__cell">{ type }</td>
		<td className="checklist-table__cell">{ location }</td>
		<td className={ `checklist-table__cell ${ missable ? `no` : `yes` }` }>
			{ missable ? `Yes` : `No` }
		</td>
	</tr>;
}

function TreasureArea( props: TreasureAreaProps ) {
	const { checked, data, gameVersion, generateOnCheck } = props;
	const { items, title } = data;

	const checkedCount = checked.filter( v => v ).length;

	return ( data.in[ gameVersion ] )
		? <div className="checklist-section">
			<h4 className="checklist-section__title">{ title }</h4>
			<table className="checklist-table checklist-table--left">
				<thead>
					<tr>
						<th className="checklist-table__cell">{ checkedCount } / { items.length }</th>
						<th className="checklist-table__cell">Name</th>
						<th className="checklist-table__cell">Type</th>
						<th className="checklist-table__cell">Location</th>
						<th className="checklist-table__cell">Missable</th>
					</tr>
				</thead>
				<tbody>
					{ items.map( ( _item, index ) => <TreasureRow
						key={ index }
						checked={ checked[ index ] }
						gameVersion={ gameVersion }
						generateOnCheck={ generateOnCheck( index ) }
						data={ items[ index ] }
					/> ) }
				</tbody>
			</table>
		</div>
		: <></>;
}

function TreasureSection( props: TreasureSectionProps ) {
	const { data, checked, gameVersion, generateOnCheck } = props;
	const { title } = data;

	const flatChecked = checked.flat();
	const checkedCount = flatChecked.filter( v => v ).length;

	return <div>
		<h3 className="treasure-section__title">{ title } { checkedCount } / { flatChecked.length }</h3>
		{ data.areas.map( ( area, index ) => <TreasureArea
			key={ area.title }
			checked={ checked[ index ] }
			gameVersion={ gameVersion }
			generateOnCheck={ generateOnCheck( index ) }
			data={ area }
		/> ) }
	</div>;
}

function Treasure( props: TreasureProps ) {
	const { checked, data, gameVersion, generateOnCheck } = props;

	const flatTreasure : TreasureItemDataFlattened[] = data.flatMap( section => section.areas )
		.flatMap( area => area.items.map( item => ( { ...item, in: area.in } ) ) );
	const flatChecked =checked.treasure.flat( 2 ).filter( ( _v, index ) => flatTreasure[ index ].in[ gameVersion ] );
	const checkedCount = flatChecked.filter( v => v ).length;

	/* eslint-disable max-len */
	return <div className="treasure">
		<h2 className="checklist__title">Treasure</h2>
		<div className="checklist__count">{ checkedCount } / { flatChecked.length }</div>
		<div className="treasure-desc">Info based heavily on the treasure FAQ by Corundum & the edited-for-GBA version by Lufia_Maxim @ <a href="https://gamefaqs.gamespot.com/iphone/734974-final-fantasy-vi/faqs/40362">https://gamefaqs.gamespot.com/iphone/734974-final-fantasy-vi/faqs/40362</a> & <a href="https://gamefaqs.gamespot.com/iphone/734974-final-fantasy-vi/faqs/47026">https://gamefaqs.gamespot.com/iphone/734974-final-fantasy-vi/faqs/47026</a>, respectively.</div>
		{ data.map( ( section, index ) => <TreasureSection
			key={ section.title }
			checked={ checked.treasure[ index ] }
			gameVersion={ gameVersion }
			generateOnCheck={ generateOnCheck( index ) }
			data={ section }
		/> ) }
	</div>;

	/* eslint-enable max-len */
}

export default Treasure;
