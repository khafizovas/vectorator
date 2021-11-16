import React, { useRef, useState, useCallback } from 'react';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import ExportMenu from './ExportMenu';
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
			orientation: 'l',
			format: 'a4',
		});
		const imgProperties = pdf.getImageProperties(data);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

		pdf.addImage(data, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
		pdf.save('solution.pdf');
	};

	return (
		<>
			<Solution {...props} enableButtons={enableButtons} ref={exportRef} />

			{allowExport && (
				<ExportMenu
					downloadPdf={handleDownloadPdf}
					downloadPng={handleDownloadPng}
					downloadJpeg={handleDownloadJpeg}
				/>
			)}
		</>
	);
};

export default ExportableSolution;
