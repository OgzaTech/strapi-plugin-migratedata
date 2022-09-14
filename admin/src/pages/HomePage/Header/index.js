import React from 'react';
import {BaseHeaderLayout} from "@strapi/design-system/Layout";
import { Link } from '@strapi/design-system/Link'
import { Box } from '@strapi/design-system/Box'
import ArrowLeft from '@strapi/icons/ArrowLeft'

const Header = () => {
    return (
        <Box background="neutral0">
            <BaseHeaderLayout
                navigationAction={
                    <Link startIcon={<ArrowLeft />} to="/">
                        Go back
                    </Link>
                }
                title="Migrate Data"
                subtitle="strapi-plugin-migrate-data."
                as="h2"
            />
        </Box>
    )
}

export default Header;
