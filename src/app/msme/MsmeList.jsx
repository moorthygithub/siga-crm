import React, { useEffect, useState } from "react";
import Page from "../dashboard/page";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  Delete,
  Edit,
  Trash2,
  RefreshCcwDot,
  Download,
  SquareParking,
  FileText,
  SquareArrowDown,
  SquarePlus,
  MessageCircle,
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
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MsmeList = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  
  const [highlightedRowId, setHighlightedRowId] = useState(null);

  const {
    data: msme,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["msme"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-msme-list`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.msme;
    },
  });

  useEffect(() => {
    const lastEditedId = localStorage.getItem("lastEditedMsmeId");

    if (lastEditedId) {
      setHighlightedRowId(parseInt(lastEditedId));

      localStorage.removeItem("lastEditedMsmeId");

      setTimeout(() => {
        const element = document.getElementById(
          `msme-row-${lastEditedId}`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 500);

      setTimeout(() => {
        setHighlightedRowId(null);
      }, 3000);
    }
  }, []);

  // State for table management
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const navigate = useNavigate();


  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/panel-delete-msme/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["msme"]);
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });
  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate(id);
    }
  };

  // Define columns for the table
  const columns = [
    {
        id: "slno", 
        header: "Sl No",
        cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      
      
    {
      accessorKey: "firm_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Firm Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("firm_name")}</div>,
    },
    {
      accessorKey: "director",
      header: "Director",
      cell: ({ row }) => <div>{row.getValue("director")}</div>,
    },
    {
      accessorKey: "mobile_no",
      header: "Mobile",
      cell: ({ row }) => <div>{row.getValue("mobile_no")}</div>,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const registration = row.original.id;

        return (
          <div className="flex flex-row items-center">
            <Button
              variant="ghost"
              size="icon"
             
              onClick={() => {

                localStorage.setItem(
                  "lastEditedMsmeId",
                  registration
                );
                navigate(`/msme-edit/${registration}`);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
    
                localStorage.setItem(
                  "lastEditedMsmeId",
                  registration
                );
                navigate(`/msme-view/${registration}`);
              }}
           
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(e, registration);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
          </div>
        );
      },
    },
  ];

  // Create the table instance
  const table = useReactTable({
    data: msme || [],
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
        pageSize: 300,
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
            Loading msme
          </Button>
        </div>
      </Page>
    );
  }

  // Render error state
  if (isError) {
    return (
      <Page>
        <Card className="w-full max-w-md mx-auto mt-10 ">
          <CardHeader>
            <CardTitle className="text-destructive">
              Error Fetching msme
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
      <div className="w-full p-4">
        <div className="flex text-left text-xl text-gray-800 font-[400]">
          Msme List
        </div>

        <div className="flex items-center py-4">
          <Input
            placeholder="Filter firm names..."
            value={table.getColumn("firm_name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("firm_name")?.setFilterValue(event.target.value)
            }
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

        <div className="rounded-md border">
          <div className="bg-white    overflow-auto h-[calc(30rem-3rem)]">
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
                 
                      id={`msme-row-${row.original.id}`}
                      className={
                        highlightedRowId === row.original.id
                          ? "bg-yellow-100 transition-colors duration-1000"
                          : "cursor-pointer hover:bg-gray-100"
                      }
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
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Total {table.getFilteredRowModel().rows.length} msme.
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
    </Page>
  );
};

export default MsmeList;
