"use client";

import { search } from "@/actions/search";
import { Card, LoadingOverlay, Text, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Usecase } from "@prisma/client";
import Link from "next/link";
import { useClickOutside } from "@mantine/hooks";
import { classNames } from "@/helpers/helpers";

export default function GlobalSearch() {
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 500);
  const [res, setRes] = useState<Usecase[]>([]);
  const [loading, setLoading] = useState(false);

  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  const openSearch = () => {
    if (debounced.length > 0) setOpened(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (debounced !== "") {
        setOpened(true);
        setLoading(true);
        const res = await search(debounced);
        setRes(res);
        setLoading(false);
      }
    };

    fetchData();
  }, [debounced]);

  return (
    <>
      <form>
        <div className="relative">
          <div className="w-[36px] h-[36px] absolute right-0 top-0 bottom-0 bg-blue-500 z-10 rounded-tr-sm rounded-br-sm flex items-center justify-center text-white">
            <Search width={16} height={16} />
          </div>
          <TextInput placeholder="Rechercher un cas d'usage" className="w-[250px] md:w-[400px]" onChange={(event) => setValue(event.currentTarget.value)} onFocus={() => openSearch()} />
          <Card ref={ref} withBorder shadow="sm" radius={"md"} padding={"xs"} className={classNames("!absolute !top-[36px] !left-0 !right-0 min-h-[100px]", opened === false ? "!hidden" : "!block")}>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "xs", blur: 2 }} />
            {res.length > 0 ? (
              res.map((r) => (
                <Link href={"/usecases/"+ r.id} key={r.id}>
                  <div className="text-sm mb-1 last:mb-0 p-3 hover:bg-blue-500 group hover:transition-all rounded-md">
                    <div className="font-bold uppercase group-hover:text-white">{r.nom}</div>
                    <div className="text-gray-500 group-hover:text-white">
                      <Text size="sm" lineClamp={1}>
                        {r.description}
                      </Text>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex justify-center items-center text-sm text-center text-semibold text-gray-500 min-h-[100px]">Aucune résultat trouver.</div>
            )}
          </Card>
        </div>
      </form>
    </>
  );
}
