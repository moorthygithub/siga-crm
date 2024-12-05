import Login from "./app/auth/Login";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./app/home/Home";
import RegistrationList from "./app/registration/RegistrationList";
import ParticipantList from "./app/participant/ParticipantList";
import JobOfferedList from "./app/jobOffered/JobOfferedList";
import JobRequireList from "./app/jobRequire/JobRequireList";
import DirectoryList from "./app/directory/DirectoryList";
import BusinessOppList from "./app/buisnesOpp/BusinessOppList";
import AmountList from "./app/amount/AmountList";
import LatestNewsList from "./app/latestNews/LatestNewsList";
import CreateNews from "./app/latestNews/CreateNews";
import EditNews from "./app/latestNews/EditNews";
import AmountView from "./app/amount/AmountView";
import BusinessView from "./app/buisnesOpp/BusinessView";





const queryClient = new QueryClient()

function App() {
  return (
    <>
       <QueryClientProvider client={queryClient}>
      <Toaster />
      <Routes>
        {/* Login Page        */}
        <Route path="/" element={<Login />} />
        {/* Dashboard  */}
        <Route path="/home" element={<Home />} />
        {/* Registration  */}
        <Route path="/registration" element={<RegistrationList />} />
        {/* Participants  */}
        <Route path="/participant" element={<ParticipantList />} />
        {/* Job Offered  */}
        <Route path="/job-offered" element={<JobOfferedList />} />
        {/* Job Require  */}
        <Route path="/job-require" element={<JobRequireList />} />
        {/* directory  */}
        <Route path="/directory" element={<DirectoryList />} />
        {/* Business Opp.  */}
        <Route path="/business-opp" element={<BusinessOppList />} />
        <Route path="/business-opp-view/:id" element={<BusinessView />} />
        {/* Amount  */}
        <Route path="/amount" element={<AmountList />} />
        <Route path="/amount-view/:id" element={<AmountView />} />
        {/* latest news  */}
        <Route path="/latest-news" element={<LatestNewsList />} />
        <Route path="/create-news" element={<CreateNews />} />
        <Route path="/edit-news/:id" element={<EditNews />} />
      </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
