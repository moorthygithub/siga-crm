import React, { useRef, useState } from "react";
import Page from "../dashboard/page";
import BASE_URL from "@/config/BaseUrl";
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
import ParticipantView from "./ParticipantView";
import { useReactToPrint } from "react-to-print";

const ParticipantList = () => {
    const printRef = useRef(null);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [printingId, setPrintingId] = useState(null); 
  const {
    data: idcards,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["idcards"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-idcard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.registeridcard;
    },
  });

  // State for table management
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedId, setSelectedId] = useState(null);
const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: selectedRegistration
      ? `IdCard-${selectedRegistration.id_card_brand_name}`
      : "IdCard",
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
    onAfterPrint: () => {
      setPrintingId(null);
      refetchRegistrations();
    },
    onPrintError: (error) => {
      console.error("Print error:", error);
      setPrintingId(null);
    }
  });
  // Define columns for the table
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "id_name_of_firm",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Firm Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("id_name_of_firm")}</div>,
    },
    {
      accessorKey: "id_card_brand_name",
      header: "Brand",
      cell: ({ row }) => <div>{row.getValue("id_card_brand_name")}</div>,
    },
    {
      accessorKey: "idcardsub_rep_name",
      header: "Rep. Name",
      cell: ({ row }) => <div>{row.getValue("idcardsub_rep_name")}</div>,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const registration = row.original;
        const isCurrentPrinting = printingId === registration.id;
    
        return (
          <div className="flex flex-row">
            <Button
              variant="outline"
              size="icon"
              className="top-4 right-4 z-10"
              onClick={() => {
                setSelectedRegistration(registration);
                setPrintingId(registration.id);
                setTimeout(() => handlePrint(), 0);
              }}
              disabled={printingId !== null && !isCurrentPrinting} 
            >
              {isCurrentPrinting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Printer className="h-4 w-4" />
              )}
            </Button>
          </div>
        );
      },
    }
    // {
    //   accessorKey: "idcardsub_rep_mobile",
    //   header: "Mobile",
    //   cell: ({ row }) => <div>{row.getValue("idcardsub_rep_mobile")}</div>,
    // },

    
  ];

  // Create the table instance
  const table = useReactTable({
    data: idcards || [],
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
        pageSize: 7,
      },
    },
  });

  // Render loading state
  if (isLoading) {
    return (
      <Page>
        <div className="flex justify-center items-center h-full">
          <Button disabled>
            <Loader2 className=" h-4 w-4 animate-spin" />
            Loading Participations
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
              Error Fetching Participations
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
        <div className="w-[100%]">
          <div className="flex text-left text-xl text-gray-800 font-[400]">
            Id Card List
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
                          onClick={() => setSelectedId(row.original.id)}
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
        <div className="hidden relative">
          {selectedRegistration && (
            <div
              ref={printRef}
              className="w-full print:h-96 absolute top-36  mx-auto  max-w-sm left-1/2 -translate-x-1/2 shadow-lg print:border-none bg-white rounded-lg overflow-hidden print:shadow-none  print:rounded-none"
            >
               <div
     className="absolute top-5 w-28 h-28 border-none left-1/2 -translate-x-1/2"
  >
    {selectedRegistration.idcardsub_rep_image && (
      <img
      src={`http://southindiagarmentsassociation.com/public/idcard_images/${selectedRegistration.idcardsub_rep_image}`}
      alt="Registrant"
      className="w-full h-full object-cover rounded-none"
    />
    )}
    
  </div>
              <div className="px-12  -translate-y-16 text-center print:absolute border-none print:bottom-28 print:left-1/2 print:transform print:-translate-x-1/2">
                <div className="mb-2">
                  <h2 className="text-lg print:w-80 font-bold text-gray-800">
                    {selectedRegistration.id_card_brand_name || "N/A"}
                  </h2>
                </div>
                <div>
                  <h3 className="text-sm font-medium uppercase text-gray-700">
                    {selectedRegistration.idcardsub_rep_name || "N/A"}
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

export default ParticipantList;
