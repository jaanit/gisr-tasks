"use client";
import "dayjs/locale/fr";
import SmallLogo from "@/components/SmallLogo";
import { AppShell, Avatar, Burger, Group, LoadingOverlay, Menu, Skeleton, Tooltip, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BarChartBig, Blocks, ListTodo, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames, extractName } from "@/helpers/helpers";
import GlobalSearch from "@/components/GlobalSearch";
import { DatesProvider } from "@mantine/dates";
import { useSession } from "next-auth/react";
import { logOut } from "@/actions/logout";
import { useEffect, useState } from "react";
import path from "path";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const session = useSession();
  const [active, setActive] = useState('0')
  const [waiting, setWaiting] = useState(false)

  
  useEffect(() => {
      if (active == '1' && !pathname.includes('/usecase') || active == '3' && !pathname.includes('/taches')  || active == '2' && !pathname.includes('/dashboard')) {
        setWaiting(true)
        
      } else {
        setWaiting(false)
      }
  
    } , [active, pathname])

  return (
    <>
      <AppShell bg="white" layout="alt" header={{ height: 60 }} navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }} pb="sm" >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <GlobalSearch />
            <div className="flex items-center space-x-3 ml-auto">
              <Menu shadow="md" width={200} position="bottom-end" withArrow>
                <Menu.Target>
                  <Tooltip label={session.data?.user?.name} withArrow position="left">
                    <Avatar color="violet" radius="xl" size={"md"}>
                      {extractName(session.data?.user?.name || "")}
                    </Avatar>
                  </Tooltip>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label className="flex flex-col"> <span>{session.data?.user?.name}</span><span>{session.data?.user?.email}</span></Menu.Label>
                  <Menu.Item leftSection={<LogOut style={{ width: rem(14), height: rem(14) }} />} onClick={() => logOut()}>
                    Se déconnecter
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <div className="ml-2">
              <SmallLogo />
            </div>
          </Group>
          <div className="flex flex-col space-y-1 mt-8">
            <Link href={"/dashboard"}>
              <div onClick={() => setActive('2')} className={classNames("flex items-center space-x-1 font-semibold text-sm hover:bg-violet-500 hover:text-white transition-all px-3 py-2.5 rounded-md", pathname.includes('dashboard') ? "bg-violet-500 text-white" : "")}>
                <span>
                  <BarChartBig width={18} height={18} />
                </span>
                <span>Dashboard</span>
              </div>
            </Link>
            <Link href={"/usecases"}>
              <div className={classNames("flex items-center space-x-1 font-semibold text-sm hover:bg-violet-500 hover:text-white transition-all px-3 py-2.5 rounded-md", pathname.includes('usecases') ? "bg-violet-500 text-white"   : "")}
                onClick={() => setActive('1')}
              >
                <span>
                  <Blocks width={18} height={18} />
                </span>
                <span>Usecases</span>
              </div>
            </Link>
            <Link href={"/taches"}>
              <div onClick={() => setActive('3')} className={classNames("flex items-center space-x-1 font-semibold text-sm hover:bg-violet-500 hover:text-white transition-all px-3 py-2.5 rounded-md", pathname.includes('taches') ? "bg-violet-500 text-white" : "")}>
                <span>
                  <ListTodo width={18} height={18} />
                </span>
                <span>Tasks</span>
              </div>
            </Link>
          </div>
        </AppShell.Navbar>
        <AppShell.Main>
          {waiting ? <div className="w-full h-full flex justify-center items-center"><LoadingOverlay visible={true} > WAit ..</LoadingOverlay> </div> : <DatesProvider settings={{ locale: "fr" }}>{children}</DatesProvider>}
          
        </AppShell.Main>
      </AppShell>
    </>
  );
}
