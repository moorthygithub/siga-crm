import React, { useState, useEffect } from 'react'
import Page from '../dashboard/page'
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
  Edit,
  Trash2,
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
import BASE_URL from '@/config/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { PaymentEdit, PaymentView } from '@/components/base/ButtonComponents';

const AmountList = () => {
   const queryClient = useQueryClient();
  const usertype = Number(localStorage.getItem("userType")); 
  const [highlightedRowId, setHighlightedRowId] = useState(null);
  const isRestrictedUserDelete = [1, 2, 4].includes(usertype);
  const {
    data: paymentMediation,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["paymentMediation"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-duesreconcil`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.duesreconcil;
    },
  });

  // State for table management
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const navigate = useNavigate();

  
  useEffect(() => {
    const lastEditedId = localStorage.getItem("lastEditedAmountId");

    if (lastEditedId) {
      setHighlightedRowId(parseInt(lastEditedId));

      localStorage.removeItem("lastEditedAmountId");

      setTimeout(() => {
        const element = document.getElementById(`amount-row-${lastEditedId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 500);

      setTimeout(() => {
        setHighlightedRowId(null);
      }, 3000);
    }
  }, []);


  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/panel-delete-duesreconcil/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentMediation"]); 
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });
  const handleDelete = (e,id)=>{
    e.preventDefault()
    // https://agsrebuild.store/public/api/panel-delete-duesreconcil/${id}
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate(id);
    }
  }


  const handleCompanyStatusLabel = (status) => {
    switch (status) {
      case '0':
        return "Pending";
      case '1':
        return "Active";
      case '2':
        return "Expired";
      default:
        return "Unknown";
    }
  };
  
  // Define columns for the table
  const columns = [
    {
      accessorKey: "index",
      header: "Sl.No",
      cell: ({ row }) => <div>{row.index+1}</div>,
    },
    {
      accessorKey: "company_firm",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className='w-36 break-words'>{row.getValue("company_firm")}</div>
        )
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        return (
          <div className="w-36 break-words">{row.getValue("address")}</div>
        )
      },
    },
    {
      accessorKey: "contact_mobile",
      header: "Mobile",
      cell: ({ row }) => <div>{row.getValue("contact_mobile")}</div>,
    },
    {
      accessorKey: "contact_email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("contact_email")}</div>,
    },
    {
      accessorKey: "due_amount",
      header: "Due Amount",
      cell: ({ row }) => <div>{row.getValue("due_amount")}</div>,
    },
    {
      accessorKey: "dus_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("dus_status");
        const label = handleCompanyStatusLabel(status);
        return (
          <span
            className={`px-2 py-1 rounded text-xs ${
              status == "0"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {label}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const registration = row.original.id;

        return (
          <div className='flex flex-row'>
            <PaymentEdit
              onClick={() => {
                localStorage.setItem("lastEditedAmountId", registration);
                navigate(`/amount-edit/${registration}`);
              }}
            />
            <PaymentView
              onClick={() => {
                localStorage.setItem("lastEditedAmountId", registration);
                navigate(`/amount-view/${registration}`);
              }}
            />
               {!isRestrictedUserDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e)=>handleDelete(e,registration)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                         )}
          </div>
        );
      },
    },
  ];

  // Create the table instance
  const table = useReactTable({
    data: paymentMediation || [],
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
        pageSize: 30000, // Large page size to show all rows
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
            Loading Payment
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
              Error Fetching Payment
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
        <div className="flex text-left text-xl text-gray-800 font-[400] mb-2">Payment Mediation List</div>
        
        {/* searching and column filter  */}
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter payment..."
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
          <div className="bg-white overflow-auto h-[calc(30rem-3rem)]">
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
                      id={`amount-row-${row.original.id}`}
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
        
        {/* row selection info */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Total {table.getFilteredRowModel().rows.length} payment(s).
          </div>
        </div>
      </div>
    </Page>
  )
}

export default AmountList;