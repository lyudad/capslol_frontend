import styled from 'styled-components';
import { Pagination } from 'antd';
import { colors } from 'constants/index';

export const StyledPagination = styled(Pagination)`
    button.ant-pagination-item-link {
        border-color: ${colors.appBarBrd};
        color: ${colors.brandColor};
        background-color: ${colors.appBarBgr};
    }
    button.ant-pagination-item-link:hover {
        border-color: ${colors.textWhite};
        color: ${colors.textWhite};
    }
    li.ant-pagination-item {
        background-color: ${colors.appBarBgr};
        border-color: ${colors.appBarBrd};
    }
    li.ant-pagination-item-active a {
        color: ${colors.textWhite};
    }
    li.ant-pagination-disabled {
        button.ant-pagination-item-link {
            color: ${colors.appBarBrd};
        }
    }
    li.ant-pagination-item:hover {
        border-color: ${colors.textWhite};
    }
    a {
        color: ${colors.brandColor};
    }
    a:hover {
        color: ${colors.textWhite};
    }
`;
