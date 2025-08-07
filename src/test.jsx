her eis my refe code "import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Printer, FileText } from "lucide-react";
import BASE_URL from "@/config/BaseUrl";
import Page from '../dashboard/page'
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const AmountView = () => {
    const componentRef = useRef();
    const { id } = useParams();
    
    const fetchDuesReconciliation = async () => {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
            `${BASE_URL}/api/panel-fetch-duesreconcil-by-id/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return data.duesreconcil;
    };

    const { 
        data: duesData, 
        isFetching, 
        isError,
        refetch 
    } = useQuery({
        queryKey: ["duesReconciliation"],
        queryFn: fetchDuesReconciliation,
        enabled: !!id,
    });

    // Handle print
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `DuesReconciliation-${duesData?.company_firm || 'Details'}`,
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

    const handleAttachmentView = (attachmentUrl) => {
        window.open(attachmentUrl, "_blank");
    };

    // Handle loading and error states
    if (!id) return (
        <Page>
            <div>No Participant Selected</div>
        </Page>
    );

    // Render loading state
    if (isFetching) {
        return (
            <Page>
                <div className="flex justify-center items-center h-full">
                    <Button disabled>
                        <Loader2 className=" h-4 w-4 animate-spin" />
                        Loading Payment Details
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
                            Error Fetching Payment details
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
            <div>
                <Button 
                    onClick={handlePrint} 
                    className="mb-4 px-4 py-2"
                >
                    Print Payment Details
                </Button>

                <div ref={componentRef} className="p-6">
                    {/* Header */}
                    <div className="flex flex-row items-center gap-4 justify-between mb-6 pb-4 border-b-2 border-gray-300">
                        <div>
                            <h1 className="text-2xl font-bold">{duesData.contact_name}</h1>
                            <h4 className="w-96 text-sm">{duesData.company_firm}</h4>
                        </div>
                        <div className="text-xl text-gray-600">
                            <span>Due Amount: ₹{duesData.due_amount}</span>
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Company Details */}
                        <div>
                            <h2 className="text-xl font-semibold border-b mb-3">Supplier Details</h2>
                            <DetailRow label="Company/Firm" value={duesData.company_firm} />
                            <DetailRow label="Contact Name" value={duesData.contact_name} />
                            <DetailRow label="Mobile" value={duesData.contact_mobile} />
                            <DetailRow label="Email" value={duesData.contact_email} />
                            <DetailRow label="Address" value={duesData.address} />
                        </div>

                        {/* Defaulter Details */}
                        <div>
                            <h2 className="text-xl font-semibold border-b mb-3">Buyer Details (Defaulter)</h2>
                            <DetailRow label="Company/Firm" value={duesData.d_company_firm} />
                            <DetailRow label="Contact Name" value={duesData.d_contact_name} />
                            <DetailRow label="Mobile" value={duesData.d_contact_mobile} />
                            <DetailRow label="Email" value={duesData.d_contact_email} />
                            <DetailRow label="Address" value={duesData.d_address} />
                        </div>

                        {/* Payment Details */}
                        <div>
                            <h2 className="text-xl font-semibold border-b mb-3">Payment Details</h2>
                            <DetailRow label="Due Amount" value={`₹ ${duesData.due_amount}`} />
                            <DetailRow label="Pending Since" value={duesData.pending_from} />
                        </div>

                        {/* Attachments */}
                        <div>
                            <h2 className="text-xl font-semibold border-b mb-3">Attachments</h2>
                            <div className="flex flex-row items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => handleAttachmentView(`https://agsrebuild.store/public/app_images/ledger/${duesData.ledger}`)}
                                    className="flex items-center gap-2 w-fit"
                                >
                                    <FileText className="h-4 w-4" /> Ledger
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleAttachmentView(`https://agsrebuild.store/public/app_images/authorisation_letter/${duesData.authorisation_letter}`)}
                                    className="flex items-center gap-2 w-fit"
                                >
                                    <FileText className="h-4 w-4" /> Authorization Letter
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {duesData.dus_note && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold border-b mb-3">Notes</h2>
                            <p className="text-sm">{duesData.dus_note}</p>
                        </div>
                    )}
                </div>
            </div>
        </Page>
    );
}

