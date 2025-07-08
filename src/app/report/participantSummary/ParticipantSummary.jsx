import React, { useState } from "react";
import Page from "@/app/dashboard/page";
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
  Activity,
  ArrowUpDown,
  ChevronDown,
  Loader2,
  SquareArrowDown,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const MetricCard = ({ title, value, icon: Icon, trend }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
    </CardContent>
  </Card>
);

const COLORS = [
  "#4F46E5", // Indigo
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Violet
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-bold text-gray-900">{payload[0].name}</p>
        <p className="text-sm text-gray-600">Count: {payload[0].value}</p>
        <p className="text-xs text-gray-500 mt-1">
          {(payload[0].payload.percent * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomizedLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600">
            {entry.value}: {entry.payload.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const ParticipantSummary = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["participantSummaryData"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-participant-summary`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
  });

  const getChartData = () => {
    if (!data) return [];

    const safeNumber = (value) => {
      const num = Number(value);
      return isNaN(num) || num < 0 ? 0 : num;
    };

    const pending = safeNumber(data.participant_pending_count);
    const confirmed = safeNumber(data.participant_confirm_count);
    const stallIssued = safeNumber(data.participant_stall_issued_count);
    const canceled = safeNumber(data.participant_cancel_count);

    const total = pending + confirmed + stallIssued + canceled;

    if (total === 0) {
      return [];
    }

    const chartData = [
      {
        name: "Pending",
        value: pending,
        percent: pending / total,
      },
      {
        name: "Confirmed",
        value: confirmed,
        percent: confirmed / total,
      },
      {
        name: "Stall Issued",
        value: stallIssued,
        percent: stallIssued / total,
      },
      {
        name: "Canceled",
        value: canceled,
        percent: canceled / total,
      },
    ].filter((item) => item.value > 0);

    return chartData;
  };

  const chartData = getChartData();

  const handleDownload = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-download-participant-summary`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ParticipantSummary.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the Excel report:", error);
    }
  };

  const handleDownloadSummaryWithAmount = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-download-participant-summary-with-amount`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "P-SummaryWithAmount.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the Excel report:", error);
    }
  };

  const handleDownloadSummaryWithoutAmount = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-download-participant-summary-without-amount`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "P-SummaryWithoutAmount.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the Excel report:", error);
    }
  };
  const handleDownloadSummaryWithBalanceAmount = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/panel-download-participant-summary-with-balance-amount`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "P-SummaryWithBalanceAmount.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the Excel report:", error);
    }
  };

  // State for table management
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const columns = [
    {
      accessorKey: "name_of_firm",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Firm Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("name_of_firm")}</div>,
    },
    {
      accessorKey: "brand_name",
      header: "Brand Name",
      cell: ({ row }) => <div>{row.getValue("brand_name")}</div>,
    },
    {
      accessorKey: "gst_no",
      header: "GST Number",
      cell: ({ row }) => <div>{row.getValue("gst_no")}</div>,
    },
    {
      accessorKey: "rep1_name",
      header: "Representative Name",
      cell: ({ row }) => <div>{row.getValue("rep1_name")}</div>,
    },
    {
      accessorKey: "rep1_mobile",
      header: "Mobile Number",
      cell: ({ row }) => <div>{row.getValue("rep1_mobile")}</div>,
    },
    {
      accessorKey: "profile_stall_size",
      header: "Stall Size",
      cell: ({ row }) => <div>{row.getValue("profile_stall_size")}</div>,
    },
    {
      accessorKey: "profile_new_stall_no",
      header: "New Stall No",
      cell: ({ row }) => (
        <div>{row.getValue("profile_new_stall_no") || "-"}</div>
      ),
    },
    {
      accessorKey: "profile_amount",
      header: "Amount",
      cell: ({ row }) => <div>₹{row.getValue("profile_amount")}</div>,
    },
    {
      accessorKey: "profile_received_amt",
      header: "Received Amount",
      cell: ({ row }) => <div>₹{row.getValue("profile_received_amt")}</div>,
    },
    {
      accessorKey: "profile_discount_amt",
      header: "Discount Amount",
      cell: ({ row }) => <div>₹{row.getValue("profile_discount_amt")}</div>,
    },
    {
      accessorKey: "balance_amount",
      header: "Balance",
      cell: ({ row }) => {
        const profileAmount = row.getValue("profile_amount") || 0;
        const receivedAmount = row.getValue("profile_received_amt") || 0;
        const discountAmount = row.getValue("profile_discount_amt") || 0;
        const balance = profileAmount - (receivedAmount + discountAmount);
        return <div>₹{balance}</div>;
      },
    },
  ];

  // Create the table instance
  const table = useReactTable({
    data: data?.participant_summary || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading Participant Summary
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
              Error Fetching Participant Summary
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
      <div className="flex items-center justify-between text-left text-gray-800 font-[400] p-4 mb-4">
        <h1 className="text-xl">Participant Summary</h1>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 w-full md:w-auto">
          <Button
            onClick={handleDownloadSummaryWithBalanceAmount}
            className="whitespace-nowrap"
            size="sm"
          >
            <SquareArrowDown className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Balace Amount</span>
            <span className="sm:hidden">Balace Amt</span>
          </Button>
          <Button
            onClick={handleDownloadSummaryWithoutAmount}
            className="whitespace-nowrap"
            size="sm"
          >
            <SquareArrowDown className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Without Amount</span>
            <span className="sm:hidden">W/O Amt</span>
          </Button>
          <Button
            onClick={handleDownloadSummaryWithAmount}
            className="whitespace-nowrap"
            size="sm"
          >
            <SquareArrowDown className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">With Amount</span>
            <span className="sm:hidden">With Amt</span>
          </Button>
          <Button
            onClick={handleDownload}
            className="whitespace-nowrap"
            size="sm"
          >
            <SquareArrowDown className="h-4 w-4 mr-2" />
            Full Summary
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        <MetricCard
          title="Pending Count"
          value={data?.participant_pending_count || 0}
          icon={Activity}
        />
        <MetricCard
          title="Confirm Count"
          value={data?.participant_confirm_count || 0}
          icon={Activity}
        />
        <MetricCard
          title="Stall Issued Count"
          value={data?.participant_stall_issued_count || 0}
          icon={Activity}
        />
        <MetricCard
          title="Cancel Count"
          value={data?.participant_cancel_count || 0}
          icon={TrendingUp}
        />
        <MetricCard
          title="Total Count"
          value={data?.participant_total_count || 0}
          icon={TrendingUp}
        />
      </div>

      <div className="">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Participant Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[470px] sm:h-[470px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                  legendType="circle"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ zIndex: 1000 }}
                />
                <Legend
                  content={renderCustomizedLegend}
                  wrapperStyle={{ paddingTop: "15px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            {chartData.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium">No Data Available</p>
                  <p className="text-sm">
                    Chart will display when data is available
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="w-full p-4">
        {/* Searching and column filter */}
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
                .map((column) => (
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
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-100"
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
        <div className="flex items-center justify-end space-x-2 py-4">
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

export default ParticipantSummary;
