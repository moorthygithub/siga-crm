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
import JobOfferedView from "./app/jobOffered/JobOfferedView";
import JobRequireView from "./app/jobRequire/JobRequireView";
import DirectoryView from "./app/directory/DirectoryView";
import ParticipationList from "./app/participation/ParticipationList";





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
        {/* id card  */}
        <Route path="/participant" element={<ParticipantList />} />
        {/* participtations */}
        <Route path="/participation" element={<ParticipationList />} />
        {/* Job Offered  */}
        <Route path="/job-offered" element={<JobOfferedList />} />
        <Route path="/job-offered-view/:id" element={<JobOfferedView />} />
        {/* Job Require  */}
        <Route path="/job-require" element={<JobRequireList />} />
        <Route path="/job-require-view/:id" element={<JobRequireView />} />
        {/* directory  */}
        <Route path="/directory" element={<DirectoryList />} />
        <Route path="/directory-view/:id" element={<DirectoryView />} />
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
