import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import moment from "moment";
import { ToWords } from "to-words";
import { Loader2, Printer } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "@/config/BaseUrl";
import Page from "../dashboard/page";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const MsmeEdit = () => {
        const { id } = useParams();
          const { toast } = useToast()
    const containerRef = useRef();
    const toWords = new ToWords();

    const [loading, setLoading] = useState(false);
    const naviagte = useNavigate();
    const [formData, setFormData] = useState({
      firm_name: "",
      director: "",
      designation: "",
      mobile_no: "",
      email_id: "",
      dob: "",
      gender: "",
      aadhar_card_details: "",
      uam: "",
      gst: "",
      pan: "",
      add1_building: "",
      add1_village: "",
      add1_street: "",
      add1_area: "",
      add1_district: "",
      add1_state: "",
      add1_pincode: "",
      bank_name: "",
      bank_account_no: "",
      bank_branch: "",
      bank_ifsc: "",
      bank_micr: "",
      bank_holder: "",
      amount: "",
      amount_words: "",
      exhibition_name: "", //
      exhibition_at: "", //
      exhibition_from: "", //
      exhibition_to: "", //
      exhibition_by: "", //
      bank_address: "",
      bank_telephone: "",
      bank_email_id: "",
      bank_account_type: "",
      bank_neft: "",
      undertaking_i: "",
      undertaking_ms: "",
      undertaking_product: "",
      undertaking_eligible: "",
      undertaking_stall_no: "",
      msme_unit: "",
      msme_website: "",
      msme_comment: "",
      msme_visitor: "",
      msme_value: "",
      msme_orders_booked: "",
      msme_other: "",
      msme_participant: "",
      msme_1_country: "",
      msme_2_country: "",
      msme_1_field: "",
      msme_2_field: "",
      msme_1_description: "",
      msme_2_description: "",
      msme_1_contact: "",
      msme_2_contact: "",
      msme_suggestion: "",
      msme_pic_1: "",
      msme_pic_2: "",
      checklist_cl_y: "No",
      checklist_cl_p: "",
      checklist_cf_y: "No",
      checklist_cf_p: "",
      checklist_uam_y: "No",
      checklist_uam_p: "",
      checklist_fd_y: "No",
      checklist_fd_p: "",
      checklist_op_y: "No",
      checklist_op_p: "",
      checklist_ob_y: "No",
      checklist_ob_p: "",
      checklist_oc_y: "No",
      checklist_oc_p: "",
      checklist_oi_y: "No",
      checklist_oi_p: "",
      checklist_pfb_y: "No",
      checklist_pfb_p: "",
      checklist_sccu_y: "No",
      checklist_sccu_p: "",
      checklist_scca_y: "No",
      checklist_scca_p: "",
      checklist_pan_y: "No",
      checklist_pan_p: "",
      checklist_gst_y: "No",
      checklist_gst_p: "",
      checklist_u_y: "No",
      checklist_u_p: "",
      category: "",
      type_of_unit: "",
      category_of_unit: "",
      product_manuf: "",
      feedback: "",
      ce_actual: "",
      ce_amount: "",
      sr_actual: "",
      sr_amount: "",
    });
  


       const {
          data: msmeData,
          isLoading: isMsmeLoading,
          isError: isMsmeError,
          refetch: refetchMsme,
        } = useQuery({
          queryKey: ["msme", id],
          queryFn: async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get(
              `${BASE_URL}/api/panel-fetch-msme-by-id/${id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return response.data.msme;
          },
          enabled: !!id, 
        });
    useEffect(() => {
      if (msmeData) {
        setFormData(prev => ({
          ...prev,
          firm_name: msmeData.firm_name || "",
          director: msmeData.director || "",
          designation: msmeData.designation || "",
          mobile_no: msmeData.mobile_no || "",
          email_id: msmeData.email_id || "",
          dob: msmeData.dob || "",
          gender: msmeData.gender || "",
          aadhar_card_details: msmeData.aadhar_card_details || "",
          uam: msmeData.uam || "",
          gst: msmeData.gst || "",
          pan: msmeData.pan || "",
          add1_building: msmeData.add1_building || "",
          add1_village: msmeData.add1_village || "",
          add1_street: msmeData.add1_street || "",
          add1_area: msmeData.add1_area || "",
          add1_district: msmeData.add1_district || "",
          add1_state: msmeData.add1_state || "",
          add1_pincode: msmeData.add1_pincode || "",


          exhibition_name: msmeData.exhibition_name || "",
          exhibition_at: msmeData.exhibition_at || "",
          exhibition_from: msmeData.exhibition_from || "",
          exhibition_to: msmeData.exhibition_to || "",
          exhibition_by: msmeData.exhibition_by || "",






          bank_name: msmeData.bank_name || "",
          bank_account_no: msmeData.bank_account_no || "",
          bank_branch: msmeData.bank_branch || "",
          bank_ifsc: msmeData.bank_ifsc || "",
          bank_micr: msmeData.bank_micr || "",
          bank_holder: msmeData.bank_holder || "",
          amount: msmeData.amount || "",
          amount_words: msmeData.amount_words || "",
          bank_telephone: msmeData.bank_telephone || "",
          bank_email_id: msmeData.bank_email_id || "",
          bank_account_type: msmeData.bank_account_type || "",
          bank_neft: msmeData.bank_neft || "",
          bank_address: msmeData.bank_address || "",
          undertaking_i: msmeData.undertaking_i || "",
          undertaking_ms: msmeData.undertaking_ms || "",
          undertaking_product: msmeData.undertaking_product || "",
          undertaking_eligible: msmeData.undertaking_eligible || "",
          undertaking_stall_no: msmeData.undertaking_stall_no || "",
          msme_unit: msmeData.msme_unit || "",
          msme_website: msmeData.msme_website || "",
          msme_comment: msmeData.msme_comment || "",
          msme_visitor: msmeData.msme_visitor || "",
          msme_value: msmeData.msme_value || "",
          msme_orders_booked: msmeData.msme_orders_booked || "",
          msme_other: msmeData.msme_other || "",
          msme_participant: msmeData.msme_participant || "",
          msme_1_country: msmeData.msme_1_country || "",
          msme_2_country: msmeData.msme_2_country || "",
          msme_1_field: msmeData.msme_1_field || "",
          msme_2_field: msmeData.msme_2_field || "",
          msme_1_description: msmeData.msme_1_description || "",
          msme_2_description: msmeData.msme_2_description || "",
          msme_1_contact: msmeData.msme_1_contact || "",
          msme_2_contact: msmeData.msme_2_contact || "",
          msme_suggestion: msmeData.msme_suggestion || "",
          msme_pic_1: msmeData.msme_pic_1 || "",
          msme_pic_2: msmeData.msme_pic_2 || "",
          checklist_cl_y: msmeData.checklist_cl_y || "No",
          checklist_cl_p: msmeData.checklist_cl_p || "",
          checklist_cf_y: msmeData.checklist_cf_y || "No",
          checklist_cf_p: msmeData.checklist_cf_p || "",
          checklist_uam_y: msmeData.checklist_uam_y || "No",
          checklist_uam_p: msmeData.checklist_uam_p || "",
          checklist_fd_y: msmeData.checklist_fd_y || "No",
          checklist_fd_p: msmeData.checklist_fd_p || "",
          checklist_op_y: msmeData.checklist_op_y || "No",
          checklist_op_p: msmeData.checklist_op_p || "",
          checklist_ob_y: msmeData.checklist_ob_y || "No",
          checklist_ob_p: msmeData.checklist_ob_p || "",
          checklist_oc_y: msmeData.checklist_oc_y || "No",
          checklist_oc_p: msmeData.checklist_oc_p || "",
          checklist_oi_y: msmeData.checklist_oi_y || "No",
          checklist_oi_p: msmeData.checklist_oi_p || "",
          checklist_pfb_y: msmeData.checklist_pfb_y || "No",
          checklist_pfb_p: msmeData.checklist_pfb_p || "",
          checklist_sccu_y: msmeData.checklist_sccu_y || "No",
          checklist_sccu_p: msmeData.checklist_sccu_p || "",
          checklist_scca_y: msmeData.checklist_scca_y || "No",
          checklist_scca_p: msmeData.checklist_scca_p || "",
          checklist_pan_y: msmeData.checklist_pan_y || "No",
          checklist_pan_p: msmeData.checklist_pan_p || "",
          checklist_gst_y: msmeData.checklist_gst_y || "No",
          checklist_gst_p: msmeData.checklist_gst_p || "",
          checklist_u_y: msmeData.checklist_u_y || "No",
          checklist_u_p: msmeData.checklist_u_p || "",
          category: msmeData.category || "",
          type_of_unit: msmeData.type_of_unit || "",
          category_of_unit: msmeData.category_of_unit || "",
          product_manuf: msmeData.product_manuf || "",
          feedback: msmeData.feedback || "",
          ce_actual: msmeData.ce_actual || "",
          ce_amount: msmeData.ce_amount || "",
          sr_actual: msmeData.sr_actual || "",
          sr_amount: msmeData.sr_amount || "",
        }));
      }
    }, [msmeData]);

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      let newValue = value;
  
      const numericFields = [
        "mobile_no",
        "add1_pincode",
        "aadhar_card_details",
        "bank_account_no",
        "ce_actual",
        "ce_amount",
        "sr_actual",
        "sr_amount",
      ];
  
      const checklistPEnds = [
        "checklist_cl_p",
        "checklist_cf_p",
        "checklist_uam_p",
        "checklist_fd_p",
        "checklist_op_p",
        "checklist_ob_p",
        "checklist_oc_p",
        "checklist_oi_p",
        "checklist_pfb_p",
        "checklist_sccu_p",
        "checklist_scca_p",
        "checklist_pan_p",
        "checklist_gst_p",
        "checklist_u_p",
      ];
  
      if ([...numericFields, ...checklistPEnds].includes(name)) {
        if (!/^\d*$/.test(value)) return;
      }
  
      if (name === "mobile_no" && value.length > 10) return;
      if (name === "add1_pincode" && value.length > 6) return;
      if (name === "aadhar_card_details" && value.length > 12) return;
  
      let updatedForm = {
        ...formData,
        [name]: type === "checkbox" ? (checked ? "Yes" : "No") : newValue,
      };
  
      if (name === "amount") {
        updatedForm.amount_words = toWords.convert(Number(value), {
          currency: true,
        });
      }
  
      setFormData(updatedForm);
    };
  
    const handleUpdate = async (e) => {
        e.preventDefault();
        const hasAnyData = Object.values(formData).some(
          (value) => typeof value === "string" && value.trim() !== ""
        );
    
        if (!hasAnyData) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Please fill at least one field before submitting.",
          });
          return;
        }
        
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const payload = {
            ...formData,
            msme_id: id,
            event: msmeData?.event
          };
          console.table("apaylad",payload)
          const response = await axios.post(
            `${BASE_URL}/api/panel-update-msme`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            }
          );
    
          if (response?.data.code == 200) {
            toast({
              title: "Success",
              description: response?.data.msg || "Updated successfully",
            });
            naviagte(`/msme`);
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: response?.data.msg || "Failed to update, try again later",
            });
          }
        } catch (error) {
          console.error("❌ Error submitting form:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: error?.response?.data?.message || "Failed to update, try again later",
          });
        } finally {
          setLoading(false);
        }
      };

    if (isMsmeLoading) {
        return (
          <Page>
            <div className="flex justify-center items-center h-full">
              <Button disabled>
                <Loader2 className=" h-4 w-4 animate-spin" />
                Loading Msme
              </Button>
            </div>
          </Page>
        );
      }
    
      // Render error state
      if (isMsmeError) {
        return (
          <Page>
            <Card className="w-full max-w-md mx-auto mt-10">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Error Fetching Msme Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={() => refetchMsme()} variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </Page>
        );
      }
  return (
    <Page>
      <form onSubmit={handleUpdate} >
      <Button
  className="fixed top-4 right-4 px-6 py-2 transition-all duration-300"
  type="submit"
  disabled={loading}
>
  {loading ? (
    <div className="flex items-center gap-2">
      <Loader2 className="animate-spin h-5 w-5" />
      <span className="animate-pulse">Updating...</span>
    </div>
  ) : (
    "Update"
  )}
</Button>
   
           <div ref={containerRef} className="min-h-screen font-normal mt-16">
             {/* ...................................................ANNEXURE -1................................................ */}
   
             <div>
               <div className="max-w-4xl mt-5 mx-auto px-4">
                 <h1 className="text-end text-[11px]  font-bold ">Annexure-I </h1>
                 <h1 className="text-center text-[11px]  font-bold ">
                   Details of Agency Creation for PFMS
                 </h1>
               </div>
   
               <div className="max-w-4xl mx-auto text-[10px]">
                 <div className="overflow-x-auto  p-4">
                   <table className="table-auto w-full border border-black text-[10.5px]">
                     <thead>
                       <tr className=" border-b border-black">
                         <th className="p-2 border-r border-black  w-[5%]">
                           Sr. No.
                         </th>
                         <th className="p-2 border-r border-black w-[55%]">
                           Particulars
                         </th>
                         <th className="p-2">Details</th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           (i)
                         </td>
                         <td className="p-2 border-r border-black align-center">
                           Name of unit/enterprise
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                             name="firm_name"
                             value={formData?.firm_name || ""}
                             onChange={handleChange}
                             autoFocus
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td
                           className="p-2 border-r border-black text-center align-center"
                           rowSpan={4}
                         >
                           (ii)
                         </td>
                         <td className="p-2 border-r border-black">
                           Name of Director(s)/Proprietor/Partner(s)
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="director"
                             value={formData?.director || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black">Designation</td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="designation"
                             value={formData?.designation || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black">
                           Aadhaar linked Mobile No.
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="mobile_no"
                             value={formData?.mobile_no || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black">E-mail ID</td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="email_id"
                             value={formData?.email_id || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           (iii)
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Date of Birth (dd/mm/yyyy)
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="dob"
                             type="date"
                             value={formData?.dob || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           (iv)
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Gender (Male/Female/Transgender)
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="gender"
                             value={formData?.gender || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           (v)
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Aadhaar Card Details (Director(s)/Proprietor/Partner)
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="aadhar_card_details"
                             value={formData?.aadhar_card_details || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           (vi)
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           UAM/Udyam Registration Certificate (URC) No. &
                           Registration Date of Unit.
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="uam"
                             value={formData?.uam || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           (vii)
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           GST Number (if any), enclose a copy of certificate
                           issued by an Appropriate Authority
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="gst"
                             value={formData?.gst || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           (viii)
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           PAN Number
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="pan"
                             value={formData?.pan || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td
                           className="px-2 py-1 border-r border-black text-center align-center"
                           rowSpan={8}
                         >
                           (ix)
                         </td>
                         <td className="p-2 border-r font-bold border-black">
                           Complete Address of unit/enterprise
                         </td>
                         <td className="p-2"></td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r  border-black">
                           <span className="mr-2">a)</span> Block No. Building
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="add1_building"
                             value={formData?.add1_building || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r  border-black">
                           <span className="mr-2">b)</span> Village, Name of
                           premises
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="add1_village"
                             value={formData?.add1_village || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r  border-black">
                           <span className="mr-2">c)</span> Road/Street/Post Office
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="add1_street"
                             value={formData?.add1_street || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r  border-black">
                           <span className="mr-2">d)</span> Area location
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="add1_area"
                             value={formData?.add1_area || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r  border-black">
                           <span className="mr-2">e)</span> District
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="add1_district"
                             value={formData?.add1_district || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r  border-black">
                           <span className="mr-2">f)</span> State
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="add1_state"
                             value={formData?.add1_state || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r  border-black">
                           <span className="mr-2">g)</span> Pin code No.
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="add1_pincode"
                             value={formData?.add1_pincode || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td
                           className="p-2 border-r border-black text-center align-center"
                           rowSpan={7}
                         >
                           (x)
                         </td>
                         <td className="p-2 border-r font-bold border-black">
                           Bank Details:
                         </td>
                         <td className="p-2"></td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r  border-black">
                           <span className="mr-2">1)</span> Bank Name
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="bank_name"
                             value={formData?.bank_name || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r  border-black">
                           <span className="mr-2">2)</span> Bank Account No.
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="bank_account_no"
                             value={formData?.bank_account_no || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r  border-black">
                           <span className="mr-2">3)</span> Name of Bank Branch.
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="bank_branch"
                             value={formData?.bank_branch || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r  border-black">
                           <span className="mr-2">4)</span> Bank IFSC Code
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="bank_ifsc"
                             value={formData?.bank_ifsc || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r  border-black">
                           <span className="mr-2">5)</span> Bank MICR Code
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="bank_micr"
                             value={formData?.bank_micr || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r font-bold border-black">
                           <span className="mr-2">6)</span> 6. Name of Account
                           holder as per A/C
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full font-bold bg-transparent outline-none  text-black placeholder-gray-400"
                             name="bank_holder"
                             value={formData?.bank_holder || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr >
                         <td className=" px-2 py-1  flex flex-row items-center text-center align-top">
                           Place <span>  &nbsp;:</span> 
                         </td>
   
                         <td colSpan={2}></td>
                       </tr>
                       <tr>
                         <td className="text-center align-top">Date&nbsp; : </td>
   
                         <td colSpan={2}></td>
                       </tr>
                       <tr>
                         <td
                           className="pr-2 font-bold  text-end align-top"
                           colSpan={3}
                         >
                           Name & Signature of Authorized person<br></br>
                           with the stamp of Unit.
                         </td>
                       </tr>
                       <tr>
                         <td className="pt-20 text-end align-top" colSpan={3}></td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
               <div className="page-break"></div>
             </div>
             {/* ...................................................SECOND ANNEXURE................................................ */}
             <div>
               <div className="max-w-2xl mt-20 mb-16 mx-auto">
                 <h1 className="text-end text-[11px] underline  font-bold ">Annexure-II </h1>
   
                 <h1 className="text-center text-[12px]  font-bold mb-6">
                   PRE-RECEIPT
                 </h1>
                 <h1 className="text-center text-[12px]  font-bold ">
                   (TO BE SUBMITTED ON THE LETTER HEAD OF THE UNIT)
                 </h1>
               </div>
               <div className="max-w-2xl mx-auto text-[12px] space-y-4 p-4">
                 <div className="flex items-center flex-wrap gap-2">
                   <div className="flex flex-wrap gap-1">
                     <span>Received</span>
                     <span>a</span>
                     <span>sum</span>
                     <span>of</span>
                     <span>Rs</span>
                   </div>
                   <input
                     type="text"
                     className="flex-1 border-b border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                     name="amount"
                     value={formData?.amount || ""}
                     onChange={handleChange}
                   />
                   <span>Rupees</span>
                 </div>
   
                 <div className="flex items-center flex-wrap gap-2">
                   <input
                     type="text"
                     className="flex-1 border-b border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                     name="amount_words"
                     value={formData?.amount_words || ""}
                     onChange={handleChange}
                   />
                   {/* <span>Only</span> */}
                   <div className="flex flex-wrap gap-1">
                     <span>from</span>
                     <span>Office</span>
                     <span>of</span>
                     <span>Development</span>
                   </div>
                 </div>
   
                 <div className="flex flex-wrap gap-3">
                   <span>Commissioner</span>
                   <span>(MSME),</span>
                   <span>Ministry</span>
                   <span>of</span>
                   <span>MSME,</span>
                   <span>Govt</span>
                   <span>of</span>
                   <span>India,</span>
                   <span>on</span>
                   <span>account</span>
                   <span>of</span>
                   <span>Financial</span>
                   <span>Assistance</span>
                 </div>
   
                 <div className="flex flex-wrap gap-3">
                   <span>under</span>
                   <span>the</span>
                   <span>5</span>
                   <span>(1)</span>
                   <span>(A)</span>
                   <span>component</span>
                   <span>of</span>
                   <span>"Procurement</span>
                   <span>and</span>
                   <span>Marketing</span>
                   <span>Support</span>
                   <span>Scheme</span>
                   <span>of</span>
                   <span>Office</span>
                 </div>
   
                 {/* Row 5 */}
                 <div className="flex flex-wrap gap-4">
                   <span>of</span>
                   <span>Development</span>
                   <span>Commissioner</span>
                   <span>(MSME)”</span>
                   <span>for</span>
                   <span>the</span>
                   <span>participation</span>
                   <span>in</span>
                   <span>Trade</span>
                   <span>Fair/Exhibition</span>
                 </div>
                 <div className="flex items-center flex-wrap gap-2">
                   <span>Name</span>
                   <input
                     type="text"
                     className="flex-1  border-b border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.exhibition_name || ""}
                     readOnly
                   />
                   <span>at</span>
                   <input
                     type="text"
                     className="flex-1 border-b   border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.exhibition_at || ""}
                     readOnly
                   />
                 </div>
                 <div className="flex items-center flex-wrap gap-2">
                   <div className="flex flex-wrap gap-4">
                     <span>duration</span>
                     <span>from</span>
                   </div>
                   <input
                     type="text"
                     className="flex-1  border-b border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                     value={
                       formData.exhibition_from
                         ? moment(formData.exhibition_from).format("DD-MM-YYYY")
                         : ""
                     }
                     readOnly
                   />
                   <span>to</span>
                   <input
                     type="text"
                     className="flex-1 border-b   border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                     value={
                       formData.exhibition_to
                         ? moment(formData.exhibition_to).format("DD-MM-YYYY")
                         : ""
                     }
                     readOnly
                   />
                   <div className="flex flex-wrap gap-4">
                     <span>organized</span>
                     <span>by</span>
                   </div>
                 </div>
                 <div className="flex items-center flex-wrap gap-2">
                   <input
                     type="text"
                     className="flex-1 border-b   border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.exhibition_by || ""}
                     readOnly
                   />
                 </div>
                 <div className="w-full flex flex-col items-end  gap-4 pt-[60px]">
                   <div className="text-green-600 font-bold">
                     Revenue stamp of Rs. 1
                   </div>
                   <div>Signature of authorized signatory</div>
                   <div>(Name & designation)</div>
                   <div>(Stamp of the unit)</div>
                 </div>
               </div>
   
               <div className="page-break"></div>
             </div>
             {/* ...................................................THIRD ANNEXURE................................................ */}
             <div>
               <div className="max-w-4xl mt-20 mx-auto px-4">
                 <h1 className="text-end text-[11px]  font-bold mb-2 ">
                   Annexure-III
                 </h1>
   
                 <h1 className="text-center text-[12px] mb-5">
                   ELECTRONIC CLEARING SERVICE (CREDIT CLEARING) MODEL <br/> <span className=" text-lg font-semibold">MANDATE FORM</span>
                 </h1>
                 <h1 className="text-center text-[12px]">
                   OPTION Form TO RECEIVE PAYMENTS THROUGH CREDIT CLEARING
                   MECHANISM
                 </h1>
               </div>
               <div className="max-w-4xl mx-auto text-[12px] space-y-4 p-4">
                 <div className="overflow-x-auto  p-4">
                   <table className="table-auto w-full border border-black text-[10.5px]">
                     <thead>
                       <tr className=" border-b border-black">
                         <th className="p-2 border-r border-black" colSpan={3}>
                           1. Customer Details
                         </th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr className="border-b border-black">
                         <td className="px-2 border-r border-black text-center align-top w-[5%]">
                           (i)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-center w-[35%]">
                           Customer’s Name
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.firm_name || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (ii)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           Complete address
                         </td>
                         <td className="px-2 py-1">
                           <p>
                             {[
                               formData.add1_building,
                               formData.add1_village,
                               formData.add1_street,
                               formData.add1_area,
                               formData.add1_district,
                               formData.add1_state,
                               formData.add1_pincode,
                             ]
                               .filter(Boolean)
                               .join(", ")}
                           </p>
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (iii)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           Mob/Tel/Fax no
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.mobile_no || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (iv)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           Email id
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.email_id || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
                 <div className="overflow-x-auto  px-4 pb-4">
                   <table className="table-auto w-full border border-black text-[10.5px]">
                     <thead>
                       <tr className=" border-b border-black">
                         <th className="p-2 border-r border-black" colSpan={3}>
                           2. Particulars of the Bank Account
                         </th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr className="border-b border-black">
                         <td className="px-2 border-r border-black text-center align-top w-[5%]">
                           (i)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-center w-[35%]">
                           Bank’s Name
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.bank_name || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (ii)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           Branch’s Name
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.bank_branch || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (iii)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           Branch’s Address
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.bank_address || ""}
                             name="bank_address"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (iv)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           Branch’s Telephone No.
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.bank_telephone || ""}
                             name="bank_telephone"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (v)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           Branch’s email id
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.bank_email_id || ""}
                             name="bank_email_id"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (vi)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           9-Digit code number of the Bank & Branch appearing on
                           the MICR cheque issued by the bank
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.bank_micr || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (vii)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           Account Type (S.B. / Current) With Code 10/11/13
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.bank_account_type || ""}
                             name="bank_account_type"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (viii)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           Account No
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.bank_account_no || ""}
                             name="bank_account_no"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (ix)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           Aadhaar Card number: (Linked/Seeded With Account)
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.aadhar_card_details || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (x)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           IFSC code
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.bank_ifsc || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-1 border-r border-black text-center align-top">
                           (xi)
                         </td>
                         <td className="px-2 py-1 border-r border-black align-top">
                           NEFT code
                         </td>
                         <td className="px-2 py-1">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.bank_neft || ""}
                             name="bank_neft"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                     </tbody>
                   </table>
                   <p className="mt-4 text-[9px]">
                     (In lieu of the bank certificate to be obtained as under,
                     please attach a blank cancelled cheque or photocopy of a
                     cheque or front page of your current account passbook issued
                     by your bank for verification of the above particulars)
                   </p>
                   <div>
                     <h1 className="font-bold mt-4">3. Date of Effect:</h1>
   
                     <p className="mt-4">
                       I hereby, declare that the particulars given above are
                       correct and complete. If the transaction is delayed or not
                       effected at all for reasons of incomplete or incorrect
                       information, I would not hold the user institution
                       responsible. I have read the option invitation letter and
                       agree to discharge the responsibility expected of me as
                       participant under the scheme.
                     </p>
                   </div>
                   <div className="flex justify-between items-start mt-10 text-[12px]">
                     <div className="flex flex-row">
                       <span className="font-bold mb-1 mr-2">Date:</span>
                       <input
                         className="border-b border-dashed border-gray-400 w-40 bg-transparent outline-none text-black placeholder-gray-400"
                         placeholder="DD/MM/YYYY"
                         readOnly
                       />
                     </div>
   
                     <div className="flex flex-col text-right">
                       <span className="font-bold">
                         Signature of the Authorised Signatory
                       </span>
                       <span className="text-center font-bold">
                         with MSEs’ Stamp
                       </span>
                     </div>
                   </div>
   
                   <div className="mt-4 flex flex-wrap gap-2">
                     <span>Certified</span>
                     <span>that</span>
                     <span>the</span>
                     <span>particulars</span>
                     <span>furnished</span>
                     <span>above</span>
                     <span>are</span>
                     <span>correct</span>
                     <span>as</span>
                     <span>per</span>
                     <span>our</span>
                     <span>records</span>
                     <span>and</span>
                     <span>the</span>
                     <span>above</span>
                     <span>account</span>
                     <span>is</span>
                     <span>linked/seeded</span>
                     <span>with</span>
                     <span>Aadhaar No</span>
                     <input
                       type="text"
                       className="flex-1 max-w-xs border-b border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                       value={formData?.aadhar_card_details}
                       readOnly
                     />
                   </div>
                   {/* <div className="mt-1 flex flex-wrap gap-2">
                     <span>Aadhaar No</span>
                     <input
                       type="text"
                       className="flex-1 max-w-xs border-b border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                       value={formData?.aadhar_card_details}
                       readOnly
                     />
                   </div> */}
                   <div className="flex justify-between items-end mt-10 text-[12px]">
                     <div className="flex flex-row ">
                       <span className="font-bold mb-1 mr-2">Date:</span>
                       <input
                         className="border-b border-dashed border-gray-400 w-40 bg-transparent outline-none text-black placeholder-gray-400"
                         placeholder="DD/MM/YYYY"
                         readOnly
                       />
                     </div>
   
                     <div className="flex flex-col text-center">
                       <span className="font-bold">Bank’s Stamp</span>
                       <span className="text-center font-bold">
                         Signature of the Authorised / Official
                       </span>
                       <span className="text-center font-bold">
                         with phone number.
                       </span>
                     </div>
                   </div>
                 </div>
               </div>
   
               <div className="page-break"></div>
             </div>
             {/* ...................................................FOURTH ANNEXURE................................................ */}
             <div>
               <div className="max-w-2xl mt-20 mb-6 mx-auto">
                 <h1 className="text-end text-[11px]  font-bold mb-2 ">
                   Annexure-IV
                 </h1>
   
                 <h1 className="text-end text-[11px]  font-bold mb-2 ">
                   (To be submitted on Letter Head of the Unit)
                 </h1>
   
                 <h1 className="text-center text-[12px] underline font-bold ">
                   UNDERTAKING
                 </h1>
                 <h1 className="text-center text-[12px]  font-bold ">
                   (For reimbursement under the Procurement & Marketing Support
                   (PMS) Scheme of MSME)
                 </h1>
               </div>
               <div className="max-w-2xl mx-auto text-[12px] space-y-4 p-4">
                 <div className="flex items-center flex-wrap gap-2">
                   <div className="flex flex-wrap gap-1">
                     <span>I, </span>
                   </div>
                   <input
                     type="text"
                     className="flex-1 border-b  border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.undertaking_i || ""}
                     name="undertaking_i"
                     onChange={handleChange}
                   />
                   <span>S/D/o Sh</span>
                   <input
                     type="text"
                     className="flex-1 border-b  border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.firm_name || ""}
                     readOnly
                   />
                   <span>Proprietor/Partner/Director of</span>
                 </div>
   
                 <div className="flex items-center flex-wrap gap-2">
                   <span> M/s </span>
   
                   <input
                     type="text"
                     className="flex-1 border-b border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.undertaking_ms || ""}
                     name="undertaking_ms"
                     onChange={handleChange}
                   />
                   <span>bearing Udyam Registration Certificate (URC) No. </span>
                 </div>
                 <div className="flex items-center flex-wrap gap-2">
                   <input
                     type="text"
                     className="flex-1 border-b max-w-xs border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.uam || ""}
                     readOnly
                   />
                   <div className="flex flex-wrap gap-2">
                     <span>located</span>
                     <span>at</span>
                     <span>the</span>
                     <span>registered</span>
                     <span>office</span>
                     <span>address</span>
                     <span>of</span>
                     <span>the</span>
                   </div>
                 </div>
   
                 <div className="flex items-center flex-wrap gap-2">
                   <span>unit/enterprises</span>
   
                   <input
                     type="text"
                     className="flex-1 border-b border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.undertaking_product || ""}
                     name="undertaking_product"
                     onChange={handleChange}
                   />
                   <span>. Factory address of the </span>
                 </div>
                 <div className="flex flex-wrap gap-11">
                   <span> unit/enterprises,</span>
                   <span>engaged</span>
                   <span>in</span>
                   <span>the</span>
                   <span>Manufacturing/Service</span>
                   <span>activity</span>
                   <span>of</span>
                 </div>
                 <div className="flex items-center flex-wrap gap-2">
                   <input
                     type="text"
                     className="flex-1 border-b border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.undertaking_eligible || ""}
                     name="undertaking_eligible"
                     onChange={handleChange}
                   />
                   <span>
                     do hereby confirm that the information given by me is correct
                   </span>
                 </div>
                 <div className="flex items-center flex-wrap gap-2">
                   <span>and accurate. M/s. </span>
   
                   <input
                     type="text"
                     className="flex-1 border-b border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.undertaking_ms || ""}
                     readOnly
                   />
                   <span>is eligible for reimbursement as </span>
                 </div>
                 <div className="flex flex-wrap gap-1">
                   <span>per</span>
                   <span>the</span>
                   <span>procurement</span>
                   <span>&</span>
                   <span>Marketing</span>
                   <span>Support</span>
                   <span>(PMS)</span>
                   <span>Scheme</span>
                   <span>guidelines.</span>
                   <span>If</span>
                   <span>any</span>
                   <span>information</span>
                   <span>given</span>
                   <span>above</span>
                   <span>is</span>
                   <span>found</span>
                 </div>
   
                 {/* Row 5 */}
                 <div className="flex flex-wrap gap-[0.23rem]">
                   <span>incorrect/ineligible,</span>
                   <span>I</span>
                   <span>shall</span>
                   <span>be</span>
                   <span>liable</span>
                   <span>to</span>
                   <span>return</span>
                   <span>the</span>
                   <span>entire</span>
                   <span>amount</span>
                   <span>of</span>
                   <span>reimbursement</span>
                   <span>along</span>
                   <span>with</span>
                   <span>the</span>
                   <span>prevailing</span>
                   <span>rate</span>
                 </div>
   
                 <div className="flex flex-wrap gap-1">
                   <span>of</span>
                   <span>interest</span>
                   <span>to</span>
                   <span>the</span>
                   <span>Government</span>
                   <span>of India.</span>
                 </div>
   
                 <div className="flex flex-wrap  gap-x-10 pt-10">
                   <span>2.</span>
                   <span>That</span>
                   <span>the</span>
                   <span>aforesaid</span>
                   <span>unit/enterprise</span>
                   <span>had</span>
                   <span>participated</span>
                   <span>in</span>
                   <span>the</span>
                 </div>
                 <div className="flex items-center flex-wrap gap-2">
                   <input
                     type="text"
                     className="flex-1 border-b border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.undertaking_stall_no || ""}
                     name="undertaking_stall_no"
                     onChange={handleChange}
                   />
                   <span>Trade fair/Exhibition at Stall No . </span>
   
                   <input
                     type="text"
                     className="flex-1 border-b border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.exhibition_name || ""}
                     readOnly
                   />
                   <span> held at </span>
                 </div>
                 <div className="flex items-center flex-wrap gap-2">
                   <input
                     type="text"
                     className="flex-1 border-b  border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.exhibition_at || ""}
                     readOnly
                   />
                   <span>from </span>
                   <input
                     type="text"
                     className="flex-1 border-b max-w-[8rem] border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={
                       formData.exhibition_from
                         ? moment(formData.exhibition_from).format("DD-MM-YYYY")
                         : ""
                     }
                     readOnly
                   />
                   <span>to </span>
                   <input
                     type="text"
                     className="flex-1 border-b max-w-[8rem] border-black bg-transparent outline-none text-black placeholder-gray-400"
                     value={
                       formData.exhibition_to
                         ? moment(formData.exhibition_to).format("DD-MM-YYYY")
                         : ""
                     }
                     readOnly
                   />
                   <span>under</span>
                 </div>
                 <div>
                   <span>
                     Procurement & Marketing Support (PMS) Scheme during the
                     Financial Year: 2025-26.
                   </span>
                 </div>
                 <div className="flex justify-center">
                   <span>
                     I do hereby solemnly affirm that the above information is
                     correct and to the best of my knowledge
                   </span>
                 </div>
                 <div className="w-full flex justify-end pt-[60px]">
                   <div className="flex flex-col items-end gap-2 ">
                     <div className="font-semibold">
                       Signature of Authorized Signatory
                     </div>
                     <div>Proprietor / Partner / Director</div>
                     <div>(Along with the office seal of the Unit)</div>
                     <div className="w-full text-left">Date:</div>
                     <div className="w-full text-left">Place:</div>
                   </div>
                 </div>
               </div>
   
               <div className="page-break"></div>
             </div>
             {/* ...................................................FIVE ANNEXURE................................................ */}
             <div>
               <div className="max-w-4xl mt-10 mx-auto space-y-3">
                 <h1 className="text-center text-[11px]  font-bold mb-2 ">
                   Annexure-V
                 </h1>
                 <h1 className="text-center text-[12px] underline font-bold ">
                   PARTICIPANTS FEEDBACK REPORT
                 </h1>
                 <h1 className="text-center text-[12px]  font-bold ">
                   (To be filled in by all individual participants separately)
                 </h1>
                 <h1 className="text-center text-[12px]  font-bold ">
                   (All columns should be filled)
                 </h1>
               </div>
   
               <div className="max-w-4xl mx-auto text-[10px]">
                 <div className="overflow-x-auto  p-4">
                   <table className="table-auto w-full border border-black text-[10.5px]">
                     <tbody>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top w-[10%]">
                           1
                         </td>
                         <td className="p-2 border-r border-black align-top w-[45%]">
                           Name of the Participating MSE Unit
                         </td>
                         <td className="p-2 w-[45%]">
                           <input
                             className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                             value={formData?.msme_unit || ""}
                             name="msme_unit"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
   
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           2
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Address of the Plant/Unit
                         </td>
                         <td className="p-2">
                           {[
                             formData.add1_building,
                             formData.add1_village,
                             formData.add1_street,
                             formData.add1_area,
                             formData.add1_district,
                             formData.add1_state,
                             formData.add1_pincode,
                           ]
                             .filter(Boolean)
                             .join(", ")}
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           3
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Name of Proprietor/Partner/ Director
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.firm_name || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           4
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Mobile number of Proprietor/Partner/ Director
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.mobile_no || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           5
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Email ID of Proprietor/Partner/ Director
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.email_id || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           6
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Website of the participating MSE unit (if Any)
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="msme_website"
                             value={formData?.msme_website || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           7
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Name, Venue and duration of the Event/Exhibition
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.exhibition_at || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           8
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Comments of the participant regarding benefits of
                           participation in the event (About 200 words along with
                           photographs of event)
                         </td>
                         <td className="p-2">
                           {/* <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="msme_comment"
                             value={formData?.msme_comment || ""}
                             onChange={handleChange}
                           /> */}
                           <textarea
       className="w-full bg-transparent outline-none text-black placeholder-gray-400 resize-none"
       name="msme_comment"
       value={formData?.msme_comment || ""}
       onChange={handleChange}
       rows={4} 
       style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
     />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           9
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Number of visitors visited your stall in the event
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="msme_visitor"
                             value={formData?.msme_visitor || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           10
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Number and value (in INR) of export inquiries generated
                           in the event.
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="msme_value"
                             value={formData?.msme_value || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           11
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Details of business finalized/orders booked in the
                           event.
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="msme_orders_booked"
                             value={formData?.msme_orders_booked || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           12
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Other achievements such as joint ventures, technology
                           transfer agreement, etc(give details)
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="msme_other"
                             value={formData?.msme_other || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           13
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Would you like to participate again in the event? If
                           Yes, reason for the same.
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="msme_participant"
                             value={formData?.msme_participant || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td
                           className="p-2 border-r border-b border-black text-center align-center"
                           rowSpan={2}
                         >
                           14
                         </td>
                         <td
                           className="px-2 py-1 border-r border-black"
                           colSpan={2}
                         >
                           Details of technologies noticed in the event which would
                           be useful for MSMEs in India (copies of the brochures
                           and other relevant literature may be attached as
                           separate sheet):
                         </td>
                       </tr>
                       <tr>
                         <td colSpan={2} className="p-0">
                           <table className="w-full table-fixed">
                             <thead>
                               <tr className=" border-b border-black">
                                 <th className="border-r border-black p-1">
                                   Country
                                 </th>
                                 <th className="border-r border-black p-1">
                                   Field/Sector
                                 </th>
                                 <th className="border-r border-black p-1">
                                   Description of Technology
                                 </th>
                                 <th className="p-1">
                                   Contact details of the company
                                 </th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-black">
                                 <td className="border-r border-black p-1">
                                   <input
                                     className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                                     name="msme_1_country"
                                     value={formData?.msme_1_country || ""}
                                     onChange={handleChange}
                                   />
                                 </td>
                                 <td className="border-r border-black p-1">
                                   <input
                                     className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                                     name="msme_1_field"
                                     value={formData?.msme_1_field || ""}
                                     onChange={handleChange}
                                   />
                                 </td>
                                 <td className="border-r border-black p-1">
                                   <input
                                     className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                                     name="msme_1_description"
                                     value={formData?.msme_1_description || ""}
                                     onChange={handleChange}
                                   />
                                 </td>
                                 <td className="p-1">
                                   <input
                                     className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                                     name="msme_1_contact"
                                     value={formData?.msme_1_contact || ""}
                                     onChange={handleChange}
                                   />
                                 </td>
                               </tr>
                               <tr className="border-b border-black">
                                 <td className="border-r border-black p-1">
                                   <input
                                     className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                                     name="msme_2_country"
                                     value={formData?.msme_2_country || ""}
                                     onChange={handleChange}
                                   />
                                 </td>
                                 <td className="border-r border-black p-1">
                                   <input
                                     className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                                     name="msme_2_field"
                                     value={formData?.msme_2_field || ""}
                                     onChange={handleChange}
                                   />
                                 </td>
                                 <td className="border-r border-black p-1">
                                   <input
                                     className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                                     name="msme_2_description"
                                     value={formData?.msme_2_description || ""}
                                     onChange={handleChange}
                                   />
                                 </td>
                                 <td className="p-1">
                                   <input
                                     className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                                     name="msme_2_contact"
                                     value={formData?.msme_2_contact || ""}
                                     onChange={handleChange}
                                   />
                                 </td>
                               </tr>
                             </tbody>
                           </table>
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="px-2 py-4 border-r border-black text-center align-center">
                           15
                         </td>
                         <td className="p-2 border-r border-black align-center">
                           Remarks/Suggestions, if any
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="msme_suggestion"
                             value={formData?.msme_suggestion || ""}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                     </tbody>
                   </table>
                   <div className="mt-5">
                     <h2>
                       <span className="font-bold">Enclosed:</span> 2 (Two) self
                       attested photographs of allotted booth/stall at the event
                       venue.
                     </h2>
                     <div className="flex justify-between mt-4 ">
                       <div className="flex items-start gap-2">
                         <div className="w-[10%] text-start font-medium">
                           Date:
                         </div>
                         <div className="w-[90%]">
                           <input
                             className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                             readOnly
                           />
                         </div>
                       </div>
   
                       <div className="text-end font-bold leading-snug">
                         Signature/Name/Designation of Participant
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="page-break"></div>
             </div>
             {/* ...................................................ANNEXURE-C ................................................ */}
             <div>
               <div className="max-w-3xl mt-10 mx-auto space-y-3">
                 <h1 className="text-center text-[12px] underline font-bold ">
                   ANNEXURE-C
                 </h1>
                 <h1 className="text-center text-[11px] underline  font-bold ">
                   Check-list for reimbursement of claims under Component 5(A) :
                   PMS Scheme
                 </h1>
               </div>
               <div className="max-w-3xl mx-auto text-[12px] space-y-4 p-4">
                 <div className="flex items-center flex-wrap gap-2">
                   <div className="flex flex-wrap gap-2">
                     <span>Name</span>
                     <span>of</span>
                     <span>the</span>
                     <span>Fair / </span>
                     <span>Exhibition :</span>
                   </div>
                   <input
                     type="text"
                     className="flex-1 border-b border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.exhibition_name || ""}
                     readOnly
                   />
                   <span>held at </span>
                 </div>
                 <div className="flex items-center flex-wrap gap-2">
                   <input
                     type="text"
                     className="flex-1 border-b border-dashed max-w-xs border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.exhibition_at || ""}
                     readOnly
                   />
                   <span>during </span>
                   <input
                     type="text"
                     className="flex-1 border-b max-w-xs border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                     value={
                       formData?.exhibition_from && formData?.exhibition_to
                         ? `${moment(formData.exhibition_from).format(
                             "DD-MM-YYYY"
                           )} to ${moment(formData.exhibition_to).format(
                             "DD-MM-YYYY"
                           )}`
                         : ""
                     }
                     readOnly
                   />
                 </div>
                 <div className="flex flex-wrap gap-4">
                   <span>The</span>
                   <span>following</span>
                   <span>documents</span>
                   <span>/</span>
                   <span>information</span>
                   <span>is</span>
                   <span>being</span>
                   <span>submitted</span>
                   <span>for</span>
                   <span>reimbursement</span>
                   <span>under</span>
                   <span>PMS</span>
                   <span>Scheme</span>
                 </div>
                 <div className="flex items-center flex-wrap gap-2">
                   <span>from M /S </span>
   
                   <input
                     type="text"
                     className="flex-1 border-b max-w-[200px] border-dashed border-gray-400 bg-transparent outline-none text-black placeholder-gray-400"
                     value={formData?.undertaking_ms || ""}
                     readOnly
                   />
                 </div>
               </div>
               <div className="max-w-4xl mx-auto text-[10px]">
                 <div className="overflow-x-auto  p-6">
                   <div className="flex justify-end">
                     <h2 className="font-bold ">
                       (Two additional copies are attached: Yes/No)
                     </h2>
                   </div>
                   <table className="table-auto w-full border border-black text-[10.5px]">
                     <thead>
                       <tr className=" border-b border-black">
                         <th className="border-r border-black p-1 w-[5%]">
                           S. No.
                         </th>
                         <th className="border-r border-black p-1  w-[60%]">
                           PARTICULARS
                         </th>
                         <th className="border-r border-black p-1 w-[10%]">
                           Yes/No
                         </th>
                         <th className="p-1  w-[10%]">Page No.</th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           i.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Covering Letter on Letter Head of Unit/Enterprise (duly
                           signed and stamped)
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_cl_y"
                             checked={formData.checklist_cl_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2 ">
                           <input
                             className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                             name="checklist_cl_p"
                             value={formData.checklist_cl_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
   
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           ii.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Claim Form duly filled by the Unit / Enterprise.
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_cf_y"
                             checked={formData.checklist_cf_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_cf_p"
                             value={formData.checklist_cf_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           iii.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Print out of Online Application Form No. : UAM/DTF/
                           ………….. (duly signed and stamped)
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_uam_y"
                             checked={formData.checklist_uam_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_uam_p"
                             value={formData.checklist_uam_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           iv.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Filled details of Agency Creation for PFMS (duly signed
                           and stamped)
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_fd_y"
                             checked={formData.checklist_fd_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_fd_p"
                             value={formData.checklist_fd_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           v
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Original (Blank) Pre-Receipt (Duly Signed & Stamped) (In
                           Triplicate)
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_op_y"
                             checked={formData.checklist_op_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_op_p"
                             value={formData.checklist_op_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           vi.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Original Bank Mandate From (Duly verified by the bank)
                           with Cancelled Cheque of the concerned Bank (Original).
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_ob_y"
                             checked={formData.checklist_ob_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_ob_p"
                             value={formData.checklist_ob_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           vii.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Original Contingency Bill (Travel, Transport & Publicity
                           Material)
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_oc_y"
                             checked={formData.checklist_oc_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_oc_p"
                             value={formData.checklist_oc_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           viii.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Original Invoice(S) / Bill(S) For Stall Booking With
                           Original Receipt Voucher(S).
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_oi_y"
                             checked={formData.checklist_oi_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_oi_p"
                             value={formData.checklist_oi_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           ix.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Participants Feed back report With Photos (02) (duly
                           signed and stamped)
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_pfb_y"
                             checked={formData.checklist_pfb_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_pfb_p"
                             value={formData.checklist_pfb_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
   
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           x.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Self certified copy of Udyam Registration Certificate
                           (URC)
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_sccu_y"
                             checked={formData.checklist_sccu_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_sccu_p"
                             value={formData.checklist_sccu_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           xi.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Self certified copy of Aadhaar Card (s) (Directors’
                           /Proprietor / Partners)
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_scca_y"
                             checked={formData.checklist_scca_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_scca_p"
                             value={formData.checklist_scca_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           xii.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Self certified copy of PAN Card
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_pan_y"
                             checked={formData.checklist_pan_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_pan_p"
                             value={formData.checklist_pan_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           xiii.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Self certified copy of GST Registration Certificate (If
                           obtained)
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_gst_y"
                             checked={formData.checklist_gst_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_gst_p"
                             value={formData.checklist_gst_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           xiv.
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Undertaking (duly signed and stamped)
                         </td>
                         <td className="p-2 border-r border-black">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             type="checkbox"
                             name="checklist_u_y"
                             checked={formData.checklist_u_y == "Yes"}
                             onChange={handleChange}
                           />
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             name="checklist_u_p"
                             value={formData.checklist_u_p}
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                     </tbody>
                   </table>
   
                   <div className="mt-8 space-y-4 text-[12px]">
                     <div className="w-full flex justify-end pt-[60px]">
                       <div className="flex flex-col items-end gap-2 ">
                         <div className="font-semibold">
                           Signature of authorized signatory
                           <div>(along with the stamp of the Unit)</div>
                         </div>
                         <div className="w-full text-left flex">
                           Name:
                           {/* <input className="w-full bg-transparent outline-none  text-black placeholder-gray-400" /> */}
                         </div>
                         <div className="w-full text-left flex">
                           Designation:
                           {/* <input className="w-full bg-transparent outline-none  text-black placeholder-gray-400" /> */}
                         </div>
                         <div className="w-full text-left flex">
                           Place:
                           {/* <input className="w-full bg-transparent outline-none  text-black placeholder-gray-400" /> */}
                         </div>
                         <div className="w-full text-left flex">
                           Date:
                           {/* <input className="w-full bg-transparent outline-none  text-black placeholder-gray-400" /> */}
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="page-break"></div>
             </div>
             {/* ...................................................ANNEXURE-D ................................................ */}
             <div>
               <div className="max-w-3xl mt-10 mx-auto space-y-3">
                 <h1 className="text-end text-[11px]  font-bold mb-2 ">
                   Annexure-D
                 </h1>
                 <h1 className="text-center text-[12px]  font-bold ">
                   CLAIM FORM
                 </h1>
                 <h1 className="text-center text-[12px]  font-bold ">
                   (To be filled by beneficiary MSE for claiming reimbursement)
                 </h1>
                 <h1 className="text-center text-[12px]  font-bold ">
                   PART -I Entrepreneurs Details
                 </h1>
               </div>
   
               <div className="max-w-4xl mx-auto text-[10px]">
                 <div className="overflow-x-auto  p-6">
                   <table className="table-auto w-full border border-black text-[10.5px]">
                     <tbody>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top w-[10%]">
                           1
                         </td>
                         <td className="p-2 border-r border-black align-top w-[40%]">
                           Name of Implementing Agency
                         </td>
                         <td className="p-2 w-[50%]">
                           <input
                             className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                             value={`MSME-DFO-` + formData?.add1_district }
                             // value={ "MSME-DFO-"}
                             readOnly
                           />
                         </td>
                       </tr>
   
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           2
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Name of the Applicant Unit
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.firm_name || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           3
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Complete address, phone, fax, e-mail including name of
                           the proprietor/partner
                         </td>
                         <td className="p-2">
                           {[
                             formData.add1_building,
                             formData.add1_village,
                             formData.add1_street,
                             formData.add1_area,
                             formData.add1_district,
                             formData.add1_state,
                             formData.add1_pincode,
                           ]
                             .filter(Boolean)
                             .join(", ")}
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           4
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           UAM/Udyam Registration Certificate (URC) No. (Pl.
                           Enclose copy)
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.uam || ""}
                             readOnly
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           5
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Category of the entrepreneur
                           (General/Women/SC/ST/NER/PH), (Pl. enclose the copy of
                           relevant documents, as applicable)
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.category || ""}
                             name="category"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           6
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Type of the unit (Micro or Small) (whichever applicable)
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.type_of_unit || ""}
                             name="type_of_unit"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           7
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Category of the unit (Manufacturing/Services):
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.category_of_unit || ""}
                             name="category_of_unit"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           8
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Products manufactured/ Service rendered by applicant
                           unit.
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.product_manuf || ""}
                             name="product_manuf"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td
                           className="p-2 border-r font-bold border-black text-center align-top"
                           colSpan={3}
                         >
                           PART - II Event Details
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           9
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           Name of the Event participated, venue, duration of trade
                           fair/exhibition
                         </td>
                         <td className="p-2">
                           {formData?.exhibition_name &&
                           formData?.exhibition_at &&
                           formData?.exhibition_from &&
                           formData?.exhibition_to
                             ? ` ${formData?.exhibition_name}  ${
                                 formData?.exhibition_at
                               } ${moment(formData.exhibition_from).format(
                                 "DD-MM-YYYY"
                               )} to ${moment(formData.exhibition_to).format(
                                 "DD-MM-YYYY"
                               )}`
                             : ""}
                         </td>
                       </tr>
                       <tr className="border-b border-black">
                         <td className="p-2 border-r border-black text-center align-top">
                           10
                         </td>
                         <td className="p-2 border-r border-black align-top">
                           <div className="mb-2">Feedback : [about 200 words]</div>
                           Include details about new business tieups achieved
                           through the event, B2B Knowledge on new technology,
                           opportunity for market expansion etc.
                         </td>
                         <td className="p-2">
                           <input
                             className="w-full bg-transparent outline-none  text-black placeholder-gray-400"
                             value={formData?.feedback || ""}
                             name="feedback"
                             onChange={handleChange}
                           />
                         </td>
                       </tr>
                     </tbody>
                   </table>
                   <div className="w-full flex justify-end pt-[60px]">
                         <div className="flex flex-col items-end gap-2 ">
                         Page 1 of 2
                           
                         </div>
                       </div>
                   <div className="page-break"></div>
                   <div className="mt-10">
                     <table className="table-auto w-full border border-black text-[10.5px]">
                       <thead>
                         <tr className=" border-b border-black ">
                           <th className="border-r border-black p-1 " colSpan={4}>
                             PART - III Payment Details
                           </th>
                         </tr>
                         <tr className=" border-b border-black text-start">
                           <th
                             className="border-r font-normal border-black p-2 text-start"
                             colSpan={4}
                           >
                             DETAILS OF CLAIM (in Rs.)
                           </th>
                         </tr>
                         <tr className=" border-b border-black">
                           <th className="border-r border-black p-1 w-[10%]">
                             Name of Scheme
                           </th>
                           <th className="border-r border-black p-1 w-[40%]">
                             Particulars
                           </th>
                           <th className="border-r border-black p-1 w-[25%]">
                             Actual Expenditure
                             <div>(in Rs.)</div>
                           </th>
                           <th className="p-1 w-[25%]">
                             Amount admissible as per scheme guidelines
                           </th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr className="border-b border-black">
                           <td className="border-r border-black p-2" rowSpan={2}>
                             <span>Domestic Trade Fair / Exhibition</span>
                           </td>
                           <td className="border-r border-black p-2">
                             <span>
                               Contingency expenditure (Attach bill copy for
                               travel/publicity/fright charges) in original
                             </span>
                           </td>
                           <td className="border-r border-black p-2">
                             <input
                               className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                               value={formData?.ce_actual || ""}
                               name="ce_actual"
                               onChange={handleChange}
                             />
                           </td>
                           <td className="p-1">
                             <input
                               className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                               value={formData?.ce_amount || ""}
                               name="ce_amount"
                               onChange={handleChange}
                             />
                           </td>
                         </tr>
                         <tr className="border-b border-black">
                           <td className="border-r border-black p-2">
                             <span>
                               Space rent (stall rent) (minimum booth/stall size
                               provided by Event organizer) (Attach invoice & Bill)
                               in original
                             </span>
                           </td>
                           <td className="border-r border-black p-1">
                             <input
                               className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                               value={formData?.sr_actual || ""}
                               name="sr_actual"
                               onChange={handleChange}
                             />
                           </td>
   
                           <td className="p-2">
                             <input
                               className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                               value={formData?.sr_amount || ""}
                               name="sr_amount"
                               onChange={handleChange}
                             />
                           </td>
                         </tr>
                         <tr className="border-b border-black">
                           <td className="border-r border-black p-3" colSpan={2}>
                             <span>Total (in Rs.)</span>
                           </td>
                           <td className="border-r border-black p-2">
                             <input
                               className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                               value={
                                 Number(formData?.ce_actual) +
                                   Number(formData?.sr_actual) || ""
                               }
                               readOnly
                             />
                           </td>
   
                           <td className="p-2">
                             <input
                               className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                               value={
                                 Number(formData?.ce_amount) +
                                   Number(formData?.sr_amount) || ""
                               }
                               readOnly
                             />
                           </td>
                         </tr>
                       </tbody>
                     </table>
                     <div className="mt-8 space-y-4 text-[12px]">
                       <h2 className="font-bold ">DECLARATION:</h2>
                       <h2>I hereby declare that:</h2>
                       <div className="flex flex-col gap-2  mt-4">
                         <div className="flex">
                           <div className="w-[10%]">a)</div>
                           <div className="w-[90%]">
                             Above information is correct and is based on the
                             actual expenditure incurred. In case any of the
                             statement / information furnished in application /
                             documents later found to be wrong or incorrect or
                             misleading, I do hereby bind myself and my unit to pay
                             to the Government on demand the full amount received
                             as reimbursement in respect within seven days of the
                             demand.
                           </div>
                         </div>
   
                         <div className="flex">
                           <div className="w-[10%] ">b)</div>
                           <div className="w-[90%]">
                             The unit has not claimed /applied for financial
                             assistance from any other Ministry / Department of the
                             Government of India or any other Government Institute
                             /Agency for the above mentioned Trade fair.
                           </div>
                         </div>
                       </div>
   
                       <div className="w-full flex justify-end pt-[60px]">
                         <div className="flex flex-col items-end gap-2 ">
                           <div className="font-semibold">
                             Signature of authorized signatory
                             <div>(along with the stamp of the Unit)</div>
                           </div>
                           <div className="w-full text-left flex">
                             Name:
                             {/* <input className="w-full bg-transparent outline-none  text-black placeholder-gray-400" /> */}
                           </div>
                           <div className="w-full text-left flex">
                             Designation:
                             {/* <input className="w-full bg-transparent outline-none  text-black placeholder-gray-400" /> */}
                           </div>
                           <div className="w-full text-left flex">
                             Place:
                             {/* <input className="w-full bg-transparent outline-none  text-black placeholder-gray-400" /> */}
                           </div>
                           <div className="w-full text-left flex">
                             Date:
                             {/* <input className="w-full bg-transparent outline-none  text-black placeholder-gray-400" /> */}
                           </div>
                         </div>
                       </div>
                       <div className="w-full flex justify-end pt-[60px]">
                         <div className="flex flex-col items-end gap-2 ">
                         Page 2 of 2
                           
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </form>
         </Page>
  )
}

export default MsmeEdit