import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Printer } from "lucide-react";
import BASE_URL from "@/config/BaseUrl";
import ReactToPrint, { useReactToPrint } from "react-to-print";

const RegistrationView = ({ id }) => {
  const printRef = useRef(null);

  const {
    data: registrationDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["registrationDetails", id],
    queryFn: async () => {
      // Only fetch if registrationId is available
      if (!id) return null;
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-register-by-id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.registerData;
    },
    enabled: !!id, // Only run query if registrationId exists
  });
  // fair_no_of_people

  const handlePrintMultiple = useReactToPrint({
    content: () => printRef.current,
    documentTitle: registrationDetails
      ? `Registration-${registrationDetails.fair_person_name}`
      : "Registration",
    pageStyle: `
      @page {
        size: auto;
        margin: 0;
      }
      @media print {
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          -webkit-print-color-adjust: exact;
        }
      }
    `,
    onAfterPrint: () => {
      if (registrationDetails?.fair_no_of_people > 1) {
        const remainingPrints = registrationDetails.fair_no_of_people - 1;
        registrationDetails.fair_no_of_people = remainingPrints;
        if (remainingPrints > 0) {
          setTimeout(handlePrintMultiple, 150);
        }
      }
    },
  });

  // If no registration is selected
  if (!id) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Registration Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select a registration to view details
          </p>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full">
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
    <Card className="w-full relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 z-10"
        onClick={() => {
          if (registrationDetails) {
            registrationDetails.fair_no_of_people =
              registrationDetails.fair_no_of_people || 1;
          }
          handlePrintMultiple();
        }}
      >
        <Printer className="h-4 w-4" />
      </Button>

      <CardContent className="p-0">
        {registrationDetails ? (
          <div
            ref={printRef}
            className="w-full print:h-96 print:relative max-w-sm mx-auto shadow-lg print:border-none bg-white  rounded-lg overflow-hidden print:shadow-none print:border print:rounded-none "
          >
            {/* Photo Section */}
            <div className="w-full h-64 print:w-40 print:absolute print:h-40 print:top-2 print:left-2 bg-gray-200 flex items-center justify-center">
              {registrationDetails.fair_person_image ? (
                <img
                  src={`${BASE_URL}/idcard_images/${registrationDetails.fair_person_image}`}
                  alt="Registrant"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500">No Image</div>
              )}
            </div>

            {/* Details Section */}
            <div className=" p-12 text-center print:absolute  print:bottom-14 print:left-1/2 print:transform print:-translate-x-1/2 ">
              <div className="mb-2">
                {/* <p className="text-sm text-gray-600">Firm Name</p> */}
                <h2 className="text-xl print:w-80 font-bold text-gray-800">
                  {registrationDetails.fair_firm_name || "N/A"}
                </h2>
              </div>

              <div>
                {/* <p className="text-sm text-gray-600">Person Name</p> */}
                <h3 className="text-md font-semibold text-gray-700">
                  {registrationDetails.fair_person_name || "N/A"}
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-center p-4">
            No details available
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RegistrationView;
