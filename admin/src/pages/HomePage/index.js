import {
  Tabs,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
} from '@strapi/design-system/Tabs'
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { Divider } from '@strapi/design-system/Divider';
import {
  Layout,
  ContentLayout,
} from "@strapi/design-system/Layout";
import { Button } from '@strapi/design-system/Button';
import { TextInput } from '@strapi/design-system/TextInput';
import { Box } from '@strapi/design-system/Box';
import style from '../../style/style';
import SettingsTableItem from './SettingsTableItem';
import Header from './Header';
import http from '../../utils/http';
import CollectionsTableColumn from './CollectionsTableColumn';
import CollectionsTableHeader from './CollectionsTableHeader';

let dataArray = [];
let exportSchema = {};
let importSchema = {};

const HomePage = () => {
  const [message, setMessage] = useState('');
  const [okButtonState, setOkButtonState] = useState(false);
  const [ConfigCollection, setConfigCollection] = useState([]);
  const [getConfigCollectionControl, setGetConfigCollectionControl] = useState(true)
 
  if(getConfigCollectionControl){
    http.getConfigCollection().then((data) => {
      setConfigCollection(data)
    })
    setGetConfigCollectionControl(false)
  }
   


  const handleClick = async (event) => {
    if(message){
      exportSchema = await http.getExportSchema(message);
      importSchema = await http.getImportSchema();
      setOkButtonState(true);
    } 
  };

  const handleChange = event => {
    setMessage(event.target.value);

  };

  const saveSelected = async (as) => {
    await http.addConfigCollection(message, dataArray);
    window.location.reload()
  }

  const getData = (childData) => {
    let id = childData.id;
    delete childData.id;
    dataArray[id] = childData;
  }

  return (

    <Layout>

      <Header />

      <Box padding={8} margin={10} background="neutral">
        <TabGroup label="Some stuff for the label" id="tabs">
          <Tabs>
            <Tab>Collections</Tab>
            <Tab>Settings</Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              <Box color="neutral800" padding={4} background={style.mainBackground}>

                <CollectionsTableHeader 
                setGetConfigCollectionControl ={setGetConfigCollectionControl}
                />
                {
                  ConfigCollection.map((data, index) => (
                    <CollectionsTableColumn
                      key={index}
                      id={index}
                      data={data}
                      setGetConfigCollectionControl={setGetConfigCollectionControl}
                    />
                  ))
                }

              </Box>
            </TabPanel>
            <TabPanel>
              <Box color="neutral800" padding={1} style={{ paddingTop: "50px" }} background="neutral0">

                <ContentLayout>
                  <Box padding={style.mediumPadding} background={style.mainBackground} shadow={style.mainShadow} hasRadius={true}>

                    <TextInput label="V3 Swagger Url" placeholder="Swagger url" name="content" onChange={handleChange} value={message} />

                  </Box>

                  <Button onClick={handleClick} style={style.primaryButton}>Get Entity Model</Button>
                  {
                    Object.keys(importSchema).map((data, index) => (
                      <SettingsTableItem
                        key={index}
                        id={index}
                        tableName={data}
                        getData={getData}
                        exportSchema={exportSchema}
                        importSchema={importSchema}
                      />
                    ))
                  }
                  {okButtonState == true ?
                    <Button onClick={saveSelected} style={style.primaryButton} >Save Selected</Button> :
                    <Box padding={8}><Divider /></Box>}

                </ContentLayout>

              </Box>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Box>

    </Layout>
  );
};





export default HomePage;
