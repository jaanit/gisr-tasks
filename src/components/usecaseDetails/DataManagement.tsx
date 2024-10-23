"use client"

import { Button, Text, Card, FileButton, Group, Image, Title, Alert } from "@mantine/core";
import { ArchiveRestore, Download, Upload } from "lucide-react";
import { useState } from "react";
import jsPDF from 'jspdf';
import { Usecase } from "@prisma/client";
import { format, set } from "date-fns";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import { UploadPpt } from "../UploadPpt";
import { IconInfoCircle } from "@tabler/icons-react";

export default function DataManagement({ usecase }: { usecase: any }) {
    const [file, setFile] = useState<File | null>(null);
    const [telechargerAler, setTelechargerAler] = useState(false);
    const [exporterAler, setExporterAler] = useState(false);
    const icon = <IconInfoCircle />;


    const handleDownload = async (file: File | undefined) => {
        if (!file) return
        
        
        try {
            setTelechargerAler(false);
            const data = new FormData()
            data.set('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })
            if (!res.ok) throw new Error(await res.text())
        } catch (e: any) {
            console.log("here....................", file)
            console.error(e)
        }
    }

    const handleTelechargerPpt = async () => {
        const filename = "file.pptx";
        const fileUrl = `/file.pptx`
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                setTelechargerAler(true);
                throw new Error('Network response was not ok');

            }
            const blob = await response.blob();

            const element = document.createElement("a");
            element.href = URL.createObjectURL(blob);
            element.download = filename;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    const handleExporter = async () => {
        setTelechargerAler(false);
        const workbook = XLSX.utils.book_new();
        const sheetName = "API List";
        const worksheet = XLSX.utils.aoa_to_sheet([["Nom de cas d'usage " ,"Nom d'API", "Description", "Date de Creation", "Date Mise en Prod"]]);

        if (!usecase.apis.length) {
            setExporterAler(true);
            return;
        }
        usecase.apis.forEach((item: any, index: any) => {
            const rowData = [
                usecase.nom,
                item.nom,
                item.description,
                format(item.date_creation, "dd-MM-yyyy"),
                item.date_mep ? format(new Date(item.date_mep), "dd-MM-yyyy") : "",
            ];
            XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: -1 });
        });

        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        const today = new Date();
        const filename = `${usecase.nom} ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.xlsx`;

        XLSX.writeFile(workbook, filename);
    }

    return (
        <>
            <Card withBorder shadow="xs" radius={"md"} className="h-[300px] w-full flex flex-col justify-between">
                <div>
                    <Title order={4}> Flux d’échange de données </Title>
                </div>
                <div className="flex justify-center items-center">
                    <Image src="/pp.png" alt="Logo" w={90} h={90} />
                </div>
                <div>
                    <div className="flex justify-between gap-1 w-full">
                        <Button onClick={handleTelechargerPpt} variant="filled" color="blue" leftSection={<Download width={14} />}>
                            <Text fw={700} size="12px">Télécharger PPT</Text>
                        </Button>
                        <FileButton onChange={(file) => handleDownload(file || undefined)} accept=".pptx">
                            {(props) => (
                                <Button variant="filled" color="blue" {...props} leftSection={<ArchiveRestore width={14} />}>
                                    <Text fw={700} size="12px">Injecter PPT</Text>
                                </Button>
                            )}
                        </FileButton>
                    </div>
                    {telechargerAler && <Text variant="filled" color="red" size="xs" ta="center" mt="xs"> Le fichier PowerPoint recherché est introuvable.</Text>}
                </div>
            </Card>
            <Card mt={2} withBorder shadow="xs" radius={"md"} className="h-[300px] w-full flex flex-col">
                <div className="">
                    <Title order={4}> Exporter les informations et les données du cas d’usage </Title>
                </div>
                <div className="flex flex-col justify-end  gap-1 w-full h-full">
                    <div className="">
                        <Group justify="center">
                            <Button variant="filled" color="blue" onClick={handleExporter} leftSection={<Download width={15} />}>
                                Exporter
                            </Button>
                        </Group>
                    </div>
                    {exporterAler && <Text variant="filled" color="red" size="xs" ta="center" > Le cas d'usage  "{usecase.nom.toUpperCase()}" ne dispose actuellement d'aucune API.</Text>}
                </div>
            </Card>
        </>
    );
}

