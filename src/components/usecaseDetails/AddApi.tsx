"use client";

import { addApi } from "@/actions/usecaseDetails/addApi";
import { addUsecase } from "@/actions/addUsecase";
import { ApiSchema, UsecaseSchema } from "@/schema/schema";
import { Alert, Button, Modal, ScrollArea, TextInput, Textarea, Title } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { IconInfoCircle } from '@tabler/icons-react';
import { useDisclosure } from "@mantine/hooks";
import { Notification } from "@mantine/core";
// import { checkIcon } from "lucide-react/icons";
import format from "date-fns/format";
import { Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import style from "styled-jsx/style";
import { z } from "zod";
import { extractName } from "@/helpers/helpers";
import { set, sub } from "date-fns";
import { stat } from "fs";
import { Usecase } from "@prisma/client";


export default function AddApi({ id}: { id: string}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [notification, setNotification] = useState({ isOpen: false, message: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ isError: true, message: "", messageDateCreation: "", messageDateUat: "", messageDateProd: "" });
    const [dateProd, setDateProd] = useState<Date | null>(null);
    const [dateUat, setDateUat] = useState<Date | null>(null);
    const form = useForm({
        initialValues: {
            nom: "",
            producteur: "",
            description: "",
            date_creation: new Date(),
            date_uat: null,
            date_prod: null,
            statut: "En cours",
        },
        validate: zodResolver(ApiSchema),
    });


    const submitAddUsecase = async (values: z.infer<typeof ApiSchema>) => {
        setLoading(true);
        const res = await addApi(values, id);
        setLoading(false);
        if (res.isError == false) {
            setError(res);
            console.log("API added faillllled" );

        } else {
            console.log("API added successfully" );
            setNotification({ isOpen: true, message: "API added successfully" });
            close();
            form.reset();
            setError({
                isError: true,
                message: "",
                messageDateCreation: "",
                messageDateUat: "",
                messageDateProd: "",
            });
        }
    };
    
    return (
        <>
            <Button variant="filled" color="blue" size="xl" onClick={open} className="min-h-[220px]"> <Plus size="75px" /></Button>
            <Modal
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
                title={<Title order={2}>Ajouter API </Title>}
            >
                    <form onSubmit={form.onSubmit((values) => submitAddUsecase(values))} className="mt-4 space-y-4">
                        <div>
                            <TextInput label="Nom d'API" maxLength={50} withAsterisk placeholder="nom de l'API" data-autofocus {...form.getInputProps("nom")} description={"Le nom doit être unique"} />
                        </div>
                        <div>
                            <TextInput label="Nom producteur" withAsterisk placeholder="nom du partenaire producteur" data-autofocus {...form.getInputProps("producteur")} />
                        </div>
                        <div>
                            <Textarea label="Description d'API" placeholder="description de l'API" {...form.getInputProps("description")} />
                        </div>
                        <div>
                            <DatePickerInput error={error.messageDateCreation} label="Date creation" placeholder="Date creation" valueFormat="DD-MM-YYYY"
                                onChange={form.getInputProps("date_creation").onChange}
                                value={form.values.date_creation}
                            />
                        </div>
                        <div>
                            <DatePickerInput
                                placeholder="Date_uat"
                                label="Date_uat"
                                value={form.values.date_uat}
                                error={error.messageDateUat}
                                valueFormat="DD-MM-YYYY"
                                clearable
                                onChange={form.getInputProps("date_uat").onChange}
                            />
                        </div>
                        <div>
                            <DatePickerInput error={error.messageDateProd} label="Date Prod" placeholder="Date Prod" valueFormat="DD-MM-YYYY" clearable
                                value={form.values.date_prod}
                                onChange={form.getInputProps("date_prod").onChange}
                            />
                        </div>
                        <div>
                            <Button type="submit" loading={loading} loaderProps={{ type: "dots" }} color={"blue"} fullWidth>
                                Ajouter
                            </Button>
                        </div>
                    </form>
            </Modal>
        </>
    );
}
