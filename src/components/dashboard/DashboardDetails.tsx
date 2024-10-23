"use client";

import { Card, RingProgress, Text, Title } from "@mantine/core";
import '@mantine/charts/styles.css';
import App from "./EvolutionOfTransactionsLinechart";
import LineChart from "./EvolutionOfTransactionsLinechart";
import EvolutionOfTransactionsLinechart from "./EvolutionOfTransactionsLinechart";
import TransactionsByUseLinechart from "./TransactionsByUseLinechart";
import DistributionOfchecksLinechart from "./DistributionOfchecksLinechart";
import AnalyzeTheIncidentByCaseLinechart from "./AnalyzeTheIncidentByCaseLinechart";
import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { readExcelFile } from '../../actions/dashboard/readFileExcel';
import { set } from "date-fns";

function formatNumber(value: number) {
    return value < 10 ? `0${value}` : value == undefined ? '00' : value;
}

export default function DashboardDetails({ data, isImport }: { data: any, isImport: boolean }) {
    const [excelData, setExcelData] = useState<Record<string, any[]> | null>(null);
    const [kpi, setKPI] = useState<any>(null);
    const [DailyTransactions, setDailyTransactions] = useState<any>(null);
    const [TransactionsByUsecase, setTransactionsByUsecase] = useState<any>(null);
    const [ErrorMonthly, setErrorMonthly] = useState<any>(null);
    const [improtFille, setimprotFille] = useState<boolean>(false);


    console.log('DashboardDetails');
    const { usecases, apis, consumer, producer, UsecasesProd, ApiProd, UsecasesUAT, ApiUAT, UsecasesEncours, ApiEncours } = data;
    const uniqueAdministrations = Array.from(new Set(consumer.flatMap((obj: { endpoints: { administration: any; }[]; contacts: { administration: any; }[]; documents: { administration: any; }[]; }) => [
        ...obj.endpoints.map((ep: { administration: any; }) => ep.administration),
        ...obj.contacts.map((contact: { administration: any; }) => contact.administration),
        ...obj.documents.map((doc: { administration: any; }) => doc.administration)
    ])));
    const endpiontStatus = producer.map((p: { endpoints: any[]; }) => p.endpoints.map(e => e.statut));
    const consumerStatus = consumer.map((c: { endpoints: any[]; }) => c.endpoints.map(e => e.statut));

    const { prodProducer, uatProducer } = endpiontStatus.flat().reduce((acc: { prodProducer: number; uatProducer: number; }, status: string) => {
        if (status === 'PROD') acc.prodProducer += 1;
        if (status === 'UAT') acc.uatProducer += 1;
        return acc;
    }, { prodProducer: 0, uatProducer: 0 });

    const { prodConsumer, uatConsumer } = consumerStatus.flat().reduce((acc: { prodConsumer: number; uatConsumer: number; }, status: string) => {
        if (status === 'PROD') acc.prodConsumer += 1;
        if (status === 'UAT') acc.uatConsumer += 1;
        return acc;
    }, { prodConsumer: 0, uatConsumer: 0 });


    useEffect(() => {
        const fetchAndReadFile = async () => {
            try {
                const response = await fetch('/DataVisualisation.xlsx');
                if (!response.ok) {
                    console.log('...... Failed to fetch file');
                    // throw new Error('Failed to fetch file');
                    return;
                }

                setimprotFille(true);

                const fileBlob = await response.blob();
                const file = new File([fileBlob], 'DataVisualisation.xlsx');
                const excelData = await readExcelFile(file);
                setExcelData(excelData);

                // Extracting the KPI Summary values from the excelData and updating state
                const KPISummary = excelData['KPI Summary'];
                const usecase = excelData['CasDUsage Monthly Errors']; // Nombre de transactions

                if (KPISummary && KPISummary.length > 0) {
                    setKPI(KPISummary[0]); // Assuming the first object contains the needed KPI values
                    setDailyTransactions(excelData['Daily Transactions']); // Daily Transactions
                    setTransactionsByUsecase(excelData['CasDUsage Monthly']);
                    setErrorMonthly(excelData['Error Monthly']);

                }
            } catch (e) {
                console.error('Error fetching or reading file:', e);
            }
        };

        fetchAndReadFile();
    }, [isImport]);

    return (
        <>
            <div className="flex flex-col gap-2 w-full ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <Card className="grid grid-rows-2 w-full bg-black" shadow="xs" padding="md" radius="md">
                        <div className="flex flex-row gap-3 p-2 items-center border-b space-x-4">
                            <span className="font-bold text-4xl">{formatNumber(usecases)}</span>
                            <span className="font-bold text-xl">Cas d'usages</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <div className="border-r p-2 flex flex-col space-y-1 items-center justify-center text-[#82CFE9]">
                                <Title fw={700} order={3}>{formatNumber(UsecasesEncours)}</Title>
                                <Text fw={700} size="10px">EN COURS</Text>
                            </div>
                            <div className="border-r p-2 flex flex-col space-y-1 items-center justify-center text-[#4169E1]">
                                <Title fw={700} order={3}>{formatNumber(UsecasesUAT)}</Title>
                                <Text fw={700} size="10px">EN UAT</Text>
                            </div>
                            <div className="p-2 flex flex-col space-y-1 items-center text-[#8a2be2] justify-center">
                                <Title order={3} fw={700}>{formatNumber(UsecasesProd)}</Title>
                                <Text fw={700} size="10px">EN PROD</Text>
                            </div>
                        </div>
                    </Card>

                    <Card className="grid grid-rows-2 w-full bg-rose-200" shadow="xs" padding="md" radius="md">
                        <div className="flex flex-row gap-3 p-2 items-center border-b space-x-6">
                            <span className="font-bold text-4xl">{formatNumber(apis)}</span>
                            <span className="font-bold text-xl">Apis</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <div className="border-r p-2 flex flex-col items-center justify-center space-y-1 text-[#82CFE9]">
                                <Title order={3}>{formatNumber(ApiEncours)}</Title>
                                <Text fw={700} size="10px">EN COURS</Text>
                            </div>
                            <div className="border-r p-2 flex flex-col items-center justify-center space-y-1 text-[#4169E1]">
                                <Title order={3}>{formatNumber(ApiUAT)}</Title>
                                <Text fw={700} size="10px">EN UAT</Text>
                            </div>
                            <div className="p-2 flex flex-col items-center text-[#8a2be2] justify-center space-y-1">
                                <Title order={3}>{formatNumber(ApiProd)}</Title>
                                <Text fw={700} size="10px">EN PROD</Text>
                            </div>
                        </div>
                    </Card>

                    <Card className="grid grid-rows-2 w-full bg-rose-200" variant="filled" color="red" shadow="xs" padding="md" radius="md">
                        <div className="flex flex-row gap-3 p-2 items-center border-b space-x-6 ">
                            <span className="font-bold text-4xl">{formatNumber(apis)}</span>
                            <span className="font-bold text-xl">Producteurs</span>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="p-2 flex flex-col border-r items-center justify-center space-y-1 text-[#4169E1]">
                                <Title order={3}>{formatNumber(uatProducer)}</Title>
                                <Text fw={700} size="10px">EN UAT</Text>
                            </div>
                            <div className="p-2 flex flex-col items-center justify-center space-y-1 text-[#8a2be2]">
                                <Title order={3}>{formatNumber(prodProducer)}</Title>
                                <Text fw={700} size="10px">EN PROD</Text>
                            </div>
                        </div>
                    </Card>

                    <Card className="grid grid-rows-2 w-full" shadow="xs" padding="md" radius="md">
                        <div className="flex flex-row gap-3 p-2 items-center border-b space-x-6">
                            <span className="font-bold text-4xl">{formatNumber(uniqueAdministrations.length)}</span>
                            <span className="font-bold text-xl">Consommateurs</span>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="border-r p-2 flex flex-col items-center justify-center space-y-1 text-[#4169E1]">
                                <Title order={3}>{formatNumber(uatConsumer)}</Title>
                                <Text fw={700} size="10px">EN UAT</Text>
                            </div>
                            <div className="p-2 flex flex-col items-center justify-center space-y-1 text-[#8a2be2]">
                                <Title order={3}>{formatNumber(prodConsumer)}</Title>
                                <Text fw={700} size="10px">EN PROD</Text>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>


            {kpi && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full ">
                <div className="grid grid-rows-2 shadow-md rounded-md">
                    <div className="rounded-md w-full h-full flex flex-col justify-center gap-3 p-2 items-center border-b  bg-blue-500">
                        <span className="font-bold text-5xl text-white ">{formatNumber(kpi['Total Transactions'])}</span>
                        <span className="font-bold text-sm text-white  ">Transactions</span>
                    </div>
                    <div className="grid">
                        <div className="border-r p-2 flex flex-col items-center justify-center space-y-1 text-black ">
                            <span className="">
                                De transactions ont été facilitées par la plateforme entre les producteurs et les consommateurs, du <span className="font-extrabold">1er février 2023 au 31 janvier 2024</span>.
                            </span>

                        </div>
                    </div>
                </div>


                <div className="grid grid-rows-2 shadow-md rounded-md">
                    <div className="rounded-md w-full h-full flex flex-col justify-center gap-3 p-2 items-center border-b  bg-blue-500">
                        <span className="font-bold text-5xl text-white">{(kpi["Erreurs d'authentification ou sur requêtes"] + kpi["Erreurs backend partenaires"]).toFixed(2)}% </span>
                        <span className="font-bold text-sm text-white">Echecs dus à des problèmes côtés partenaires</span>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="border-r p-2 flex flex-col items-center justify-center space-y-1 text-black">

                            <span
                                className=" leading-2 text-[12px]">
                                Des échecs sont dus à des problèmes côté <span className="font-extrabold">partenaires</span>.
                            </span>
                        </div>
                        <div className="border-r  flex flex-col items-center justify-center space-y-1">
                            <Title order={1}> + {kpi["Erreurs backend partenaires"].toFixed(2)}</Title>
                        </div>
                        <div className="p-2 flex flex-col items-center justify-center space-y-1">
                            <Title order={1}>{kpi["Erreurs d'authentification ou sur requêtes"].toFixed(2)}%</Title>
                        </div>
                    </div>
                </div>

                <div className="grid grid-rows-2 shadow-md rounded-md">
                    <div className="rounded-md w-full h-full flex flex-col justify-center gap-3 p-2 items-center border-b  bg-blue-500">
                        <span className="font-bold text-5xl text-white">{kpi["Taux d'échec"].toFixed(2)} %</span>
                        <span className="font-bold text-sm text-white">Taux d’échec</span>
                    </div>
                    <div className="">
                        <div className="flex justify-center w-full p-2 flex flex-row items-center gap-1 space-y-1 text-[#82CFE9]">
                            <RingProgress size={80} thickness={16}  sections={[{ value: kpi["Taux d'échec"].toFixed(2), color: 'blue' }]} rootColor="gray" />
                            <div className="space-y-3">
                                <div className="h-3 w-3 bg-blue-500"></div>
                                <div className="h-3 w-3 bg-gray-500"></div>
                            </div>
                            <div className="space-y-3 text-black">
                                <h6 className="text-[9px]">Le taux de succès annuel: { 100 - kpi["Taux d'échec"].toFixed(2)}%</h6>
                                <h6 className="text-[9px]">Le taux d’échecs annuel: {kpi["Taux d'échec"].toFixed(2)}%</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
            {excelData && (

                <><div className="p-4">
                    <h5 className="text-blue-500 font-bold">Evolution des transactions :</h5>
                    <div id="evolution-chart">
                        <EvolutionOfTransactionsLinechart DailyTransactions={DailyTransactions} />
                    </div>
                </div>
                    <div className="p-4">
                        <h5 className="text-blue-500 font-bold">Evolution des transactions par cas d’usage:</h5>
                        <div id="transactions-by-use-chart">
                            <TransactionsByUseLinechart TransactionsByUsecase={TransactionsByUsecase} />
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <h5 className="text-blue-500 font-bold">Répartition des échecs: </h5>
                            <div id="distribution-of-checks-chart">
                                <DistributionOfchecksLinechart ErrorMonthly={ErrorMonthly} />
                            </div>
                        </div>
                        {/* <div className="w-1/2 self-end">
                            <h5 className="text-blue-500 font-bold">Analyse des incident par cas d’usage :</h5>
                            <div id="analyze-incident-chart">
                                <AnalyzeTheIncidentByCaseLinechart />
                            </div>
                        </div> */}
                    </div>

                </>
            )}

            {!excelData &&
                <div className="flex flex-col justify-center items-center h-64 space-y-4 font-bold">
                    <p className="text-blue-500">Veuillez importer des données d’exploitation pour afficher les graphiques.</p>
                    <img src="/chartdynamic.png" alt="Not found" />
                </div>
            }
        </>
    );
}
