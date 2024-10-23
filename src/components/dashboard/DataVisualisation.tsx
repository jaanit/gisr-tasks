"use client";
import React, { useState } from 'react';
import ImortAndExportData from './ImortAndExportData';
import DashboardDetails from './DashboardDetails';

function DataVisualisation  ({ data}: { data: any}) {
  // Shared boolean state
  const [isImport, setIsImport] = useState(false);

  return (
    <div className="m-2 flex flex-col gap-8">
      <div className="">
        <ImortAndExportData isImport={isImport} setIsImport={setIsImport} />
      </div>
      <div className="flex justify-center items-center">
          <div className="flex gap-5 flex-col">
          <DashboardDetails data={data} isImport={isImport} />
        </div>
      </div>
    </div>
  );
}

export default DataVisualisation  ;
