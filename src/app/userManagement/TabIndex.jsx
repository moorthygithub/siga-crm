import React from 'react'
import Page from '../dashboard/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ButtonControl from './ButtonControl';
import PageControl from './PageControl';
const TabIndex = () => {
  return (
 
   <Page>
      <div className="container mx-auto p-6">
      <Tabs defaultValue="pages" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pages">
          <PageControl />
        </TabsContent>
        
   
        <TabsContent value="buttons">
          <ButtonControl />
        </TabsContent>
      </Tabs>
    </div>
   </Page>
 
  )
}

export default TabIndex