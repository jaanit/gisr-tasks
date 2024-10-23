"use client";

import { ApiSchema, UsecaseSchema } from "@/schema/schema";
import { Alert, Button, rem, Menu, Modal, ScrollArea, TextInput, Textarea, Title } from "@mantine/core";
import { IconEdit, IconExternalLink } from '@tabler/icons-react';
import { DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Edit, Ellipsis, Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";
import style from "styled-jsx/style";
import { z } from "zod";
import { Api } from "@prisma/client";
import { modifyApi } from "@/actions/usecaseDetails/modifyApi";
import { format } from "date-fns";
import { stat } from "fs";

export default function ModifyApi({ api }: { api: Api }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ isError: true, message: "", messageDateCreation: "", messageDateUat: "", messageDateProd: "" });

    const form = useForm({
        initialValues: {
            nom: api.nom,
            producteur: api.producteur,
            description: api.description,
            date_creation: api.date_creation,
            date_uat: api.date_uat,
            date_prod: api.date_prod,
            statut: "",
        },
        validate: zodResolver(ApiSchema),
    });

    useEffect(() => {
        form.setValues({
            nom: api.nom,
            producteur: api.producteur,
            description: api.description,
            date_creation: api.date_creation,
            date_uat: api.date_uat,
            date_prod: api.date_prod,
        });
    }, [api]);
    const submitModifyApi = async (values: z.infer<typeof ApiSchema>) => {
        setLoading(true);
        if (!values.date_creation) {
            values.date_creation = api.date_creation;
        }
        const res = await modifyApi({ id: api.id, usecaseId: api.usecaseId, ...values });
        setLoading(false);
        if (res.isError == false) {
            setError(res);

        }
        else {
            close();
            form.reset();
            setError({
                isError: true,
                message: "",
                messageDateCreation: "",
                messageDateUat: "",
                messageDateProd: "",
            });
            setIsModify(false);
        }
    };

    const [isModify, setIsModify] = useState(false);
    const handleFormChange = (field: string, value: string | Date | null) => {
        form.setFieldValue(field, value);
        setIsModify(true);
    }

    return (
        <>
            <Menu width={200} >
                <Menu.Target >
                    <Button variant="subtle" size="xs" radius="full" color="black" className="group-hover:!text-white"
                        onClick={(event) => {
                            event.preventDefault();
                        }}
                    >
                        <Ellipsis width={18} height={26} className="hover:color-black ">
                        </Ellipsis >
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            open();
                        }}
                        leftSection={<IconEdit
                            style={{ width: rem(14), height: rem(14) }} />}
                        component="a"

                        target="_blank"
                    >
                        Modify Api
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <Modal
                onClick={(event) => {
                    event.preventDefault();
                }}
                scrollAreaComponent={ScrollArea.Autosize}
                className="no-scrollbar"
                closeButtonProps={{ bg: "blue", color: "white", size: "sm", style: { color: 'white' } }}
                opened={opened}
                onClose={() => {
                    close();
                    form.reset();
                    setError({
                        isError: true,
                        message: "",
                        messageDateCreation: "",
                        messageDateUat: "",
                        messageDateProd: "",
                    });
                }}
                title={<Title order={2}>Modifier APIs </Title>}
            >
                    <form onSubmit={form.onSubmit((values) => submitModifyApi(values))} className="mt-4 space-y-4">
                        <div>
                            <TextInput label="Nom d'API" maxLength={50} withAsterisk placeholder="nom de l'API" data-autofocus {...form.getInputProps("nom")} description={"Le nom doit être unique"} onChange={(event) => handleFormChange("nom", event.currentTarget.value)} />
                        </div>
                        <div>
                            <TextInput label="Nom producteur" withAsterisk placeholder="nom du partenaire producteur" data-autofocus {...form.getInputProps("producteur")} onChange={(event) => handleFormChange("producteur", event.currentTarget.value)} />
                        </div>

                        <div>
                            <Textarea label="Description d'API" placeholder="description de l'API" {...form.getInputProps("description")} onChange={(event) => handleFormChange("description", event.currentTarget.value)} />
                        </div>

                        <div>
                            <DatePickerInput error={error.messageDateCreation} label="Date creation" placeholder={format(api.date_creation as Date, "dd-MM-yyyy")} valueFormat="DD-MM-YYYY" clearable
                                onChange={(value) => {
                                    form.getInputProps("date_creation").onChange(value);
                                    handleFormChange("date_creation", value);
                                }}
                                value={form.values.date_creation}
                            />
                        </div>

                        <div>
                            <DatePickerInput
                                placeholder="date_uat"
                                label="date_uat"
                                error={error.messageDateUat}
                                clearable
                                valueFormat="DD-MM-YYYY"
                                value={form.values.date_uat}
                                onChange={(value) => {
                                    form.getInputProps("date_uat").onChange(value);
                                    handleFormChange("date_uat", value);
                                }}
                            />
                        </div>

                        <div>
                            <DatePickerInput error={error.messageDateProd} label="Date Prod" placeholder="Date Prod" valueFormat="DD-MM-YYYY" clearable
                                onChange={(value) => {
                                    handleFormChange("date_prod", value);
                                    form.getInputProps("date_prod").onChange(value);
                                }}
                                value={form.values.date_prod}

                            />
                        </div>

                        <div>
                            <Button
                                onClick={(event) => {

                                    event.stopPropagation();

                                }}
                                type="submit" loading={loading} loaderProps={{ type: "dots" }} color={"blue"} fullWidth disabled={!isModify}>
                                Modifier
                            </Button>
                        </div>
                    </form>
            </Modal>
        </>
    );
}
