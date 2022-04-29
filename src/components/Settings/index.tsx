import React, { useState } from "react";
import styled from "styled-components";

import ContactInfo from "./contact-info/contact-info";
import PublicProfile from "./public-profile/public-profile";
import { Tabs, Tab, TabPanel } from "./tabs";

const SettingsComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleChange = (e: any, value: number) => {
    setActiveTab(value);
  };

  return (
    <div>
      <TabsContainer>
        <Tabs selectedTab={activeTab} onChange={handleChange}>
          <Tab label="Public profile" value={1}></Tab>
          <Tab label="Contact info" value={2}></Tab>
        </Tabs>
      </TabsContainer>
      <TabPanelContainer>
        <TabPanel value={activeTab} selectedIndex={1}>
          <PublicProfile />
        </TabPanel>
        <TabPanel value={activeTab} selectedIndex={2}>
          <ContactInfo />
        </TabPanel>
      </TabPanelContainer>
    </div>
  );
};

export default SettingsComponent;

const TabPanelContainer = styled.div`
  /* height: 100vh; */
`;

const TabsContainer = styled.div`
  display: flex;
  /* padding: 2px; */
`;
