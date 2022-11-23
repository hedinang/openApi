import { convertDate2String, formatDisplayDecimal } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import i18next from "i18next";

const formatNumber = (params) => {
    const { value } = params;
    if (value) return formatDisplayDecimal(Number(value), 2);
    return "0.00";
};
const editableMandatoryLogic = (params) => {
    params.data.mandatory = !params.data.mandatory
}

const editableAutoGenerateLogic = (params) => {
    params.data.autoGenerate = !params.data.autoGenerate
}


const getItemParameter = (
    {
        paramName,
        dataType,
        paramType,
        defaultValue,
        mandatory,
        note,
        autoGenerate,
        id
    },
    listDataType,
    listParamType,
) => [
        {
            headerName: i18next.t("action"),
            field: "action",
            cellRenderer: "actionDelete",
            filter: false,
            width: 100
        },
        {
            headerName: i18next.t("paramName"),
            field: "paramName",
            editable: true,
            width: 250
        },
        {
            headerName: i18next.t("dataType"),
            field: "dataType",
            cellEditor: "agDropdownSelection",
            cellEditorParams: {
                values: listDataType,
                getOption: (value) => {
                    if (typeof (value) === "string") return { label: value, value: value }
                }
            },
            editable: true,
            width: 150

        },
        {
            headerName: i18next.t("paramType"),
            field: "paramType",
            cellEditor: "agDropdownSelection",
            cellEditorParams: {
                values: listParamType,
                getOption: (value) => {
                    if (typeof (value) === "string") return { label: value, value: value }
                }
            },
            editable: true,
            width: 150

        },
        {
            headerName: i18next.t("defaultValue"),
            field: "defaultValue",
            cellEditor: "agLargeTextCellEditor",
            editable: true,
            width: 300
        },
        {
            headerName: i18next.t("mandatory"),
            field: "mandatory",
            cellRenderer: "mandatoryRenderer",
            editable: editableMandatoryLogic,
            cellStyle: (params) => {
                return {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: "20px"
                };
            },
            width: 180,
            suppressSizeToFit: true
        },
        {
            headerName: i18next.t("note"),
            field: "note",
            cellEditor: "agLargeTextCellEditor",
            editable: true,
            width: 400
        },
        {
            headerName: i18next.t("autoGenerate"),
            field: "autoGenerate",
            cellRenderer: "autoGenerateRenderer",
            editable: editableAutoGenerateLogic,
            cellStyle: (params) => {
                return {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: "20px"
                };
            },
            width: 150

        },
    ];

export default getItemParameter;
