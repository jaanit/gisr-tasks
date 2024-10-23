// "use client";

// import { Button, Card, RingProgress, Text, Title } from "@mantine/core";
// import '@mantine/charts/styles.css';
// import { useRef } from "react";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import EvolutionOfTransactionsLinechart from "./EvolutionOfTransactionsLinechart";
// import TransactionsByUseLinechart from "./TransactionsByUseLinechart";
// import DistributionOfchecksLinechart from "./DistributionOfchecksLinechart";
// import AnalyzeTheIncidentByCaseLinechart from "./AnalyzeTheIncidentByCaseLinechart";

// export default function DashboardLineCharts() {

//   // Refs for the charts
//   const evolutionRef = useRef<HTMLDivElement>(null);
//   const transactionsByUseRef = useRef<HTMLDivElement>(null);
//   const distributionOfChecksRef = useRef<HTMLDivElement>(null);
//   const analyzeByCaseRef = useRef<HTMLDivElement>(null);

//   const handleExportToPDF = async () => {
//     const doc = new jsPDF();
    
//     const captureElement = async (element: HTMLDivElement | null, title: string) => {
//       if (element) {
//         const canvas = await html2canvas(element);
//         const imgData = canvas.toDataURL('image/png');
//         doc.addImage(imgData, 'PNG', 10, 10, 180, 160); // Adjust dimensions and position as needed
//         doc.addPage();
//         doc.text(title, 10, 10);
//       }
//     };

//     // Capture each chart and add to PDF
//     await captureElement(evolutionRef.current, 'Evolution des transactions');
//     await captureElement(transactionsByUseRef.current, 'Evolution des transactions par cas d’usage');
//     await captureElement(distributionOfChecksRef.current, 'Répartition des échecs');
//     await captureElement(analyzeByCaseRef.current, 'Analyse des incidents par cas d’usage');
    
//     // Remove the last page (optional, if you don't need a blank page at the end)
//     // doc.deletePage(doc.internal.getNumberOfPages());

//     doc.save('DashboardDetails.pdf');
//   };

//   return (
//     <>
//       <div className="flex flex-col gap-2 w-full ">
//         {/* Your card components here */}
//       </div>

//       <div className="p-4">
//         <h5 className="text-blue-500 font-bold">Evolution des transactions :</h5>
//         <div ref={evolutionRef}>
//           <EvolutionOfTransactionsLinechart />
//         </div>
//       </div>
//       <div className="p-4">
//         <h5 className="text-blue-500 font-bold">Evolution des transactions par cas d’usage:</h5>
//         <div ref={transactionsByUseRef}>
//           <TransactionsByUseLinechart />
//         </div>
//       </div>
//       <div className="flex flex-col items-start">
//         <div className="w-1/2 self-start">
//           <h5 className="text-blue-500 font-bold">Répartition des échecs: </h5>
//           <div ref={distributionOfChecksRef}>
//             <DistributionOfchecksLinechart />
//           </div>
//         </div>
//         <div className="w-1/2 self-end">
//           <h5 className="text-blue-500 font-bold">Analyse des incidents par cas d’usage :</h5>
//           <div ref={analyzeByCaseRef}>
//             <AnalyzeTheIncidentByCaseLinechart />
//           </div>
//         </div>
//       </div>

//       <Button variant="filled" color="rgba(89, 83, 83, 0.42)" onClick={handleExportToPDF}>
//         Importer les récentes données d’exploitation
//       </Button>
//     </>
//   );
// }
