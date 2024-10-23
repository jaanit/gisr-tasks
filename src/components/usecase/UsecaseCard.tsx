import { UsecaseSchema } from "@/schema/schema";
import { Badge, Card, Text } from "@mantine/core";
import Link from "next/link";
import { z } from "zod";
import { format } from "date-fns";
import { Usecase } from "@prisma/client";
import { prisma } from "@/helpers/helpers";

export default async function UsecaseCard({ u }: { u: Usecase }) {

  const apis = await prisma.api.findMany({
    where: {
      usecaseId: u.id,
    },
  });

  return (
    <>
      <Link href={"/usecases/" + u.id} className="">
        <Card withBorder shadow="sm" p={"lg"} radius={"md"} className="hover:!bg-violet-600 transition-all hover:!text-white group h-[200px]  flex flex-col justify-center w-full">
          <div className="ml-auto flex flex-row items-center gap-1">
            <Badge className="ml-auto group-hover:bg-white group-hover:text-black" color={u.statut === 'PROD' ? "#8a2be2" : u.statut === 'UAT' ? "#4169E1" : "#82CFE9"} size="md">
              {u.statut}
            </Badge>
          </div>
          <h2 className="uppercase font-bold text-lg tracking-tight">{u.nom}</h2>
          <div className="flex  justify-between text-xs mt-1">
            <div className="space-x-2">
              <span className="font-semibold underline text-gray-500 group-hover:text-white">Date creation:</span>
              <span>{u.date_creation !== null ? format(u.date_creation, "dd-MM-yyyy") : "-"}</span>
            </div>
            <div className="space-x-2">
              <span className="font-semibold underline text-gray-500 group-hover:text-white">Date MEP:</span>
              <span>{u.date_mep !== null ? format(u.date_mep, "dd-MM-yyyy") : "-"}</span>
            </div>
          </div>
          <div className="text-sm !mt-5">
            <Text lineClamp={2} size="sm" className="!text-gray-500 group-hover:!text-white">
              {u.description}
            </Text>
          </div>
          <div className="mt-5 flex items-center space-x-2">
            <Badge variant="outline" className="group-hover:!border-white group-hover:!text-white" color={"blue"}>
             Producteurs
            </Badge>
          </div>
        </Card>
      </Link>
    </>
  );
}
