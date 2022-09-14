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
import TableItem from './TableItem';
import Header from './Header';
import http from '../../utils/http';
import TableColumn from './TableColumn';
import TableHeader from './TableHeader';
import ConfigContent from '../../../../ConfigContent.json';

let dataArray = [];
let exportSchema = {};
let importSchema = {};

const HomePage = () => {
  const [message, setMessage] = useState('');
  const [okButtonState, setOkButtonState] = useState(false);
  const [ConfigContent, setConfigContent] = useState([]);
  const [getConfigContentControl, setGetConfigContentControl] = useState(true)
 
  if(getConfigContentControl){
    http.getConfigContent().then((data) => {
      setConfigContent(data)
    })
    setGetConfigContentControl(false)
  }
   


  const handleClick = async (event) => {
    if(message){
      exportSchema = await http.getExport(message);
      importSchema = await http.getImport();
      setOkButtonState(true);
    } 
  };

  const handleChange = event => {
    setMessage(event.target.value);

  };

  const handleClickDataTransfer = async (as) => {
    await http.postData(message, dataArray);
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
              <Box color="neutral800" padding={4} background="neutral0">

                <TableHeader 
                setGetConfigContentControl ={setGetConfigContentControl}
                />
                {
                  ConfigContent.map((data, index) => (
                    <TableColumn
                      key={index}
                      id={index}
                      data={data}
                      setGetConfigContentControl={setGetConfigContentControl}
                    />
                  ))
                }

              </Box>
            </TabPanel>
            <TabPanel>
              <Box color="neutral800" padding={1} style={{ paddingTop: "50px" }} background="neutral0">

                <ContentLayout>
                  <Box padding={style.defaultBoxPadding} style={style.inputSwaggerUrl} background={style.defaultBoxBackground} shadow={style.defaultBoxShadow} hasRadius={true}>

                    <TextInput label="Your Swagger Url" placeholder="Swagger url" name="content" onChange={handleChange} value={message} />

                  </Box>

                  <Button onClick={handleClick} style={style.getModelButton}>Get Entity Model</Button>
                  {
                    Object.keys(importSchema).map((data, index) => (
                      <TableItem
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
                    <Button onClick={handleClickDataTransfer} style={style.getModelButton} >Add Choices</Button> :
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
