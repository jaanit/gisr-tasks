// components/ExcelForm.tsx

import React, { useState } from 'react';
import { readExcelFile } from '../../actions/dashboard/readFileExcel';

const ExcelForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState<Record<string, any[]> | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            try {
                const excelData = await readExcelFile(file);
                setData(excelData);
                console.log('Excel Data:', excelData);
            } catch (error) {
                console.error('Error reading Excel file:', error);
            }
        }
    };

    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="excelFile">Upload Excel File:</label>
                    <input
                        type="file"
                        id="excelFile"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {data && (
                <div>
                    <h3>Data Preview:</h3>
                    {Object.keys(data).map(sheetName => (
                        <div key={sheetName}>
                            <h4>Sheet: {sheetName}</h4>
                            <pre>{JSON.stringify(data[sheetName], null, 2)}</pre>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
};

export default ExcelForm;
