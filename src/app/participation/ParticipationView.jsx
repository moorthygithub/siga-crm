import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Printer } from "lucide-react";
import BASE_URL from "@/config/BaseUrl";
import { useReactToPrint } from "react-to-print";

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b last:border-b-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-right">{value || "-"}</span>
  </div>
);

const ParticipationView = ({ id }) => {
    const componentRef = useRef();
  const {
    data: participantDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["participantDetails", id],
    queryFn: async () => {
      // Only fetch if registrationId is available
      if (!id) return null;
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-participant-by-id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.participant;
    },
    enabled: !!id, 
  });

   const handlePrint = useReactToPrint({
     content: () => componentRef.current,
     documentTitle: `Participant-${participantDetails?.name_of_firm || 'Details'}`,
     pageStyle: `
       @page {
         size: A4;
         margin: 4mm;
       }
       @media print {
         body {
         border:1px solid #000;
           margin: 1mm;
           padding: 1mm;
           min-height:100vh
         }
       }
     `
   });

  // If no registration is selected
  if (!id) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Participant Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select a Participant to view details
          </p>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full  ">
        <CardHeader>
          <CardTitle>Loading Details</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (isError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Unable to fetch registration details</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="w-full relative  ">
      <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-0  right-0 z-10"
                  onClick={() => {
                  
                    handlePrint();
                  }}
                >
                  <Printer className="h-4 w-4" />
                </Button>
      
      <CardHeader className=" p-3 bg-gradient-to-r from-slate-300 via-gray-200 to-gray-100">
        <CardTitle className="text-lg font-bold">
          {participantDetails.name_of_firm}
         
        </CardTitle>
        <div className="flex flex-row justify-between ">
          <p className=" text-sm text-muted-foreground">
            {participantDetails.brand_name}
          </p>
          <p className=" text-sm text-muted-foreground">
            {participantDetails.profile_stall_no || "Stall No"}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p className=" text-sm text-muted-foreground">
            {participantDetails.gst_no || "Gst No.."}
          </p>
          <p className=" text-sm text-muted-foreground">
            {participantDetails.profile_stall_size || "Stall Size"}
          </p>
        </div>
      </CardHeader>
      <CardContent className="max-h-[24rem] mt-2  overflow-y-auto">
        <div className="space-y-4   ">
          {/* Firm Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">
              Firm Information
            </h3>

            {/* <DetailRow label="GST Number" value={participantDetails.gst_no} /> */}
            <DetailRow
              label="Manufacturer Name"
              value={participantDetails.manufacturer_name}
            />
          </div>

          {/* Product Categories Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">
              Product Categories
            </h3>
            <div className="flex items-center gap-1 justify-between">
              <DetailRowCheck
                label="M"
                value={participantDetails.category_men}
                isCheckbox
              />
              <DetailRowCheck
                label="W"
                value={participantDetails.category_women}
                isCheckbox
              />
              <DetailRowCheck
                label="K"
                value={participantDetails.category_kids}
                isCheckbox
              />
              <DetailRowCheck
                label="A"
                value={participantDetails.category_accessories}
                isCheckbox
              />
            </div>
            <div>
              <DetailRowCheck value={participantDetails.product_description} />
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">
              Contact Information
            </h3>
            <DetailRow label="Email" value={participantDetails.profile_email} />
          </div>

          {/* Representatives Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">
              Representatives
            </h3>
            <div className="flex items-center justify-between">
              <DetailRow value={participantDetails.rep1_name} />
              <DetailRow value={participantDetails.rep1_mobile} />
            </div>
            <div className="flex items-center justify-between">
              <DetailRow value={participantDetails.rep2_name} />
              <DetailRow value={participantDetails.rep2_mobile} />
            </div>
          </div>

          {/* Fair Participation Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">
              Fair Participation Details
            </h3>
            <DetailRow
              label="Fair Guide"
              value={participantDetails.fair_guide}
            />
            <DetailRow
              label="Branding at Venue"
              value={participantDetails.branding_at_venue}
            />
            <DetailRow
              label="Fashion Show"
              value={participantDetails.fashion_show}
            />
            <DetailRow
              label="Sponsorship"
              value={participantDetails.be_an_sponsor}
            />
          </div>

          {/* Stall and Payment Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">
              Stall and Payment Details
            </h3>
            {/* <DetailRow
              label="Stall Size"
              value={participantDetails.profile_stall_size}
            />
            <DetailRow
              label="Stall Number"
              value={participantDetails.profile_stall_no}
            /> */}
            <DetailRow
              label="Amount"
              value={participantDetails.profile_amount}
            />
            <DetailRow
              label="Payment Method"
              value={participantDetails.profile_payment}
            />
            <DetailRow
              label="Remarks"
              value={participantDetails.profile_remark}
            />
            <DetailRow
              label="Status"
              value={participantDetails.profile_status}
            />
            <DetailRow
              label="New Stall Number"
              value={participantDetails.profile_new_stall_no}
            />
            <DetailRow
              label="Received Amount"
              value={participantDetails.profile_received_amt}
            />
          </div>
        </div>
      </CardContent>
      <div ref={componentRef} className="p-6 hidden print:block">
        {/* Header */}
        <div className="flex flex-row items-center gap-4 justify-between mb-6 pb-4 border-b-2 border-gray-300">
       <div>
       <h1 className="text-2xl font-bold">{participantDetails.name_of_firm}</h1>
       <h4 className="w-96 text-sm">{participantDetails.distributor_agent_address}</h4>
       </div>
          <div className="text-xl text-gray-600">
            <span>{participantDetails.brand_name}</span>

          </div>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-2 gap-6">
          {/* Firm Information */}
          <div>
            <h2 className="text-xl font-semibold border-b mb-3">Firm Information</h2>
            <DetailRowPrint label="Manufacturer Name" value={participantDetails.manufacturer_name} />
            <DetailRowPrint label="GST Number" value={participantDetails.gst_no} />
            <DetailRowPrint label="Distributer" value={participantDetails.distributor_agent_name} />
          </div>

          {/* Product Categories */}
          <div>
            <h2 className="text-xl font-semibold border-b mb-3">Product Categories</h2>
            <div className="flex gap-4 mb-3">
              <CategoryCheckbox label="Men" checked={participantDetails.category_men === 'Yes'} />
              <CategoryCheckbox label="Women" checked={participantDetails.category_women === 'Yes'} />
              <CategoryCheckbox label="Kids" checked={participantDetails.category_kids === 'Yes'} />
              <CategoryCheckbox label="Accessories" checked={participantDetails.category_accessories === 'Yes'} />
            </div>
            <DetailRowPrint label="Product Description" value={participantDetails.product_description} />
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold border-b mb-3">Contact Information</h2>
            <DetailRowPrint label="Email" value={participantDetails.profile_email} />
          </div>

          {/* Representatives */}
          <div>
            <h2 className="text-xl font-semibold border-b mb-3">Representatives</h2>
            <div className="space-y-2">
              <div className=" border-b pb-1">
                <span>Rep 1: {participantDetails.rep1_name} {participantDetails.rep1_mobile ?  `- ${participantDetails.rep1_mobile}`:""}</span>
          
              </div>
              <div className="flex justify-between">
                <span>{participantDetails.rep2_name ? `Rep 2: ${participantDetails.rep2_name}`:""}   {participantDetails.rep2_mobile ?  `- ${participantDetails.rep2_mobile}`:""}</span>
               
              </div>
            </div>
          </div>
          </div>
          {/* Fair Participation Details */}
          <div className="mt-6">
            <h2 className="text-xl   font-semibold border-b mb-3">Fair Advertisement Details</h2>
      
            <div className="flex  gap-4 mb-3">
              <CategoryCheckbox label="Fair Guide" checked={participantDetails.fair_guide === 'Yes'} />
              <CategoryCheckbox label="Branding at Venue" checked={participantDetails.branding_at_venue === 'Yes'} />
              <CategoryCheckbox label="Fashion Show" checked={participantDetails.fashion_show === 'Yes'} />
              <CategoryCheckbox label="Sponsorship" checked={participantDetails.be_an_sponsor === 'Yes'} />
            </div>
          </div>

          {/* Stall and Payment Details */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold border-b mb-3">Stall and Payment Details</h2>
            <div className=" grid grid-cols-2 gap-5">
            <DetailRowPrint label="Amount" value={participantDetails.profile_amount} />

            <DetailRowPrint label="Remarks" value={participantDetails.profile_remark} />
            <DetailRowPrint label="Status" value={participantDetails.profile_status} />
            <DetailRowPrint label="Stall" value={`${participantDetails.profile_new_stall_no} (${participantDetails.profile_stall_size})`}  />
            </div>
           
          </div>



 
      </div>
    </Card>
  );
};

const DetailRowCheck = ({ label, value, isCheckbox = false }) => {
  return (
    <div className="flex justify-start gap-2 py-2 border-b last:border-b-0 items-center">
      {isCheckbox ? (
        <div
          className={`h-4 w-4 border-[1px] border-black rounded ${
            value === "Yes" ? "bg-black" : "bg-white"
          }`}
        ></div>
      ) : (
        <span className="text-sm font-medium ">{value || "-"}</span>
      )}
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
};
const DetailRowPrint = ({ label, value }) => (
  <div className="flex justify-between text-sm py-1 border-b">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value || 'N/A'}</span>
  </div>
);

const CategoryCheckbox = ({ label, checked }) => (
  <div className="flex items-center gap-2">
    <input
    type="checkbox" 
    checked={checked}
    readOnly
    
    className="w-4 h-4  accent-black cursor-default"
    />
    <span className="text-sm">{label}</span>
  </div>
);

export default ParticipationView;
