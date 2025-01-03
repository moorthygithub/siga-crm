import React, { useContext, useState, useEffect } from "react";
import Page from '../dashboard/page'
import ButtonComponents from "@/components/base/ButtonComponents";
import { ContextPanel } from "@/lib/ContextPanel";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCardIcon, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";


const CreateButtonRole = () => {
  const { toast } = useToast();
  const { fetchPermissions } = useContext(ContextPanel);
  const [selectedPage, setSelectedPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const [userControlData, setUserControlData] = useState([]);
  const [permissions, setPermissions] = useState({});

  const userTypes = [
    { id: "1", label: "Test User" },
    { id: "2", label: "Admin" },
    { id: "3", label: "Super Admin" },
    { id: "4", label: "SIGA Admin" },
  ];

  // Fetch userControl data from localStorage
  useEffect(() => {
    const userControl = JSON.parse(localStorage.getItem("userControl") || "[]");
    setUserControlData(userControl);
  }, []);

  // Get all buttons from ButtonComponents grouped by page
  const buttonComponentsByPage = Object.entries(ButtonComponents).reduce(
    (acc, [key, value]) => {
      if (!acc[value.page]) {
        acc[value.page] = [];
      }
      acc[value.page].push(key);
      return acc;
    },
    {}
  );

  // Get buttons in localStorage grouped by page
  const userControlButtonsByPage = userControlData.reduce((acc, item) => {
    if (!acc[item.pages]) {
      acc[item.pages] = [];
    }
    acc[item.pages].push(item.button);
    return acc;
  }, {});

  // Get available pages (pages with new buttons)
  const availablePages = Object.keys(buttonComponentsByPage).filter((page) => {
    const buttonsInComponent = buttonComponentsByPage[page] || [];
    const buttonsInUserControl = userControlButtonsByPage[page] || [];

    // Check if there are any buttons in this page that aren't in userControl
    return buttonsInComponent.some(
      (button) => !buttonsInUserControl.includes(button)
    );
  });

  // Get available buttons for a specific page (only buttons not in localStorage)
  const getAvailableButtons = (page) => {
    const buttonsInComponent = buttonComponentsByPage[page] || [];
    const buttonsInUserControl = userControlButtonsByPage[page] || [];

    return buttonsInComponent
      .filter((button) => !buttonsInUserControl.includes(button))
      .map((button) => ({
        value: button,
        label: button,
      }));
  };

  const handlePermissionChange = (button, userId, page) => {
    setPermissions((prev) => ({
      ...prev,
      [button]: {
        ...prev[button],
        [userId]: !prev[button]?.[userId],
      },
    }));
    if (validationErrors[button]) {
      setValidationErrors((prev) => ({
        ...prev,
        [button]: false,
      }));
    }
  };

  const validatePermissions = () => {
    const errors = {};
    let hasErrors = false;

    // Check each button has at least one checkbox selected
    getAvailableButtons(selectedPage).forEach((button) => {
      const buttonPermissions = permissions[button.value] || {};
      const hasSelectedPermission = Object.values(buttonPermissions).some(
        (value) => value
      );

      if (!hasSelectedPermission) {
        errors[button.value] = true;
        hasErrors = true;
      }
    });

    setValidationErrors(errors);
    return !hasErrors;
  };
  const handleSubmit = async () => {
    if (!validatePermissions()) {
      toast({
        title: "Validation Error",
        description: "Please select at least one permission for each button",
        variant: "destructive",
       
      });
      return;
    }
    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Convert permissions object to API format
      const permissionsToSubmit = Object.entries(permissions)
        .map(([button, userPerms]) => {
          const activeUserTypes = Object.entries(userPerms)
            .filter(([_, isChecked]) => isChecked)
            .map(([userId]) => userId);

          return {
            pages: selectedPage,
            button: button,
            usertype: activeUserTypes.join(","),
            status: "Active",
          };
        })
        .filter((item) => item.usertype.length > 0);

      // Submit each permission
      for (const permission of permissionsToSubmit) {
        await axios.post(
          "https://southindiagarmentsassociation.com/public/api/panel-create-usercontrol",
          permission,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast({
        title: "Success",
        description: "User controls created successfully",
        variant: "success",
      });

      fetchPermissions();
      navigate("/user-management");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to create user controls",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Page>
         <div className="flex pr-4 pl-4 items-center justify-between mb-6">
        <div className="flex text-left text-xl text-gray-800 font-[400]">
          Create New Role
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Select Page</label>
          <ShadcnSelect value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Page" />
            </SelectTrigger>
            <SelectContent>
              {availablePages.map((page) => (
                <SelectItem key={page} value={page}>
                  {page}
                </SelectItem>
              ))}
            </SelectContent>
          </ShadcnSelect>
        </div>

        {selectedPage && (
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
                {getAvailableButtons(selectedPage).map((button) => (
                  <tr key={button.value} className={validationErrors[button.value] ? "bg-red-50" : ""}>
                    <td className="px-4 py-3 text-sm w-96 text-gray-900">
                      {button.label}
                      {validationErrors[button.value] && (
                        <span className="text-red-500 text-xs ml-2">
                          Select at least one permission
                        </span>
                      )}
                    </td>
                    {userTypes.map((user) => (
                      <td key={user.id} className="px-4 py-3 text-sm">
                        <Checkbox
                          checked={
                            permissions[button.value]?.[user.id] || false
                          }
                          onCheckedChange={() =>
                            handlePermissionChange(
                              button.value,
                              user.id,
                              selectedPage
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedPage && (
          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2"
              variant="default"
              disabled={isLoading}
            >
              <Save className="h-4 w-4" />
              Create Roles
            </Button>
          </div>
        )}
      </div>
    </Page>
  )
}

export default CreateButtonRole