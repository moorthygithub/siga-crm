import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "@/config/BaseUrl";
import { format } from "date-fns";

export const ContextPanel = createContext();

const AppProvider = ({ children }) => {
  const now = new Date();
  const formattedDate = format(now, "EEEE, MMMM d, yyyy 'at' h:mm a");
  
  const [loading, setLoading] = useState(false);
  const matchId = localStorage.getItem("id");
  const nameL = localStorage.getItem("name");
  const emailL = localStorage.getItem("email");

  

  return (
    <ContextPanel.Provider
      value={{
       
       
        nameL,
        emailL,
        matchId,
        formattedDate,
      }}
    >
      {children}
    </ContextPanel.Provider>
  );
};

export default AppProvider;
