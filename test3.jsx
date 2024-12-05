import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Page from '../dashboard/page';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Edit, Save, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { useParams } from 'react-router-dom';

const EditNews = () => {
  // Fetch news by ID
  const {id} = useParams()
  const { data, isLoading, error } = useQuery({
    queryKey: ['newsDetails', id],
    queryFn: async () => {
      const token = localStorage.getItem('token')
      const response = await axios.get(`https://agsrebuild.store/public/api/panel-fetch-news-by-id/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.news;
    }
  });

  // Update news mutation
  const updateNewsMutation = useMutation({
    mutationFn: async (updatedNews) => {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Append all required fields to FormData
      formData.append('news_heading', updatedNews.news_heading);
      formData.append('news_sub_title', updatedNews.news_sub_title);
      formData.append('news_department', updatedNews.news_department);
      formData.append('news_details', updatedNews.news_details);
      formData.append('news_link', updatedNews.news_link);
      formData.append('news_date', format(updatedNews.news_date, 'yyyy-MM-dd'));
      formData.append('news_status', updatedNews.news_status);

      const response = await axios.post(
        `https://agsrebuild.store/public/api/panel-update-news/${id}`, 
        formData,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      console.log('News updated successfully');
      // Optionally add toast or navigation logic here
    },
    onError: (error) => {
      console.error('Failed to update news', error);
      // Optionally add error handling toast or messaging
    }
  });

  // State to manage form data
  const [formData, setFormData] = React.useState({
    news_heading: '',
    news_sub_title: '',
    news_details: '',
    news_link: '',
    news_date: new Date(),
    news_department: '',
    news_status: '1'
  });

  // Update form data when fetched data is available
  React.useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        news_date: new Date(data.news_date)
      });
    }
  }, [data]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateNewsMutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading news</div>;
  
  return (
    <Page>
      {/* Rest of the component remains the same as in the original code */}
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Edit className="mr-2" /> Edit News
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain the same as in the original code */}
          {/* ... */}
        </form>
      </div>
    </Page>
  )
}

export default EditNews;