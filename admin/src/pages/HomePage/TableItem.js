import { useState, useEffect } from 'react';
import React from 'react';
import { Box } from '@strapi/design-system/Box';
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import { Accordion, AccordionToggle, AccordionContent, AccordionGroup } from '@strapi/design-system/Accordion';
import style from '../../style/style';
import { TwoColsLayout } from '@strapi/design-system/Layout';
import ColumnItem from './ColumnItem';


const TableItem = (props) => {
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

   // props.getData({ id: 1, export: props.name, import: value, column: columnItemArray });

  }

  return (
    <TwoColsLayout startCol={
      <Box padding={style.defaultBoxPadding} marginBottom={5} hasRadius={true} background={style.defaultBoxBackground} shadow={style.defaultBoxShadow} >
        <Accordion expanded={expanded} onToggle={() => setExpanded(!expanded)} id="acc-1" size="S" disabled={accordionEnabledState} >
          <AccordionToggle title={props.tableName} />
          <AccordionContent>
            {
              Object.keys(props.importSchema[props.tableName]).map((data, index) => (
                <ColumnItem
                  key={index}
                  id={index}
                  getColumnData={getColumnData}
                  //colon tutan obje gidiyor
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
        <Box padding={style.tableComboPadding} background={style.defaultBoxBackground} shadow={style.defaultBoxShadow} marginBottom={5} hasRadius={true} >
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


export default TableItem;