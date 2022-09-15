import { useState, useEffect } from 'react';
import React from 'react';
import { Box } from '@strapi/design-system/Box';
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import { Accordion, AccordionToggle, AccordionContent, AccordionGroup } from '@strapi/design-system/Accordion';
import style from '../../style/style';
import { TwoColsLayout } from '@strapi/design-system/Layout';
import SettingsTableColumnItem from './SettingsTableColumnItem';

const SettingsTableItem = (props) => {
  const [selectedCombobox, setSelectedCombobox] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [accordionEnabledState, setAccordionEnabledState] = useState(true);

  let dataColumnArray = [];

  const handleChange = async (e) => {
    setSelectedCombobox(e);
    if (e) {
      setAccordionEnabledState(false);
    } else {
      if (expanded) {
        setExpanded(!expanded);
      }
      setAccordionEnabledState(true);
    }
  };

  useEffect(async () => {
    props.getData({ id: props.id, importTableName: props.tableName, exportTableName: selectedCombobox, columns: dataColumnArray });
  }, [selectedCombobox])


  const getColumnData = (childData) => {
    let id  = childData.id;
    delete childData.id;
    dataColumnArray[id] = childData;
    props.getData({ id: props.id, importTableName: props.tableName, exportTableName: selectedCombobox, columns: dataColumnArray });
  }

  return (
    <TwoColsLayout startCol={
      <Box padding={style.mediumPadding} marginBottom={5} hasRadius={true} background={style.mainBackground} shadow={style.mainShadow} >
        <Accordion expanded={expanded} onToggle={() => setExpanded(!expanded)} id="acc-1" size="S" disabled={accordionEnabledState} >
          <AccordionToggle title={props.tableName} />
          <AccordionContent>
            {
              Object.keys(props.importSchema[props.tableName]).map((data, index) => (
                <SettingsTableColumnItem
                  key={index}
                  id={index}
                  getColumnData={getColumnData}
                  columnName={data}
                  exportTableColumns={props.exportSchema[selectedCombobox]}
                />
              ))
            }

          </AccordionContent>
        </Accordion>
      </Box>
    }
      endCol={
        <Box padding={5} background={style.mainBackground} shadow={style.mainShadow} marginBottom={5} hasRadius={true} >
          <Combobox aria-label="Table" value={selectedCombobox} onChange={handleChange} >
            {
              Object.keys(props.exportSchema).map((data, index) => (
                <ComboboxOption
                  key={index}
                  value={data}
                >{data}</ComboboxOption>
              ))}

          </Combobox>
        </Box>
      } />
  );
}


export default SettingsTableItem;