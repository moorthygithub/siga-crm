import React, { useRef, useState } from "react";
import Page from "../dashboard/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Loader2,
  Printer,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BASE_URL from "@/config/BaseUrl";
import RegistrationView from "./RegistrationView";
import { useReactToPrint } from "react-to-print";

const RegistrationList = () => {
  const printRef = useRef(null);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [remainingPrints, setRemainingPrints] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printingId, setPrintingId] = useState(null);  // instead of isPrinting

  const {
    data: registrations,
    isLoading,
    isError,
    refetch: refetchRegistrations,
  } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-register`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.registerData;
    },
  });


  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const handleFetchRegistration = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-register-by-id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.registerData;
    } catch (error) {
      console.error("Error fetching registration:", error);
      throw error;
    }
  };

  const handlePrintMultiple = useReactToPrint({
    content: () => printRef.current,
    documentTitle: selectedRegistration
      ? `Registration-${selectedRegistration.fair_person_name}`
      : "Registration",
    pageStyle: `
      @page {
        size: auto;
        margin: 0;
      }
        
      @media print {
        body {
    
          margin: 0;
          -webkit-print-color-adjust: exact;
        }
           body > div {
        position: absolute;
        top: 210px;
        left: 0;
        width: 100%;
      }
      }
    `,
    onBeforeGetContent: () => {
      setIsPrinting(true);
     
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setRemainingPrints(prev => {
        if (prev > 1) {
          
          setTimeout(handlePrintMultiple, 150);
          return prev - 1;
        } else {
         
          setIsPrinting(false);
          refetchRegistrations();
          return 0;
        }
      });
    },
    onPrintError: (error) => {
      console.error("Print error:", error);
      setIsPrinting(false);
      setRemainingPrints(0);
    }
  });
  
  const handlePrint = async (registration) => {
    try {
      const data = await handleFetchRegistration(registration.id);
      setSelectedRegistration(data);
    
      setRemainingPrints(data.fair_no_of_people);
     
      setTimeout(handlePrintMultiple, 100);
    } catch (error) {
      console.error("Error preparing print:", error);
      setIsPrinting(false);
      setRemainingPrints(0);
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "fair_firm_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Firm Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("fair_firm_name")}</div>,
    },
    {
      accessorKey: "fair_person_name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("fair_person_name")}</div>,
    },
    {
      accessorKey: "fair_person_mobile",
      header: "Mobile",
      cell: ({ row }) => <div>{row.getValue("fair_person_mobile")}</div>,
    },
    {
      accessorKey: "fair_no_of_people",
      header: "No of People",
      cell: ({ row }) => <div>{row.getValue("fair_no_of_people")}</div>,
    },
    {
      accessorKey: "fair_print_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("fair_print_status");
        return (
          <span className="inline-block rounded-md px-2 py-1 text-xs font-normal bg-blue-100 text-blue-800">
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const registration = row.original;

        return (
          <div className="flex flex-row">
            <Button
              variant="outline"
              size="icon"
              className="top-4 right-4 z-10"
              onClick={() => handlePrint(registration)}
              disabled={isPrinting}
            >
              {isPrinting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Printer className="h-4 w-4" />
              )}
            </Button>
          </div>
        );
      },
    },
  ];

  
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
    initialState: {
      pagination: {
        pageSize: 100,
      },
    },
  });

  // Render loading state
  if (isLoading) {
    return (
      <Page>
        <div className="flex justify-center items-center h-full">
          <Button disabled>
            <Loader2 className="h-4 w-4 animate-spin" />
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
            <CardTitle className="text-destructive">
              Error Fetching Registrations
            </CardTitle>
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
      <div className="flex w-full p-4 gap-2">
        {/* registration lIst  */}
        <div className="w-[100%]">
          <div className="flex text-left text-xl text-gray-800 font-[400]">
            Registrations List
          </div>
          {/* searching and column filter  */}
          <div className="flex items-center py-4">
            <Input
              placeholder="Search..."
              value={table.getState().globalFilter || ""}
              onChange={(event) => {
                table.setGlobalFilter(event.target.value);
              }}
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* table  */}
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
                      );
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
                      className="cursor-pointer hover:bg-gray-100"
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
          {/* row slection and pagintaion button  */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

  
        <div className="hidden">
          {selectedRegistration && (
            <div
              ref={printRef}
              className="w-full print:h-48 print:relative max-w-sm mx-auto shadow-lg print:border-none bg-white rounded-lg overflow-hidden print:shadow-none  print:rounded-none"
            >
           
             


              <div className="p-12 text-center print:absolute print:bottom-14 print:left-1/2 print:transform print:-translate-x-1/2">
                <div className="mb-2">
                  <h2 className="text-lg print:w-80 font-bold text-gray-800">
                    {selectedRegistration.fair_firm_name || "N/A"}
                  </h2>
                </div>

                <div>
                  <h3 className="text-sm font-medium uppercase text-gray-700">
                    {selectedRegistration.fair_person_name || "N/A"}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default RegistrationList;