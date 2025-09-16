import { ContextPanel } from "@/lib/ContextPanel";
import React, { useState, useEffect, useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/config/BaseUrl";

const PageControl = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  const [columnSelections, setColumnSelections] = useState({});
  const { fetchPagePermission } = useContext(ContextPanel);

  const userTypes = [
    { id: "1", label: "Test User" },
    { id: "2", label: "Admin" },
    { id: "3", label: "Super Admin" },
    { id: "4", label: "SIGA Admin" },
  ];

  const {
    data: routeControl,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userControl"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-usercontrol-new`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.usercontrol;
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch route data",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.put(
        `${BASE_URL}/api/panel-update-usercontrol-new/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Page permissions updated successfully",
        variant: "success",
      });
      fetchPagePermission();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update permissions",
        variant: "destructive",
      });
    },
  });

  const handlePermissionChange = async (route, userId) => {
    if (columnSelections[route.url]?.[userId]) return;

    try {
      // Get current route data
      const routeData = routeControl.find(
        (item) => `/${item.url}` === route.url
      );
      if (!routeData) return;

      // Get all current user types from the UI state
      const currentUIPermissions = userTypes.reduce((acc, user) => {
        if (permissions[route.url]?.permissions[user.id]) {
          acc.push(user.id);
        }
        return acc;
      }, []);

      // Toggle the current userId in the permissions
      let newUserTypes;
      if (currentUIPermissions.includes(userId)) {
        newUserTypes = currentUIPermissions.filter((id) => id !== userId);
      } else {
        newUserTypes = [...currentUIPermissions, userId];
      }

      // Prepare update data with all permissions
      const updatedData = {
        name: routeData.name,
        url: routeData.url,
        usertype: newUserTypes.join(","),
        status: routeData.status || "Active",
      };

      // Update in backend
      await updateMutation.mutateAsync({
        id: routeData.id,
        updatedData,
      });

      // Update local state to reflect all permissions
      setPermissions((prevPermissions) => {
        const routeUrl = route.url;
        const currentPermissions = prevPermissions[routeUrl]?.permissions || {};

        return {
          ...prevPermissions,
          [routeUrl]: {
            id: routeData.id,
            permissions: {
              ...currentPermissions,
              [userId]: !currentPermissions[userId],
            },
          },
        };
      });
    } catch (error) {
      console.error("Failed to update permission:", error);
      toast({
        title: "Error",
        description: "Failed to update permission",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (routeControl) {
      const newPermissions = {};
      const newColumnSelections = {};

      routeControl.forEach((route) => {
        const url = `/${route.url}`;
        newColumnSelections[url] = {};
        userTypes.forEach((user) => {
          newColumnSelections[url][user.id] = false;
        });

        newPermissions[url] = {
          id: route.id,
          permissions: {},
        };

        const usertypeArray = route.usertype
          ? route.usertype.split(",").filter(Boolean)
          : [];

        userTypes.forEach((user) => {
          newPermissions[url].permissions[user.id] = usertypeArray.includes(
            user.id
          );
        });
      });

      setPermissions(newPermissions);
      setColumnSelections(newColumnSelections);
    }
  }, [routeControl]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">
            Error loading page controls
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex pr-4 pl-4 items-center justify-between">
        <div className="flex text-left text-xl text-gray-800 font-[400]">
          Page Route Management
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="rounded-lg border shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left w-96 text-sm font-medium text-gray-900">
                  Page Name
                </th>
                {userTypes.map((user) => (
                  <th
                    key={user.id}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-900"
                  >
                    <div className="flex flex-row items-center gap-2">
                      {user.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {routeControl.map((route) => (
                <tr key={route.id}>
                  <td className="px-4 py-3 text-sm w-96 text-gray-900">
                    {route.name.trim()}
                  </td>
                  {userTypes.map((user) => (
                    <td key={user.id} className="px-4 py-3 text-sm">
                      <Checkbox
                        checked={
                          permissions[`/${route.url}`]?.permissions[user.id] ??
                          false
                        }
                        onCheckedChange={() =>
                          handlePermissionChange(
                            { url: `/${route.url}` },
                            user.id
                          )
                        }
                        disabled={
                          columnSelections[`/${route.url}`]?.[user.id] ||
                          updateMutation.isLoading
                        }
                        className={
                          columnSelections[`/${route.url}`]?.[user.id]
                            ? "opacity-50"
                            : ""
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PageControl;
