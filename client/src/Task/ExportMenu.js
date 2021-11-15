import React from 'react';

const ExportMenu = (props) => {
	return (
		<React.Fragment>
			<button onClick={props.downloadPdf}>Export As PDF</button>
			<button onClick={props.downloadPng}>Export As PNG</button>
			<button onClick={props.downloadJpeg}>Export As JPEG</button>
		</React.Fragment>
	);
};

export default ExportMenu;
