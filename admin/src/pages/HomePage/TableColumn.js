import React, { useState } from 'react';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import { Td, Tr } from '@strapi/design-system/Table'
import { Typography } from '@strapi/design-system/Typography'
import { Flex } from '@strapi/design-system/Flex'
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';
import Trash from '@strapi/icons/Trash';
import Check from '@strapi/icons/Check';
import Cross from '@strapi/icons/Cross';
import { Icon } from '@strapi/design-system/Icon';
import http from '../../utils/http';
import { BaseCheckbox } from '@strapi/design-system/BaseCheckbox';

const TableColumn = (props) => {
    const [loadingState, setLoadingState] = useState(false);
    const [val, setValue] = useState(false);

    const onClickDelete = async (e) => {
        await http.deleteChoice(props.id)
        props.setGetConfigContentControl(true)
    }
    const onClickDataTransfer = async (e) => {
        setLoadingState(true)
        await http.dataTransfer(props.data, props.id ,val)
        props.setGetConfigContentControl(true)
        setLoadingState(false)
    }
    const onClickRelationTransfer = async (e) => {
        setLoadingState(true)
        await http.relationTransfer(props.data, props.id)
        props.setGetConfigContentControl(true)
        setLoadingState(false)
    }
    return (
        <Tr >
            <Td>
                {
                    props.data.isCompleted === true ? <Icon width={"13px"} color="secondary500" as={Check} />
                        : <Icon width={"13px"} color="secondary500" as={Cross} />
                }

            </Td>
            {/* // target table name */}
            <Td>
                <Typography textColor="neutral800">{props.data.targetTableName}</Typography>
            </Td>

            {/* // source url */}
            <Td>
                <Typography textColor="neutral800">{props.data.sourceUrl.slice(0, 50)}</Typography>
            </Td>
            {/* // count */}
            <Td>
                <Typography textColor="neutral800">{props.data.transferedDataCount + '/' + props.data.itemCount}</Typography>
            </Td>
            <Td>
                <Typography textColor="neutral800">{props.data.transferedRelationCount + '/' + props.data.itemCount}</Typography>
            </Td>
            <Td>
                <Flex>
                    <Box paddingLeft={1}>
                        <Button size="S" variant="secondary" disabled={props.data.isDataMigrated} onClick={onClickDataTransfer} loading={loadingState}>Data Transfer</Button>
                    </Box>
                </Flex>
            </Td>
            <Td >
                <Flex>
                    <Box paddingLeft={1} style={{marginLeft:"-12px"}}>
                        <Button size="S" variant="secondary" disabled={props.data.isRelationMigrated === false && props.data.isDataMigrated === true ? false : true} loading={loadingState} onClick={onClickRelationTransfer}>Relation Transfer</Button>
                    </Box>
                </Flex>
            </Td>
            <Td >
                <Flex>
                    <Box paddingLeft={1} >
                        <BaseCheckbox aria-label="Simple checkbox" name="default" onValueChange={value => setValue(value)} value={val} disabled={props.data.isDataMigrated}/>
                    </Box>
                </Flex>
            </Td>
            <Td >
                <Flex>
                    <Box paddingLeft={1} >
                        <IconButton onClick={onClickDelete} label="Delete" icon={<Trash />} />
                    </Box>
                </Flex>
            </Td>
           

        </Tr>
    );
}


export default TableColumn;