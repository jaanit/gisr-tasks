"use client";

import { UsecaseSchema } from "@/schema/schema";
import { Badge, Card, Text, Title } from "@mantine/core";
import Link from "next/link";
import { z } from "zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import ModifyUsecase from "./ModifyUsecase";
import { Usecase } from "@prisma/client";
import { useEffect } from "react";
import { updateUsecaseStatut } from "@/actions/updateUsecaseStatut";
export default function UsecaseDetails({ u, tags }: { u: Usecase, tags: any}) {


    useEffect(() => {
        const updateStatut = async () => {
            await updateUsecaseStatut(u, tags.statut);
        };
        updateStatut();
    }, [tags.statut, u]);

return (
    <>
        <Card withBorder shadow="xs" radius={"md"} className="group hover:!bg-violet-600 transition-all hover:!text-white min-h-[200px] flex flex-col justify-center w-[100%]">
            <div className="ml-auto flex flex-row items-center gap-1">
                <Badge className="ml-auto group-hover:bg-white group-hover:text-black" color={u.statut === 'PROD' ? "#8a2be2" : u.statut === 'UAT' ? "#4169E1" : "#82CFE9"} size="md">
                    {u.statut}
                </Badge>
                <ModifyUsecase u={u} />
            </div>
            <div className="text-sm ">
                <Title order={4}  >DESCRIPTION</Title>
                <Text mt={'6'} size="sm" className="!text-gray-500 group-hover:!text-white">
                    {u.description}
                </Text>
            </div>
            <div className="mt-5 flex items-center space-x-2">
                <Badge variant="outline" className="group-hover:!border-white group-hover:!text-white" bg="gray" color={"white"}>
                    {tags.api} APIs
                </Badge>
                <Badge variant="outline" className="group-hover:!border-white group-hover:!text-white" bg="gray" color={"white"}>
                    {tags.producteurs} Producteurs
                </Badge>
            </div>
            <div className="flex space-x-3 text-[12px] my-2 ml-1 gap-4">
                <div className="space-x-2">
                    <span className="font-semibold underline text-gray-500 group-hover:text-white">Date creation:</span>
                    <span>{u.date_creation !== null ? format(u.date_creation, "dd-MM-yyyy") : "-"}</span>
                </div>
                <div className="space-x-2">
                    <span className="font-semibold underline text-gray-500 group-hover:text-white">Date MEP:</span>
                    <span>{u.date_mep !== null ? format(u.date_mep, "dd-MM-yyyy") : "-"}</span>
                </div>
            </div>
        </Card>
    </>
);
};