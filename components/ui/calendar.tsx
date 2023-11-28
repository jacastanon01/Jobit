'use client';

import * as React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, DropdownProps } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'hidden text-sm font-medium',
        caption_dropdowns: 'flex justify-center gap-1',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400',
        row: 'flex w-full mt-2',
        cell: ' h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-darkbg-3/50 dark:[&:has([aria-selected])]:bg-darkbg-3',
        day: cn(
          'h-9 w-9 p-0 font-normal rounded-md dark:hover:!bg-darkbg-3 aria-selected:opacity-100',
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-slate-900 text-slate-50 hover:!bg-darkbg-3 hover:!text-slate-50 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:!bg-natural-4 dark:hover:!text-darkbg-3 dark:focus:bg-slate-50 dark:focus:text-darkbg-3',
        day_today: 'bg-slate-100 dark:bg-darkbg-3 dark:text-slate-50',
        day_outside:
          'day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-darkbg-3/50 dark:aria-selected:text-slate-400',
        day_disabled: 'text-slate-500 opacity-50 dark:text-slate-400',
        day_range_middle:
          'aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-darkbg-3 dark:aria-selected:text-slate-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, children, ...props }: DropdownProps) => {
          const options = React.Children.toArray(
            children,
          ) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];
          const selected = options.find((child) => child.props.value === value);
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };
          return (
            <Select
              value={value?.toString()}
              onValueChange={(value) => {
                handleChange(value);
              }}
            >
              <SelectTrigger className='pr-1.5 focus:ring-0 dark:border-darkbg-4 dark:!bg-darkbg-2'>
                <SelectValue>{selected?.props?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent position='popper'>
                <ScrollArea className='h-80'>
                  {options.map((option, id: number) => (
                    <SelectItem
                      className='cursor-pointer hover:!border hover:!border-primary hover:!ring-0 hover:!ring-primary focus:!border focus:!border-primary focus:!ring-0 active:!border active:!border-primary active:!ring-0 active:!ring-primary dark:active:!border dark:active:!border-primary dark:active:!ring-primary'
                      key={`${option.props.value}-${id}`}
                      value={option.props.value?.toString() ?? ''}
                    >
                      {option.props.children}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          );
        },
        IconLeft: ({ ...props }) => <ChevronLeft className='h-4 w-4' />,
        IconRight: ({ ...props }) => <ChevronRight className='h-4 w-4' />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
