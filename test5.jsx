import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BASE_URL from "@/config/BaseUrl";
import Page from '../dashboard/page';

const TestView = () => {
  const componentRef = useRef();
  const { id } = useParams();

  const {
    data: participantDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["participantDetails", id],
    queryFn: async () => {
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

  // Handle print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Participant-${participantDetails?.name_of_firm || 'Details'}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 2mm;
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

  // Handle loading and error states
  if (!id) return <div>No Participant Selected</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching participant details</div>;

  return (
    <Page>
      <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
        <Card 
          ref={componentRef} 
          className="w-full max-w-4xl mx-auto shadow-lg border-2 border-gray-100"
        >
          <CardHeader className="bg-gray-100 p-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {participantDetails.name_of_firm}
              </CardTitle>
              <Button onClick={handlePrint} variant="outline" className="text-gray-600 hover:bg-gray-200">
                Print Details
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Company Details</h3>
                <div className="space-y-2">
                  <DetailRow label="Brand Name" value={participantDetails.brand_name} />
                  <DetailRow label="Event Year" value={participantDetails.event_year} />
                  <DetailRow label="GST No" value={participantDetails.gst_no || 'Not Provided'} />
                  <DetailRow label="Manufacturer" value={participantDetails.manufacturer_name} />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact Information</h3>
                <div className="space-y-2">
                  <DetailRow label="Email" value={participantDetails.profile_email} />
                  <DetailRow label="Website" value={participantDetails.profile_website || 'Not Provided'} />
                  <DetailRow label="Distributor Address" value={participantDetails.distributor_agent_address} />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-2  md:grid-cols-2 gap-6">
              {/* Representatives */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Representatives</h3>
                <div className="space-y-2">
                  <DetailRow label="Rep 1" value={participantDetails.rep1_name} />
                  <DetailRow label="Mobile 1" value={participantDetails.rep1_mobile} />
                  <DetailRow label="Rep 2" value={participantDetails.rep2_name} />
                  <DetailRow label="Mobile 2" value={participantDetails.rep2_mobile} />
                </div>
              </div>

              {/* Product Categories */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Product Categories</h3>
                <div className="space-y-2">
                  <DetailRow 
                    label="Product Description" 
                    value={participantDetails.product_description} 
                  />
                  <div className="flex gap-2 mt-2">
                    {participantDetails.category_men === "Yes" && <Badge variant="secondary">Men</Badge>}
                    {participantDetails.category_women === "Yes" && <Badge variant="secondary">Women</Badge>}
                    {participantDetails.category_kids === "Yes" && <Badge variant="secondary">Kids</Badge>}
                    {participantDetails.category_accessories === "Yes" && <Badge variant="secondary">Accessories</Badge>}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              {/* Event Participation */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Event Participation</h3>
                <div className="space-y-2">
                  <DetailRow label="Fair Guide" value={participantDetails.fair_guide} />
                  <DetailRow label="Branding at Venue" value={participantDetails.branding_at_venue} />
                  <DetailRow label="Fashion Show" value={participantDetails.fashion_show} />
                  <DetailRow label="Sponsorship" value={participantDetails.be_an_sponsor} />
                </div>
              </div>

              {/* Stall & Payment Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Stall & Payment</h3>
                <div className="space-y-2">
                  <DetailRow label="Stall Size" value={participantDetails.profile_stall_size} />
                  <DetailRow 
                    label="Amount" 
                    value={`₹${participantDetails.profile_amount.toLocaleString()}`} 
                  />
                  <DetailRow label="Payment Method" value={participantDetails.profile_payment} />
                  <div className="mt-2">
                    <Badge variant="outline" className="text-sm">
                      {participantDetails.profile_status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
};

// Reusable component for consistent detail row formatting
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-800 text-right">{value}</span>
  </div>
);

export default TestView;



// it can go 