
import { useState, useEffect } from 'react';
import React from 'react';

import { Box } from '@strapi/design-system/Box';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput, FieldAction } from '@strapi/design-system/Field';
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import { GridLayout } from '@strapi/design-system/Layout';
import style from '../../style/style';

const ColumnItem = (props) => {
    const [colonItemCombobox, setColonItemCombobox] = useState();
    const [selectType, setSelectType] = useState();

    const handleChangeCombo = async (e) => {
        setSelectType(props.exportTableColumns[e].type);
        setColonItemCombobox(e);
      };

    useEffect(() => {
        props.getColumnData({ id: props.id, importColumnName: props.columnName, exportColumnName:colonItemCombobox,type:selectType });
    }, [colonItemCombobox]);


    return (

        <GridLayout>
            <Box padding={style.defaultBoxPadding} hasRadius={true} background={style.defaultBoxBackground}>
                <FieldInput placeholder="Placeholder" value={props.columnName} disabled={true}/>
            </Box>

            <Box padding={style.defaultBoxPadding} hasRadius={true} background={style.defaultBoxBackground}>
                <Combobox aria-label="Colon" value={colonItemCombobox} onChange={handleChangeCombo}>

                    {                            
                        Object.keys(props.exportTableColumns).map((data,index) => (
                            <ComboboxOption key={index} value={data}>{data}</ComboboxOption>
                        ))
                    }


                </Combobox>
            </Box>


        </GridLayout>

    );
}


export default ColumnItem;