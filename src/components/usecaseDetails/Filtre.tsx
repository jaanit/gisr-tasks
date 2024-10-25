"use client";

import { classNames } from "@/helpers/helpers";
import { Button, Group, Menu, Pagination, SegmentedControl } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Filtre({ filter, id }: { filter: string, id: string }) {
    const [activePage, setPage] = useState(filter);
    const router = useRouter();
    return (
        <>
            <div className="flex justify-start p-2">
                <Menu>
                    <Menu.Target>
                        
                        <Button size="xs" rightSection={<ChevronDown size={14} />} leftSection={<SlidersHorizontal size={18} />} radius="lg" variant="filled" color={filter === 'PROD' ? "#8a2be2" : filter === 'UAT' ? "#4169E1" : filter == 'EN COURS' ? "#82CFE9" : filter == 'ALL' ? "blue" : ""} > {filter === 'PROD' ? "PROD" : filter === 'UAT' ? "UAT" : filter == 'EN COURS' ? "EN COURS" : filter == 'ALL' ? "Filtre" : ""}</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            onClick={() => {
                                setPage("UAT");
                                router.push(`${id}?filter=EN COURS`);
                            }}
                        >
                            En cours
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                setPage("UAT");
                                router.push(`${id}?filter=UAT`);
                            }}
                        >
                            UAT
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                setPage("PROD");
                                router.push(`${id}?filter=PROD`);
                            }}
                        >
                            PROD
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                setPage("ALL");
                                router.push(`${id}?filter=ALL`);
                            }}
                        >
                            Afficher tout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </>
    );
}
