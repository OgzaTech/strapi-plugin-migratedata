import React from 'react';
import { Thead, Tr, Th } from '@strapi/design-system/Table'
import { Typography } from '@strapi/design-system/Typography'
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden'
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';
import Refresh from '@strapi/icons/Refresh';


const TableHeader = (props) => {

  return (
    <Thead>
      <Tr>
        <Th>
              <IconButton style={{marginLeft:"-8px"}} noBorder={true} onClick={()=>{props.setGetConfigContentControl(true)}} label="Refresh" icon={<Refresh />} />
        </Th>
        <Th>
          <Typography  variant="sigma">Target Table</Typography>
        </Th>

        <Th>
          <Typography  variant="sigma">Source Url</Typography>
        </Th>
        <Th>
          <Typography variant="sigma">Transfered Data</Typography>
        </Th>
        <Th>
          <Typography  variant="sigma">Transfered Relation</Typography>
        </Th>
        <Th>
          <VisuallyHidden >Actions</VisuallyHidden>
        </Th>
        <Th>
          <VisuallyHidden>Actions</VisuallyHidden>
        </Th>
        <Th>
          <Typography style={{ marginLeft: "-20px" }} variant="sigma">Clear Table</Typography>
        </Th>
        <Th>
          <VisuallyHidden >Actions</VisuallyHidden>
        </Th>
       
      </Tr>
    </Thead>
  );
}


export default TableHeader;