import MeterSection from "./MeterSection";

interface DialogBoxProps {
	checked: number;
	title: string;
	total: number;
}

function DialogBox( props: DialogBoxProps ) {
	const { checked, title, total } = props;

	return <div className="dialog-box">
		<MeterSection
			checked={ checked }
			title={ title }
			total={ total }
		/>
	</div>;
}

export default DialogBox;
