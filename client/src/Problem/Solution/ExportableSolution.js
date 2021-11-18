import React, { useRef, useState, useCallback, Fragment } from 'react';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import SolutionExportMenu from './SolutionExportMenu';
import Solution from './Solution';

const ExportableSolution = (props) => {
	const exportRef = useRef(null);

	const [allowExport, setAllowExport] = useState(false);

	const enableButtons = useCallback(() => {
		setAllowExport(true);
	}, []);

	const handleDownloadPng = async () => {
		await handleDownloadImage('png');
	};

	const handleDownloadJpeg = async () => {
		await handleDownloadImage('jpg');
	};

	const handleDownloadImage = async (format) => {
		const element = exportRef.current;
		const canvas = await html2canvas(element);

		const data = canvas.toDataURL(`solution/${format}`);
		const link = document.createElement('a');

		if (typeof link.download === 'string') {
			link.href = data;
			link.download = `solution.${format}`;

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			window.open(data);
		}
	};

	const handleDownloadPdf = async () => {
		const element = exportRef.current;

		const canvas = await html2canvas(element);
		const data = canvas.toDataURL('image/png');

		const pdf = new jsPDF({
			orientation: 'p',
			format: 'a4',
		});
		const imgProperties = pdf.getImageProperties(data);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

		pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
		pdf.save('solution.pdf');
	};

	return (
		<Container>
			<Solution {...props} enableButtons={enableButtons} ref={exportRef} />

			{allowExport && (
				<Fragment>
					<br />
					<Card md='auto'>
						<Card.Header>Загрузить решение</Card.Header>
						<Card.Body>
							<SolutionExportMenu
								downloadPdf={handleDownloadPdf}
								downloadPng={handleDownloadPng}
								downloadJpeg={handleDownloadJpeg}
							/>
						</Card.Body>
					</Card>
				</Fragment>
			)}
		</Container>
	);
};

export default ExportableSolution;
