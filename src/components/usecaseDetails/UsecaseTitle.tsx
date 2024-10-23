"use client";

import { UsecaseSchema } from "@/schema/schema";
import { Anchor, Breadcrumbs, Select, Title } from "@mantine/core";
import { Usecase } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";


export default function UseCaseTitle({ usecases, nom }: { usecases: any, nom: any }) {

    const history = useRouter();
    const items = [
        { title: 'cas d usage', href: '/usecases', text: 'Cas d\'usage', },
        { title: 'api', href: '#', text: 'APIs' },
    ].map((item, index) => (
        <Link href={item.href} key={index} className={`text-bold text-sm font-mono font-semibold ${index === 1 ? 'text-blue-500' : 'text-gray-600'
            }`}
        >
            <span>{item.text}</span>
        </Link>
    ));

    return (
        <>
            <div className="flex flex-col mb-2 px-2">
                <div className="flex items-center gap-2 ">
                    <Title order={3} className="mb-2 font-bold underline">Cas d'usage:</Title>
                    <Select className="mb-3 " w={225} h={45} size="md" my={4} data={usecases.map((u: { nom: string | null }) => u.nom)} defaultValue={usecases.find((u: { nom: string | null }) => u.nom === nom)?.nom}
                        onChange={(value) => {
                            history.push('/usecases/' + usecases.find((u: { nom: string | null }) => u.nom === value)?.id)
                        }}
                    />
                </div>
                <div className="">
                    <Breadcrumbs separator="//////" separatorMargin={5} >
                        {items}
                    </Breadcrumbs>
                </div>

            </div>
        </>
    );
}