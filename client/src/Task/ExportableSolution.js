import React, { useRef, useState } from 'react';

import {
	exportComponentAsJPEG,
	exportComponentAsPDF,
	exportComponentAsPNG,
} from 'react-component-export-image';

import Solution from './Solution';

const ExportableSolution = (props) => {
	const componentRef = useRef(null);
	const [disabled, setDisabled] = useState(true);

	const options = {
		fileName: 'solution',
		html2CanvasOptions: {
			unit: 'px',
		},
		pdfOptions: {
			w: 0.4 * componentRef.current?.offsetWidth,
			h: 0.4 * componentRef.current?.offsetHeight,
			unit: 'px',
			pdfFormat: 'a4',
		},
	};

	console.log(componentRef.current);

	return (
		<React.Fragment>
			<Solution
				{...props}
				enableButtons={() => setDisabled(false)}
				ref={componentRef}
			/>

			<button
				disabled={disabled}
				onClick={() => exportComponentAsJPEG(componentRef, options)}>
				Export As JPEG
			</button>
			<button
				disabled={disabled}
				onClick={() => exportComponentAsPDF(componentRef, options)}>
				Export As PDF
			</button>
			<button
				disabled={disabled}
				onClick={() => exportComponentAsPNG(componentRef, options)}>
				Export As PNG
			</button>
		</React.Fragment>
	);
};

export default ExportableSolution;