// Utility Components (same as in reference code)
const DetailRow = ({ label, value }) => (
    <div className="flex justify-between text-sm py-1 border-b">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value || 'N/A'}</span>
    </div>
);

export default AmountView;" and here ismy code "import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Printer, FileText, Loader2 } from "lucide-react";
import Page from "../dashboard/page";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import BASE_URL from "@/config/BaseUrl";

const BusinessView = () => {
    const { id } = useParams();
  const printRef = useRef(null);

  const fetchBusinessOpp = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${BASE_URL}/api/panel-fetch-busopp-by-id/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data.busopp;
  };
  const { data, isFetching, error,refetch } = useQuery({
    queryKey: ["busOppurtunity"],
    queryFn: fetchBusinessOpp,
  });

 

  if (!id) {
    return (
        <Page>
            <div>No ID provided</div>;
        </Page>
    )
  }
  if (isFetching)
    return (
        <Page>
          <div className="flex justify-center items-center h-full">
            <Button disabled>
              <Loader2 className=" h-4 w-4 animate-spin" />
              Loading Business View
            </Button>
          </div>
        </Page>
      );
  if (error) {
    return (
        <Page>
          <Card className="w-full max-w-md mx-auto mt-10">
            <CardHeader>
              <CardTitle className="text-destructive">
                Error Fetching Business View
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
         <div className="container mx-auto p-4">
        <Card className="w-full relative ">
          <ReactToPrint
            trigger={() => (
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 z-10"
              >
                <Printer className="h-4 w-4" />
              </Button>
            )}
            content={() => printRef.current}
            documentTitle={`BusinessExpanison-${data.full_name}`}
            pageStyle={`
                            @page {
                                size: auto;
                                margin: 2mm;
                            }
                            @media print {
                                body {
                                 border: 1px solid #000;
                                    margin: 10mm;
                                     padding: 10mm;
                                     min-height:100vh
                                }
                                .print-hide {
                                    display: none;
                                }
                            }
                        `}
          />
          <div ref={printRef}>
            <CardHeader className="  flex flex-row justify-between items-center">
              <CardTitle>Business Expansion Details</CardTitle>
            
            </CardHeader>
            <CardContent>
              {/* Company Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Requested By</h3>
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Full Name" value={`${data.full_name} - ${data.about_you}`} />
                  <InfoItem label="Mobile" value={data.mobile_no} />
                  <InfoItem label="Email" value={data.email} />
                  <InfoItem label="Brand Name" value={data.brand_name} />
                  <InfoItem label="Product Type" value={data.product_type} />
                  {/* <InfoItem label="About You" value={data.about_you} />  */}
                  <InfoItem label="Address" value={data.address} />
                </div>
              </div>



              <Separator className="my-4" />
              <div className="mb-6 ">
                <h3 className="text-lg font-semibold mb-3">
                  Offer & Investment
                </h3>
                <div className="grid grid-cols-1 gap-4">
                <InfoItem label="Looking for" value={data.looking_for} />
                 <InfoItem label="Offer" value={data.what_you_offer} />
                  <InfoItem label="Investment Amount" value={data.investment_amount} />
                  
                </div>
              </div>

          
              <Separator className="my-4" />
              {/* Defaulter Details */}
              <div className="mb-6 ">
                <h3 className="text-lg font-semibold mb-3">
                  Other Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
               

                  <InfoItem label="Area" value={data.which_area} />
                  <InfoItem label="State" value={data.which_state} />
                  
                </div>
              </div>
             

              {/* Notes */}
              {data.buss_note && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Notes</h3>
                  <p>{data.buss_note}</p>
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
  </Page>
  )
}


const InfoItem = ({ label, value }) => (
  <div>
    <span className="text-muted-foreground  text-sm">{label}</span>
    <p className="font-medium whitespace-pre-line  break-words">
      {value || "N/A"}
    </p>
  </div>
);


export default BusinessView
"
i want layout nad starture as same as refrence code and also in print too nad but dont remove any conettent alll content shoudl be there and giveme full code of BusinessView