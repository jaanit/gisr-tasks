import AddUsecase from "@/components/usecase/AddUsecase";
import UsecaseCard from "@/components/usecase/UsecaseCard";
import UsecasePagination from "@/components/usecase/UsecasePagination";
import Filtre from "@/components/usecaseDetails/Filtre";
import { prisma } from "@/helpers/helpers";
import { Filter } from "lucide-react";


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
      <div className="p-2 mx-2 no-scrollbar flex items-center justify-between flex-col md:flex-row">
        <h1 className="text-2xl font-bold undrline">Liste des cas d'usages</h1>
        <AddUsecase />
      </div>
      <div className="mx-2">
        <Filtre filter={filter} id={""} />
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
    </>
  );  
}
