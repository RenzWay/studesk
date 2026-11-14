"use client"

import * as React from "react"
import {useState} from "react"
import {CalendarIcon} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { FormattedMessage, useIntl } from "react-intl"
import { useLocale } from "@/providers/IntlProvider"
import { format, isValid, parse } from "date-fns"
import { enUS, id } from "date-fns/locale"
import { useEffect } from "react"

function formatDate(date, locale) {
    if (!date) return ""
    return format(date, "PPP", { locale })
}

function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime())
}

export function Calendar28({title, setDate}) {
    const [open, setOpen] = useState(false)
    const intl = useIntl()
    const { locale } = useLocale()
    const dateFnsLocale = locale === "id" ? id : enUS
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [month, setMonth] = useState(selectedDate)
    const [value, setValue] = useState(formatDate(selectedDate, dateFnsLocale))

    useEffect(() => {
        setValue(formatDate(selectedDate, dateFnsLocale))
    }, [dateFnsLocale, selectedDate])

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                {title}
            </Label>

            <Popover open={open} onOpenChange={setOpen}>
                <div className="relative w-full">
                    <Input
                        id="date"
                        value={value}
                        placeholder={intl.formatMessage({
                            id: "tasks.dialog.datePlaceholder",
                        })}
                        className="bg-background pr-10"
                        onChange={(e) => {
                            const parsedDate = parse(
                                e.target.value,
                                "PPP",
                                new Date(),
                                { locale: dateFnsLocale },
                            )
                            const newDate = isValid(parsedDate)
                                ? parsedDate
                                : new Date(e.target.value)
                            setValue(e.target.value)
                            if (isValidDate(newDate)) {
                                setSelectedDate(newDate)
                                setMonth(newDate)
                                setDate?.(newDate)
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                                e.preventDefault()
                                setOpen(true)
                            }
                        }}
                    />

                    {/* Tombol Calendar di kanan */}
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-500 hover:text-foreground"
                        >
                            <CalendarIcon className="h-4 w-4"/>
                            <span className="sr-only">
                                <FormattedMessage id="tasks.dialog.selectDate" />
                            </span>
                        </Button>
                    </PopoverTrigger>
                </div>

                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        captionLayout="dropdown"
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(d) => {
                            setSelectedDate(d)
                            setValue(formatDate(d, dateFnsLocale))
                            setOpen(false)
                            setDate?.(d)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
