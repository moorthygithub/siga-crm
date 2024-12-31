import { useToast } from "@/hooks/use-toast";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "@/config/BaseUrl";
import { Loader2, SquarePlus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const CreateEnquiry = ({ selectedEvent }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name_of_firm: "",
    brand_name: "",
    rep1_name: "",
    rep1_mobile: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "rep1_mobile") {
      const numberOnly = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        [name]: numberOnly,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // if (
    //   !formData.name_of_firm ||
    //   !formData.brand_name ||
    //   !formData.rep1_name ||
    //   !formData.rep1_mobile
    // ) {
    //   toast({
    //     title: "Error",
    //     description: "Please fill all fields",
    //     variant: "destructive",
    //   });
    //   return;
    // }
    if (formData.rep1_mobile.length !== 10) {
        toast({
          title: "Error",
          description: "Mobile number must be 10 digits",
          variant: "destructive",
        });
        return;
      }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${BASE_URL}/api/panel-create-enquiry`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Success",
        description: "Enquiry created successfully",
      });

      setFormData({
        name_of_firm: "",
        brand_name: "",
        rep1_name: "",
        rep1_mobile: "",
      });
      await queryClient.invalidateQueries(["allParticipants", selectedEvent]);

      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to create enquiry",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-2">
          <SquarePlus className="h-4 w-4" /> Enquiry
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Enquiry</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name_of_firm">Firm Name</Label>
            <Input
              id="name_of_firm"
              name="name_of_firm"
              value={formData.name_of_firm}
              onChange={handleInputChange}
              placeholder="Enter firm name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="brand_name">Brand Name</Label>
            <Input
              id="brand_name"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleInputChange}
              placeholder="Enter brand name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rep1_name">Representative Name</Label>
            <Input
              id="rep1_name"
              name="rep1_name"
              value={formData.rep1_name}
              onChange={handleInputChange}
              placeholder="Enter representative name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rep1_mobile">Mobile Number</Label>
            <Input
              id="rep1_mobile"
              name="rep1_mobile"
              value={formData.rep1_mobile}
              onChange={handleInputChange}
              placeholder="Enter mobile number"
              type="tel"
              maxLength={10}
            />
            <div className="text-xs text-gray-500">
              {formData.rep1_mobile.length}/10 digits
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Enquiry"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEnquiry;
