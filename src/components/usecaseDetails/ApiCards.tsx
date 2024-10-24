
import { ApiSchema, UsecaseSchema } from "@/schema/schema";
import { Badge, rem, Button, Card, Menu, Text } from "@mantine/core";
import { IconExternalLink } from '@tabler/icons-react';
import { usePathname } from "next/navigation";

import Link from "next/link";
import { z } from "zod";
import { format } from "date-fns";
import { Api } from "@prisma/client";
import { Pencil, Ellipsis } from "lucide-react";
import { useState } from "react";
import ModifyApi from "./ModifyApi";
import { prisma } from "@/helpers/helpers";

export default async function ApiCards({ api, id }: { api: Api, id: string }) {


  return (
    <>
      <Link href={id + "/" + api.id} className="">
        <Card withBorder shadow="xs" p={"lg"} radius={"md"} className="gap-2 hover:!bg-violet-600 transition-all hover:!text-white group  min-h-[220px] max-h-[220px] flex flex-col justify-center w-full">
          <div className="ml-auto">
            <ModifyApi api={api} />
          </div>
          <h2 className="uppercase font-bold text-lg tracking-tight">{api.nom}</h2>
          <div className="flex items-center space-x-2">
            <Badge className="group-hover:bg-white group-hover:text-black" color={api.statut === 'PROD' ? "#8a2be2" : api.statut === 'UAT' ? "#4169E1" : "#82CFE9"} size="md">
              {api.statut}
            </Badge>
          </div>
          <div className="text-sm ">
            <Text lineClamp={2} size="sm" className="!text-gray-500 group-hover:!text-white">
              {api.description}
            </Text>
          </div>
          <div className="flex text-[12px] justify-between ">
            <div className="space-y-2 ">
              <div className="space-x-1">
                <span className="font-semibold underline text-gray-500 group-hover:text-white">Prodcteur:  </span>
                <span className={``}>
                  {api.producteur.substring(0, 10)}
                  {api.producteur.length > 10 && '...'}
                </span>
              </div>
              <div className="space-x-1">
                <span className="font-semibold underline text-gray-500 group-hover:text-white">Date creation:</span>
                <span>{api.date_creation ? format(api.date_creation, "dd-MM-yyyy") : null}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="space-x-2">
                <span className="font-semibold underline text-gray-500 group-hover:text-white">Date UAT:</span>
                <span>{api.date_uat ? format(api.date_uat, "dd-MM-yyyy") : null}</span>
              </div>
              <div className="space-x-1">
                <span className="font-semibold underline text-gray-500 group-hover:text-white">Date Prod:</span>
                <span>{api.date_prod ? format(api.date_prod, "dd-MM-yyyy") : null}</span>
              </div></div>
          </div>
        </Card>
      </Link>
    </>
  );
}
