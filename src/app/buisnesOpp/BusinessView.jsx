import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Printer, FileText } from "lucide-react";
import BASE_URL from "@/config/BaseUrl";
import Page from '../dashboard/page'
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const BusinessView = () => {
    const componentRef = useRef();
    const { id } = useParams();
    
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

    const { 
        data: businessData, 
        isFetching, 
        isError,
        refetch 
    } = useQuery({
        queryKey: ["businessOpportunity"],
        queryFn: fetchBusinessOpp,
        enabled: !!id,
    });

    // Handle print
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `BusinessOpportunity-${businessData?.full_name || 'Details'}`,
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

    // Handle loading and error states
    if (!id) return (
        <Page>
            <div>No Business Opportunity Selected</div>
        </Page>
    );

    // Render loading state
    if (isFetching) {
        return (
            <Page>
                <div className="flex justify-center items-center h-full">
                    <Button disabled>
                        <Loader2 className=" h-4 w-4 animate-spin" />
                        Loading Business Details
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
                            Error Fetching Business details
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
                    Print Business Details
                </Button>

                <div ref={componentRef} className="p-6">
                    {/* Header */}
                    <div className="flex flex-row items-center gap-4 justify-between mb-6 pb-4 border-b-2 border-gray-300">
                        <div>
                            <h1 className="text-2xl font-bold">{businessData.full_name}</h1>
                            <h4 className="w-96 text-sm">{businessData.looking_for ? `Looking For ${businessData.looking_for}` : ""}</h4>
                        </div>
                        {/* <div className="text-xl text-gray-600">
                            <span>Investment Amount: ₹{businessData.investment_amount}</span>
                        </div> */}
                    </div>

                    {/* Sections */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Requester Details */}
                        <div>
                            <h2 className="text-xl font-semibold border-b mb-3">My Details</h2>
                      <div className="grid grid-cols-1 print:grid-cols-2 lg:grid-cols-2 gap-6">
                              <DetailRow label="Full Name" value={businessData.full_name} />
                            <DetailRow label="About You" value={businessData.about_you} />
                            <DetailRow label="Mobile" value={businessData.mobile_no} />
                            <DetailRow label="Email" value={businessData.email} />
                            {businessData?.brand_name && (

<DetailRowAddress label="Brand Name" value={businessData.brand_name} />
                            )}
                            <DetailRowAddress  label="Address" value={businessData.address} />
                      </div>
                        </div>
<div className="grid grid-cols-2 gap-6">
<div>
                            <h2 className="text-xl font-semibold border-b mb-3">My Requirement</h2>
                            <DetailRow label="Product Type" value={businessData.product_type} />
                        {businessData.looking_for && (
                            <>
                            <DetailRow label="Looking For" value={businessData.looking_for} />
                            </>
                        )}    
                            <DetailRow label="Offer by him" value={businessData.what_you_offer} />
                            <DetailRow label="Investment Amount" value={`₹ ${businessData.investment_amount}`} />
                        </div>

                        {/* Location Details */}
                        <div>
                            <h2 className="text-xl font-semibold border-b mb-3">Location Details</h2>
                            <DetailRow label="Area" value={businessData.which_area} />
                            <DetailRow label="State" value={businessData.which_state} />
                        </div>
</div>
                        {/* Business Details */}
                       

                        {/* Empty div to maintain grid structure */}
                        <div></div>
                    </div>

                    {/* Notes */}
                    {businessData.buss_note && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold border-b mb-3">Notes</h2>
                            <p className="text-sm">{businessData.buss_note}</p>
                        </div>
                    )}
                </div>
            </div>
        </Page>
    );
}

// Utility Component
const DetailRow = ({ label, value }) => (
    <div className="flex justify-between text-sm py-1 border-b">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value || '-'}</span>
    </div>
);
const DetailRowAddress = ({ label, value }) => (
    <div className="col-span-1 print:col-span-2 lg:col-span-2 flex justify-between text-sm py-1 border-b">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value || '-'}</span>
    </div>
);

export default BusinessView;