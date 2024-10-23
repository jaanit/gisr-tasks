"use client";

import { modifyUsecase } from "@/actions/modifyUsecase";
import { UsecaseSchema } from "@/schema/schema";
import { Alert, Button, Modal, ScrollArea, TextInput, Textarea, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Usecase } from "@prisma/client";
import { format } from "date-fns";
import { Pencil, Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import { use, useEffect, useState } from "react";
import { z } from "zod";

export default function ModifyUsecase({ u }: { u: Usecase }) {

  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: true, message: "" });

  const form = useForm({
    initialValues: {
      nom: u.nom,
      description: u.description,
      date_creation: u.date_creation,
      date_mep: u.date_mep,
      statut: u.statut,
    },
    validate: zodResolver(UsecaseSchema),
  });

  useEffect(() => {
    form.setValues({
      nom: u.nom,
      description: u.description,
      date_creation: u.date_creation,
      date_mep: u.date_mep,
      statut: u.statut,
    });
  }, [u]);

  const [isModify, setIsModify] = useState(false);
  const handleFormChange = (field: string, value: string | Date | null) => {
    form.setFieldValue(field, value);
    setIsModify(true);
  }


  const submitAddUsecase = async (values: z.infer<typeof UsecaseSchema>) => {
    if (!values.date_creation) {
      values.date_creation = u.date_creation;
    }
    setLoading(true);
    const res = await modifyUsecase(values, u.id);
    setLoading(false);
    if (res.isError == false) {
      setError(res);
    } else {
      close();
      setIsModify(false);
      form.reset();
      setError({
        isError: true,
        message: "",
      });
    }
  };

  return (
    <>
      <Button variant="subtle" size="xs" radius="full" color="black" onClick={open} className="group-hover:!text-white">
        <Pencil width={16} height={16} className="hover:color-black ">
        </Pencil>
      </Button>
      <Modal
       scrollAreaComponent={ScrollArea.Autosize}
        closeButtonProps={{ bg: "blue", color: "white", size: "sm", style: { color: 'white' } }}
        opened={opened}
        onClose={() => {
          close();
          form.reset();
          setError({
            isError: true,
            message: "",
          });
        }}
        title={<Title order={4}>Modifier informations générales du cas d'usage</Title>}
      >
          <form onSubmit={form.onSubmit((values) => submitAddUsecase(values))} className="mt-4 space-y-4">
            <div>
              <TextInput label="Nom du cas d'usage" maxLength={20} withAsterisk data-autofocus {...form.getInputProps("nom")} description={"Le nom doit être unique"} onChange={(event) => handleFormChange("nom", event.currentTarget.value)} />
            </div>
            <div>
              <Textarea label="Description" maxLength={200} withAsterisk onFocus={(e) => e.target.select()} {...form.getInputProps("description")} onChange={(event) => handleFormChange("description", event.currentTarget.value)} />
            </div>
            <div>
              <DatePickerInput error={error.message} placeholder={format(u.date_creation as Date, "dd-MM-yyyy")} label="Date creation" valueFormat="DD-MM-YYYY" clearable
                value={form.values.date_creation}
                onChange={(value) => {
                  form.getInputProps("date_creation").onChange(value);
                  handleFormChange("date_creation", value);
                }}
              />
            </div>

            <div>
              <DatePickerInput error={error.message} label="Date MEP" valueFormat="DD-MM-YYYY" clearable
                value={form.values.date_mep}
                onChange={(value) => {
                  form.getInputProps("date_mep").onChange(value);
                  handleFormChange("date_mep", value);
                }}
              />
            </div>

            <div>
              <Button type="submit" loading={loading} loaderProps={{ type: "dots" }} color={"blue"} fullWidth disabled={!isModify}>
                Modifier
              </Button>
            </div>
          </form>
      </Modal>
    </>
  );
}