import { SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Languages, LogOut, Moon, Sun } from "lucide-react";
import ModelFirestore from "@/model/model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocale } from "@/providers/IntlProvider";

const model = new ModelFirestore();

export function DropdownFooterSidebar({ theme, toggleTheme, user }) {
  const router = useRouter();
  const intl = useIntl();
  const { locale, changeLocale } = useLocale();

  const handleLogout = async () => {
    try {
      await model.logout();
      window.alert(intl.formatMessage({ id: "sidebar.logout.success" }));
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
      window.alert(intl.formatMessage({ id: "sidebar.logout.error" }));
    }
  };

  return (
    <SidebarMenuItem className="px-3 pb-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto w-full justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 text-left transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="size-9 shrink-0 border border-slate-200 dark:border-slate-700">
                <AvatarImage
                  src={user?.photoURL || undefined}
                  alt={intl.formatMessage({ id: "sidebar.avatarAlt" })}
                />
                <AvatarFallback className="bg-slate-950 text-xs font-bold text-white dark:bg-white dark:text-slate-950">
                  {user?.displayName ? user.displayName[0].toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 text-left">
                <span className="block truncate text-sm font-semibold leading-tight text-slate-900 dark:text-slate-50">
                  {user?.displayName ||
                    intl.formatMessage({ id: "sidebar.userFallback" })}
                </span>
                <p
                  title={user?.email}
                  className="max-w-35 truncate text-xs text-slate-500 dark:text-slate-400"
                >
                  {user?.email ||
                    intl.formatMessage({ id: "sidebar.noEmail" })}
                </p>
              </div>
            </div>

            <EllipsisVertical className="size-4 shrink-0 text-slate-400 transition group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-200" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-60 rounded-lg border-slate-200 dark:border-slate-800"
          align="start"
          side="top"
        >
          <DropdownMenuLabel>
            <FormattedMessage id="sidebar.accountSettings" />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => changeLocale(locale === "id" ? "en" : "id")}
          >
            <Languages className="mr-2 h-4 w-4" />
            <FormattedMessage
              id={
                locale === "id"
                  ? "common.language.english"
                  : "common.language.indonesian"
              }
            />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleTheme}>
            {theme === "light" ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <FormattedMessage id="sidebar.theme.dark" />
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <FormattedMessage id="sidebar.theme.light" />
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <FormattedMessage id="sidebar.logout" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
