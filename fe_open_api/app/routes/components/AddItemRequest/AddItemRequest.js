import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import AgDropdownInput from "components/AgDropdownInput";
import { AgGridTable } from "../AgGridTable";
import CustomTooltip from "./CustomTooltip";
import getItemParameter from "./ItemParameter";
import getItemGroup from "./ItemGroup";
import getItemServerUrl from "./ItemServerUrl";
import SelectWithHorizontalLine from "./SelectWithHorizontalLine";
import getItemAuthorize from "./ItemAuthorize";
import { Checkbox } from "primereact/checkbox";

const defaultColDef = {
    editable: false,
    filter: "agTextColumnFilter",
    floatingFilter: true,
    resizable: true,
    tooltipComponent: "customTooltip"
};

const PRICE_TYPE_DEFAULT = [
    { priceType: "FOC" },
    { priceType: "INCLUDED" },
    { priceType: "TO ADVISE" },
    { priceType: "AS PER CONTRACT" }
];

const getDatePicker = () => {
    function Datepicker() { }
    Datepicker.prototype.init = function (params) {
        this.eInput = document.createElement("input");
        this.eInput.setAttribute("type", "date");
        this.eInput.classList.add("form-control");
        this.eInput.style.cssText = "height: 42px";
        this.cell = params.eGridCell;
        this.oldWidth = this.cell.style.width;
        this.cell.style.width = "200px";
        this.cell.style.height = "42px";
        this.eInput.value = params.value;
    };
    Datepicker.prototype.getGui = function () {
        return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function () {
        this.eInput.focus();
        this.eInput.select();
    };
    Datepicker.prototype.getValue = function () {
        this.cell.style.width = this.oldWidth;
        return this.eInput.value;
    };
    Datepicker.prototype.destroy = function () { };
    Datepicker.prototype.isPopup = function () {
        return false;
    };

    return Datepicker;
};

const AddItemRequest = (props) => {
    const {
        rowDataItemReq,
        gridHeight,
        onDeleteItem,
        onCellValueChanged,
        groupTable,
        serverUrlTable,
        apiCreate,
        apiUpdate,
        urlName,
        paramName,
        groupName,
        priority,
        params,
        authorizeTable,
        listDataType,
        listParamType,
        onChangeMandatory,
        onChangeAutoGenerate,


    } = props;

    const ActionDelete = (params) => {
        const { data, agGridReact } = params;
        // rowData is total data
        // data is a record
        const { rowData } = agGridReact.props;
        return (
            <IconButton
                size="small"
                onClick={() => onDeleteItem(data.id, rowData)}
                style={{ color: "red" }}
            >
                <i className="fa fa-trash" />
            </IconButton>
        );
    };

    const SupplerCellRenderer = ({ value }) => value?.supplierCode ?? value?.companyName ?? value ?? "";

    const UOMCellRenderer = ({ value }) => value?.uomName ?? value ?? "";

    const CurrencyCellRenderer = ({ value }) => (value?.currencyName ? `${value?.currencyName} (+${value?.currencyCode})` : value ?? "");

    const TaxRecordCellRenderer = ({ value }) => value?.taxCode ?? value ?? "";

    const PriceTypeCellRenderer = ({ value }) => {
        return (typeof value === "object" ? value?.priceType || "" : value || "");
    };

    const AddressCellRenderer = ({ value }) => value?.addressLabel ?? value ?? "";

    const AccountCellRenderer = ({ value }) => value?.accountNumber ?? value ?? "";

    const MandatoryRenderer = (params) => {
        const { data, agGridReact } = params;
        const rowDataCol = agGridReact?.props?.rowData;
        const { mandatory } = data;
        return (
            <Checkbox
                name="mandatory"
                checked={mandatory}
                onChange={(e) => onChangeMandatory(e, rowDataCol, data, params)}
            />
        );
    };
    const AutoGenerateRenderer = (params) => {
        const { data, agGridReact } = params;
        const rowDataCol = agGridReact?.props?.rowData;
        const { autoGenerate } = data;
        return (
            <Checkbox
                name="autoGenerate"
                checked={autoGenerate}
                onChange={(e) => onChangeAutoGenerate(e, rowDataCol, data, params)}
            />
        );
    };
    const getColumnDefs = () => {
        if (apiCreate) {
            return getItemParameter(
                rowDataItemReq,
                listDataType,
                listParamType,
            );
        }
        if (apiUpdate) {
            return getItemParameter(
                rowDataItemReq,
                listDataType,
                listParamType,
            );
        }
        if (groupTable) {
            return getItemGroup(
                rowDataItemReq
            );
        }

        if (serverUrlTable) {
            return getItemServerUrl(
                rowDataItemReq
            );
        }
        if (authorizeTable) {
            return getItemAuthorize(
                rowDataItemReq
            );
        }
    };

    return (
        <AgGridTable
            columnDefs={getColumnDefs()}
            colDef={defaultColDef}
            rowData={rowDataItemReq}
            gridHeight={gridHeight}
            frameworkComponents={{
                actionDelete: ActionDelete,
                supplerCellRenderer: SupplerCellRenderer,
                uomCellRenderer: UOMCellRenderer,
                currencyCellRenderer: CurrencyCellRenderer,
                taxRecordCellRenderer: TaxRecordCellRenderer,
                addressCellRenderer: AddressCellRenderer,
                accountCellRenderer: AccountCellRenderer,
                priceTypeCellRenderer: PriceTypeCellRenderer,
                mandatoryRenderer: MandatoryRenderer,
                autoGenerateRenderer: AutoGenerateRenderer,
                customTooltip: CustomTooltip,
                editCell: SelectWithHorizontalLine,
                agDropdownInput: AgDropdownInput
            }}
            components={{ datePicker: getDatePicker() }}
            pagination={false}
            onCellValueChanged={onCellValueChanged}
            singleClickEdit
            stopEditingWhenCellsLoseFocus
            autoSizeColumn={false}
        />
    );
};

AddItemRequest.propTypes = {
    rowDataItemReq: PropTypes.instanceOf(Array).isRequired,
    gridHeight: PropTypes.number,
    onDeleteItem: PropTypes.func.isRequired,
    suppliers: PropTypes.instanceOf(Array),
    uoms: PropTypes.instanceOf(Array),
    currencies: PropTypes.instanceOf(Array),
    addresses: PropTypes.instanceOf(Array),
    glAccounts: PropTypes.instanceOf(Array),
    onCellValueChanged: PropTypes.func,
    convertPPR2PR: PropTypes.bool,
    isPurchaseOrderItems: PropTypes.bool,
    isProject: PropTypes.bool,
    isSupplier: PropTypes.bool
};
AddItemRequest.defaultProps = {
    gridHeight: 300,
    suppliers: [],
    uoms: [],
    currencies: [],
    addresses: [],
    glAccounts: [],
    onCellValueChanged: () => { },
    convertPPR2PR: false,
    isPurchaseOrderItems: false,
    isProject: true,
    isSupplier: false
};

export default AddItemRequest;
