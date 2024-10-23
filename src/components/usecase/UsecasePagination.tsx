"use client";

import { Group, Pagination } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UsecasePagination({ current, total }: { current: number; total: number }) {
  const [activePage, setPage] = useState(current);
  const router = useRouter();
  return (
    <>
      <div className="mt-6">
        <Pagination
          total={total}
          value={current}
          onChange={(page) => {
            if (page == activePage) return;
            setPage(page);
            router.push(`usecases/?page=${page}`);
          }}
        />
      </div>
    </>
  );
}
