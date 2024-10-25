"use client";

import { addUsecase } from "@/actions/addUsecase";
import { UsecaseSchema } from "@/schema/schema";
import { Alert, Button, Modal, ScrollArea, TextInput, Textarea, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import { z } from "zod";

export default function AddUsecase() {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: true, message: "" });

  const form = useForm({
    initialValues: {
      nom: "",
      description: "",
      date_creation: new Date(),
      date_mep: null,
      statut: "En cours",
    },
    validate: zodResolver(UsecaseSchema),
  });

  const submitAddUsecase = async (values: z.infer<typeof UsecaseSchema>) => {
    setLoading(true);
    values.statut = "En cours";
    const res = await addUsecase(values);
    setLoading(false);
    if (res.isError == false) {
      setError(res);
    } else {
      close();
      form.reset();
      setError({
        isError: true,
        message: "",
      });
    }
  };

  return (
    <>

      <Button leftSection={<Plus width={18} height={18} />} onClick={open} color={"blue"}>
        Ajouter un cas d usage 
      </Button>
      <Modal
        closeButtonProps={{ bg: "blue", color: "white", size: "sm", style: { color: 'white' } }}
        opened={opened}
        className="no-scrollbar"
        onClose={() => {
          close();
          form.reset();
          setError({
            isError: true,
            message: "",
          });
        }}
        title={<Title order={2}>Ajouter un cas d usage </Title>}
      >
        <ScrollArea h={410} scrollbarSize={4} offsetScrollbars scrollHideDelay={8000}>
          <form onSubmit={form.onSubmit((values) => submitAddUsecase(values))} className="mt-4 space-y-4">
            <div>
              <TextInput maxLength={39} label="Nom du cas d'usage" withAsterisk placeholder="Nom du cas d'usage" data-autofocus {...form.getInputProps("nom")} description={"Le nom doit être unique"} />
            </div>

            <div>
              <Textarea maxLength={115} label="Description" withAsterisk placeholder="Description" {...form.getInputProps("description")} />
            </div>

            <div>
              <DatePickerInput error={error.message} label="Date creation" placeholder="Date creation" valueFormat="DD-MM-YYYY" onChange={form.getInputProps("date_creation").onChange} value={form.values.date_creation} />
            </div>
            <div>
              <DatePickerInput error={error.message} label="Date MEP" placeholder="Date MEP" valueFormat="DD-MM-YYYY" clearable onChange={form.getInputProps("date_mep").onChange} />
            </div>
            <div>
              <Button type="submit" loading={loading} loaderProps={{ type: "dots" }} color={"blue"} fullWidth>
                Ajouter
              </Button>
            </div>
          </form>
        </ScrollArea>
      </Modal>
    </>
  );
}
