import { convertDate2String, formatDisplayDecimal } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import i18next from "i18next";

const getItemGroup = (
    groupName,
    priority
) => [
        {
            headerName: i18next.t("action"),
            field: "action",
            cellRenderer: "actionDelete",
            filter: false,
            width: 100
        },
        {
            headerName: i18next.t("group name"),
            field: "groupName",
            cellEditorParams: {
                values: groupName,
            },
            width: 465,
            editable: true

        },
        {
            headerName: i18next.t("priority order"),
            field: "priority",
            cellEditorParams: {
                values: priority,
            },
            width: 150,
            editable: true

        }
    ];

export default getItemGroup;
