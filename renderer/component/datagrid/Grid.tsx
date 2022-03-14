import { Box, styled } from "@mui/material";
import { ColDef } from "ag-grid-community";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import PropTypes from 'prop-types'
import { DataGridHeader, Header } from "./dto";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Warp = styled(Box)({
    display: "inline-block", width: '98%', textAlign: 'left', padding: '15px'
});
const defaultColDef: ColDef = {
    width: 200,
    headerComponentParams: {
        template:
            '<div class="ag-cell-label-container" role="presentation">' +
            '<span ref="eMenu" class=""></span>' +
            // '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
            '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
            '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
            '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
            '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
            '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
            '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
            '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
            '  </div>' +
            '</div>'
    }
};
const getRowNodeId = (params) => {
    return params.ID;
};
function DataGrid({ dataHeader, rowData = [] }: propsType) {
    return (
        <Warp>
            <div>
                {dataHeader.title}({rowData?.length})
            </div>
            <div className="ag-theme-alpine" style={{ height: 200, width: '99%' }}>
                <AgGridReact
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    getRowNodeId={getRowNodeId}
                >
                    {dataHeader.header.map((row) => {
                        return <AgGridColumn key={row.key} filter={true} field={row.name} resizable={true} cellEditor={row.editor} editable={row.editable} />
                    })}

                </AgGridReact>
            </div>
        </Warp>
    )
}

interface propsType {
    dataHeader?: DataGridHeader;
    rowData?: Array<Header>;
}



export default DataGrid;