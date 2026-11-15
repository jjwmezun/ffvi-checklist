interface MeterSectionProps {
	checked: number;
	title: string;
	total: number;
}

function MeterSection( props: MeterSectionProps ) {
	const { checked, title, total } = props;

	return <div className="dialog-sect">
		<div>{ title } – { checked } / { total } ( { ( checked / total * 100 ).toFixed( 0 ) }% )</div>
		<div className="meter">
			<div
				className={ `meter__fill${ checked === total ? ` meter__fill--full` : `` }` }
				style={ { width: `${ ( checked / total ) * 100 }%` } }
			/>
		</div>
	</div>;
}

export default MeterSection;
