import { ContextPanel } from '@/lib/ContextPanel';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import BASE_URL from '@/config/BaseUrl';
const ButtonControl = () => {
    const { toast } = useToast();
    const [permissions, setPermissions] = useState({});
    const [pageSelections, setPageSelections] = useState({});
    const [columnSelections, setColumnSelections] = useState({});
    const { fetchPermissions } = useContext(ContextPanel);
    const navigate = useNavigate()
  
    const {
      data: usercontrol,
      isLoading,
      isError,
      refetch,
    } = useQuery({
      queryKey: ["usercontrol"],
      queryFn: async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-usercontrol`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data.usercontrol;
      },
    });
  
    const userTypes = [
      { id: "1", label: "Test User" },
      { id: "2", label: "Admin" },
      { id: "3", label: "Super Admin" },
      { id: "4", label: "SIGA Admin" },
    ];
    const pageOptions = usercontrol
      ? [...new Set(usercontrol.map((item) => item.pages))]
      : [];
  
    const updateMutation = useMutation({
      mutationFn: async ({ id, updatedData }) => {
        const token = localStorage.getItem("token");
        const payload = {
          ...updatedData,
          usertype: updatedData.usertype.join(","),
        };
  
        const response = await axios.put(
          `https://southindiagarmentsassociation.com/public/api/panel-update-usercontrol/${id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      },
      onSuccess: () => {
        toast({
          title: "Success",
          description: "User control updated successfully",
          variant: "success",
          
        });
        fetchPermissions();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description:
            error.response?.data?.message || "Failed to update user control",
          variant: "destructive",
        });
      },
    });
  
    useEffect(() => {
      if (!usercontrol) return;
      const newPermissions = {};
      const newPageSelections = {};
      const newColumnSelections = {};
  
      pageOptions.forEach((page) => {
        newPageSelections[page] = false;
        newColumnSelections[page] = {};
  
        userTypes.forEach((user) => {
          newColumnSelections[page][user.id] = false;
        });
  
        const pageButtons = usercontrol
          .filter((item) => item.pages === page)
          .map((item) => item.button);
  
        pageButtons.forEach((button) => {
          const buttonControl = usercontrol.find(
            (item) => item.button === button
          );
          newPermissions[button] = {
            id: buttonControl.id,
            permissions: {},
          };
          userTypes.forEach((user) => {
            const userTypeArray = buttonControl?.usertype ? buttonControl.usertype.split(",") : [];
            newPermissions[button].permissions[user.id] =
            userTypeArray.includes(user.id) || false;
          });
        });
      });
  
      setPermissions(newPermissions);
      setPageSelections(newPageSelections);
      setColumnSelections(newColumnSelections);
    }, [usercontrol]);
  
    const handlePermissionChange = async (buttonId, userId, page) => {
      if (columnSelections[page]?.[userId]) return;
  
      const buttonData = permissions[buttonId];
      const newPermissions = {
        ...buttonData.permissions,
        [userId]: !buttonData.permissions[userId],
      };
  
      // Create array of user IDs that have permission
      const updatedUserTypes = Object.entries(newPermissions)
        .filter(([_, hasPermission]) => hasPermission)
        .map(([id]) => id);
  
      // Prepare update data
      const updatedData = {
        pages: page,
        button: buttonId,
        usertype: updatedUserTypes,
        status: "Active",
      };
  
      // Trigger mutation
      try {
        await updateMutation.mutateAsync({
          id: buttonData.id,
          updatedData,
        });
  
        // Update local state only after successful mutation
        setPermissions((prev) => ({
          ...prev,
          [buttonId]: {
            ...prev[buttonId],
            permissions: newPermissions,
          },
        }));
      } catch (error) {
        console.error("Failed to update permission:", error);
      }
    };
  
    
  
    if (isLoading) {
      return (
       
          <div className="container mx-auto p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg">Loading...</div>
            </div>
          </div>
      
      );
    }
  
    if (isError) {
      return (
      
          <div className="container mx-auto p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-red-600">
                Error loading user controls
              </div>
            </div>
          </div>
        
      );
    }
  return (
     <>
          <div className="flex pr-4 pl-4  items-center justify-between">
            <div className="flex text-left text-xl text-gray-800 font-[400]">
              User Control List
            </div>
            <div onClick={() => navigate(`/create-buttonRole`)}> 
              <Button variant="default" className="ml-2">
                Create Roles
              </Button>
            </div>
          </div>
          <div className="container mx-auto p-4">
            {pageOptions.map((page) => {
              const pageButtons = usercontrol
                .filter((item) => item.pages === page)
                .map((item) => ({
                  value: item.button,
                  label: item.button,
                }));
    
              return (
                <div key={page} className="mb-8">
                  <div className="flex items-center mb-4">
                    <h2 className="text-xl font-semibold">{page}</h2>
                  </div>
    
                  <div className="rounded-lg border shadow-sm">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left w-96 text-sm font-medium text-gray-900">
                            Button Name
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
                        {pageButtons.map((button) => (
                          <tr key={button.value}>
                            <td className="px-4 py-3 text-sm w-96 text-gray-900">
                              {button.label}
                            </td>
                            {userTypes.map((user) => (
                              <td key={user.id} className="px-4 py-3 text-sm">
                                <Checkbox
                                  checked={
                                    permissions[button.value]?.permissions[
                                      user.id
                                    ] ?? false
                                  }
                                  onCheckedChange={() =>
                                    handlePermissionChange(
                                      button.value,
                                      user.id,
                                      page
                                    )
                                  }
                                  disabled={
                                    columnSelections[page]?.[user.id] ||
                                    updateMutation.isLoading
                                  }
                                  className={
                                    columnSelections[page]?.[user.id]
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
              );
            })}
          </div>
          </>
  )
}

export default ButtonControl