import { convertDate2String, formatDisplayDecimal } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import i18next from "i18next";

const getItemAuthorize = (
    key,
    value
) => [
        {
            headerName: i18next.t("action"),
            field: "action",
            cellRenderer: "actionDelete",
            filter: false,
            width: 100,
            filter: () => ''
        },
        {
            headerName: i18next.t("key"),
            field: "key",
            cellEditorParams: {
                values: key,
            },
            width: 180,
            editable: true,
            filter: () => ''
        },
        {
            headerName: i18next.t("value"),
            field: "value",
            cellEditorParams: {
                values: value,
            },
            width: 390,
            editable: true,
            filter: () => ''
        }
    ];

export default getItemAuthorize;
