"use client";

import { UsecaseSchema } from "@/schema/schema";
import { Anchor, Breadcrumbs, Select, Title } from "@mantine/core";
import { Usecase } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";


export default function Titled({ usecases, nom }: { usecases: any, nom: any }) {

    const history = useRouter();
    const items = [
        { title: 'List  cas d usages', href: '/usecases', text: ' Liste Des Cas d\'usage', },
        { title: 'api', href: '#', text: nom },
    ].map((item, index) => (
        <Link href={item.href} key={index} className={`text-bold text-sm font-mono font-semibold ${index === 1 ? 'text-blue-500' : 'text-gray-600'
            }`}
        >
            <span>{item.text}</span>
        </Link>
    ));

    return (
        <>
            <div className="flex flex-col  p-2 gap-3">
                <div className="flex items-center gap-2 ">
                    {/* <Title order={3} className=" font-bold underline">Cas d'usage 1111:</Title> */}
                    <Select
                        // className="text-white"
                        // variant="transparent"
                        // // radius={4}
                        // style={{ backgroundColor: '#7C3AED', color: 'white',  borderRadius: '5px'}}
                        size="lg"
                        data={usecases.map((u: { nom: string | null }) => u.nom)}
                        defaultValue={usecases.find((u: { nom: string | null }) => u.nom === nom)?.nom}
                        onChange={(value) => {
                            history.push('/usecases/' + usecases.find((u: { nom: string | null }) => u.nom === value)?.id)
                        }}
                    />


                </div>
                <div className="">
                    <Breadcrumbs separator="/" separatorMargin={5}  >
                        {items}
                    </Breadcrumbs>
                </div>

            </div>
        </>
    );
}