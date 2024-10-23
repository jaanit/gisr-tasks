// utils/readExcel.ts

import * as XLSX from 'xlsx';

export const readExcelFile = async (file: File): Promise<Record<string, any[]>> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const allSheetsData: Record<string, any[]> = {};
            
            workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                allSheetsData[sheetName] = jsonData;
            });

            resolve(allSheetsData);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};
