import React, { useState } from 'react'
import Page from '../dashboard/page'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {

  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  Eye, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  Loader2
} from "lucide-react"


const fetchRegistrations = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get('https://agsrebuild.store/public/api/panel-fetch-register', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.registerData;
};

const RegistrationList = () => {
   // Tanstack Query to fetch and manage data
   const [sorting, setSorting] = useState([])
   const [columnFilters, setColumnFilters] = useState([])
   const [columnVisibility, setColumnVisibility] = useState({})
   const [rowSelection, setRowSelection] = useState({})
 
   // Fetch data
   const { data: registrations, isLoading, isError } = useQuery({
     queryKey: ['registrations'],
     queryFn: fetchRegistrations,
   });
 
   // Handle view action
   const handleViewRegistration = (registration) => {
     // Implement view logic - could be a modal or navigation
     console.log('View Registration:', registration);
   };
 
   // Define columns
   const columns = [
     {
       accessorKey: "id",
       header: ({ column }) => (
         <Button
           variant="ghost"
           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
         >
           ID
           <ArrowUpDown className="ml-2 h-4 w-4" />
         </Button>
       ),
       cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
     },
     {
       accessorKey: "fair_firm_name",
       header: "Firm Name",
       cell: ({ row }) => <div>{row.getValue("fair_firm_name")}</div>,
     },
     {
       accessorKey: "fair_person_name",
       header: "Contact Person",
       cell: ({ row }) => <div>{row.getValue("fair_person_name")}</div>,
     },
     {
       accessorKey: "fair_person_mobile",
       header: "Mobile Number",
       cell: ({ row }) => <div>{row.getValue("fair_person_mobile")}</div>,
     },
     {
       accessorKey: "fair_categygroup",
       header: "Category",
       cell: ({ row }) => <div>{row.getValue("fair_categygroup")}</div>,
     },
     {
       accessorKey: "fair_print_status",
       header: "Print Status",
       cell: ({ row }) => (
         <div>
           {row.getValue("fair_print_status") || 'Not Printed'}
         </div>
       ),
     },
     {
       id: "actions",
       enableHiding: false,
       header: "Actions",
       cell: ({ row }) => {
         const registration = row.original;
         
         return (
           <Button 
             variant="outline" 
             size="icon" 
             onClick={() => handleViewRegistration(registration)}
           >
             <Eye className="h-4 w-4" />
           </Button>
         );
       },
     },
   ];
 
   // Create table instance
   const table = useReactTable({
     data: registrations || [],
     columns,
     onSortingChange: setSorting,
     onColumnFiltersChange: setColumnFilters,
     getCoreRowModel: getCoreRowModel(),
     getPaginationRowModel: getPaginationRowModel(),
     getSortedRowModel: getSortedRowModel(),
     getFilteredRowModel: getFilteredRowModel(),
     onColumnVisibilityChange: setColumnVisibility,
     onRowSelectionChange: setRowSelection,
     state: {
       sorting,
       columnFilters,
       columnVisibility,
       rowSelection,
     },
   });
 

  // Render loading state
  if (isLoading) {
    return (
      <Page>
        <div className="flex justify-center items-center h-full">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading Registrations
          </Button>
        </div>
      </Page>
    );
  }

  // Render error state
  if (isError) {
    return (
      <Page>
        <Card className="w-full max-w-md mx-auto mt-10">
          <CardHeader>
            <CardTitle className="text-destructive">Error Fetching Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </Page>
    );
  }
  return (
   <Page>
            <Card>
        <CardHeader>
          <CardTitle>Registration List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            {/* Global filter */}
            <Input
              placeholder="Filter firm names..."
              value={(table.getColumn("fair_firm_name")?.getFilterValue()) ?? ""}
              onChange={(event) =>
                table.getColumn("fair_firm_name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            
            {/* Column visibility toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
   </Page>
  )
}

export default RegistrationList