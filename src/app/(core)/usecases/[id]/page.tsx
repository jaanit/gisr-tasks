"use server";

import UsecaseDetails from "@/components/usecase/UsecaseDetails";
import { prisma } from "@/helpers/helpers";
import AddApi from "@/components/usecaseDetails/AddApi";
import ApiCards from "@/components/usecaseDetails/ApiCards";
import ApiPagination from "@/components/usecaseDetails/ApiPagination";
import Titled from "@/components/usecaseDetails/Titled";
import { Title } from "@mantine/core";
import Filtre from "@/components/usecaseDetails/Filtre";
import { ModalsProvider } from "@mantine/modals";

export default async function UsecasesDetail(props: any) {
    const cardTags = {
        api: 0,
        statut: "",
        consommateur: [],
        producteur: new Set(),
    }

    const page = props.searchParams.page ? parseInt(props.searchParams.page) : 1;
    const filter = props.searchParams.filter ? props.searchParams.filter : "ALL";
    const uscaseApis = await prisma.api.findMany({
        where: {
            usecaseId: props.params.id,
        },
    });
    const usecases = await prisma.usecase.findMany({
        include: {
            apis: {
                where: {
                    statut: filter !== 'ALL' ? filter : undefined,
                },
                skip: (page - 1) * 5,
                take: 5,
                orderBy: {
                    date_creation: 'desc',
                },
            },
        },
    });
    const usecase = usecases.find(usecase => usecase.id === props.params.id);
    if (!usecase || !usecases) {
        return (
            <div className="m-2 flex flex-col gap-8">
                <div>
                    <Title order={2}>404 Page Not Found</Title>
                </div>
            </div>
        );
    }

    cardTags.api = uscaseApis.length;
    uscaseApis.forEach(u => {
        cardTags.producteur.add(u.producteur);
    });

    cardTags.statut = uscaseApis.length > 0 ? (uscaseApis.every(u => u.statut === "PROD") ? "PROD" : (uscaseApis.some(u => u.statut === "EN COURS") ? "EN COURS" : "UAT")) : "EN COURS";



    return (
        <>
            <ModalsProvider>
                <div className="container mx-auto p-4 mt-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
                    <header className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm">
                        <Titled usecases={usecases} nom={usecase.nom} />
                        <Filtre filter={filter} id={props.params.id} />
                    </header>

                    <main className="space-y-4">
                        <section id="section-1" className="p-4 bg-white rounded-lg shadow-sm">
                            <UsecaseDetails u={usecase} tags={cardTags} />
                        </section>

                        <section id="section-2" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <AddApi id={props.params.id} />
                            {usecase.apis.map((u: any) => (
                                <ApiCards key={u.id} api={u} id={props.params.id} />
                            ))}
                        </section>

                        {uscaseApis.length > 5 && (
                            <div className="flex justify-center">
                                <ApiPagination
                                    current={page}
                                    total={Math.ceil(uscaseApis.length / 5)}
                                    id={props.params.id}
                                    filter={filter}
                                />
                            </div>
                        )}
                    </main>
                </div>
            </ModalsProvider>
        </>

    );
}
