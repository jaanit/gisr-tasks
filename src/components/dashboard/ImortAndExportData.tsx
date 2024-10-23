"use client";

import { Button, FileButton, Text, Title } from "@mantine/core";
import { ArchiveRestore, Download } from "lucide-react";
import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { readExcelFile } from '../../actions/dashboard/readFileExcel';
import { revalidatePath } from "next/cache";
import { set } from "date-fns";

export default function ImportAndExportData({ isImport, setIsImport }: { isImport: boolean, setIsImport: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [file, setFile] = useState<File | null>(null);
    const [excelData, setExcelData] = useState<Record<string, any[]> | null>(null);

    const handleExporter = async () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        const charts = [
            { id: 'evolution-chart', title: 'Evolution des transactions' },
            { id: 'transactions-by-use-chart', title: 'Evolution des transactions par cas d’usage' },
            { id: 'distribution-of-checks-chart', title: 'Répartition des échecs' },
            { id: 'analyze-incident-chart', title: 'Analyse des incidents par cas d’usage' }
        ];

        const chartWidth = pageWidth - 20;
        const chartHeight = (pageHeight - 40) / 2;
        const verticalSpacing = 20;
        const topMargin = 10;

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 102, 255);

        for (let i = 0; i < charts.length; i += 2) {
            if (i > 0) doc.addPage();

            for (let j = 0; j < 2; j++) {
                const index = i + j;
                if (index >= charts.length) break;

                const { id, title } = charts[index];
                const element = document.getElementById(id);

                if (element) {
                    const yOffsetTitle = topMargin + (j * (chartHeight + verticalSpacing));
                    doc.text(title, 10, yOffsetTitle);
                    doc.setFontSize(12);

                    const canvas = await html2canvas(element);
                    const imgData = canvas.toDataURL('image/png');
                    const xOffset = 10;
                    const yOffsetChart = yOffsetTitle + 10;

                    doc.addImage(imgData, 'PNG', xOffset, yOffsetChart, chartWidth, chartHeight);
                } else {
                    console.warn(`Element with ID "${id}" not found.`);
                }
            }
        }

        doc.save('DashboardDetails.pdf');
    };

    const handleSubmit = async (file: File | undefined) => {
        if (!file) return


        try {
            const data = new FormData()
            data.set('file', file)

            const res = await fetch('/api/upload/import', {
                method: 'POST',
                body: data
            })
            setIsImport(true)
            if (!res.ok) throw new Error(await res.text())
        } catch (e: any) {
            setIsImport(false)
            console.log("here..DataVisualisation  ", file)
            console.error(e)
        }
    }

    return (
        <>
            <div className='flex md:justify-between items-center gap-2 flex-col md:flex-row'>
                <div>
                    <Title order={2}>
                        Tableaux de bord
                    </Title>
                </div>
                <div className='flex gap-2 flex-col md:flex-row items-center'>
                    <FileButton onChange={(file) => handleSubmit(file || undefined)} accept=".xlsx, .xls">
                        {(props) => (
                            <Button  {...props} variant="filled"
                                color="rgba(89, 83, 83, 0.42)"
                                leftSection={<Download width={14} />}>
                                <Text fw={700} size="12px">Importer les récentes données d’exploitation I</Text>
                            </Button>
                        )}
                    </FileButton>

                    {file && (
                        <Text>
                            Picked file: {file.name}
                        </Text>
                    )}
                    <Button
                        variant="filled"
                        color="blue"
                        onClick={handleExporter}
                        leftSection={<ArchiveRestore width={14} />}
                    >
                        Exporter le tableau de bord
                    </Button>
                </div>
            </div>

        </>
    );
}
