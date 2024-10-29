"use server";

import AddUsecase from "@/components/usecase/AddUsecase";
import UsecaseCard from "@/components/usecase/UsecaseCard";
import UsecasePagination from "@/components/usecase/UsecasePagination";
import Filtre from "@/components/usecaseDetails/Filtre";
import { prisma } from "@/helpers/helpers";
import { ModalsProvider } from "@mantine/modals";
import { Filter } from "lucide-react";
import Image from "next/image";


export default async function Usecases({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;


  const filter = searchParams.filter ? searchParams.filter : "ALL";
  const usecases = await prisma.usecase.findMany({
    where: {
      statut: filter !== "ALL" ? filter : undefined,
    },
    skip: (page - 1) * 9,
    take: 9,
    orderBy: {
      date_creation: "desc",
    },
  });
  const totalCount = await prisma.usecase.count();

  return (
    <>
      <ModalsProvider>
        <div className="p-2 mx-2 no-scrollbar flex items-center justify-between flex-col md:flex-row">
          <h1 className="text-2xl font-bold undrline">List of usecases</h1>
        
          <div className="mx-2 flex items-center">
          <Filtre filter={filter} id={""} />
          <AddUsecase />
          
        </div>

        </div>
       
        {usecases.length > 0 ? (
          <div className="p-2 grid md:grid-cols-2 xl:grid-cols-3 gap-2">
            {usecases.map((u: any) => (
              <UsecaseCard key={u.id} u={u} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <img src="/not_found.png" alt="Not found" />
          </div>
        )}

        {totalCount > 9 ? (
          <UsecasePagination current={page} total={Math.ceil(totalCount / 9)} />
        ) : (
          ""
        )}
      </ModalsProvider>
    </>
  );
}
