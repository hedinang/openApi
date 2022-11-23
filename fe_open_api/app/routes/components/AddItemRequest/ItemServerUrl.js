import { convertDate2String, formatDisplayDecimal } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import i18next from "i18next";

const formatNumber = (params) => {
    const { value } = params;
    if (value) return formatDisplayDecimal(Number(value), 2);
    return "0.00";
};

const getItemServerUrl = (
    urlName,
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
            headerName: i18next.t("server url name"),
            field: "urlName",
            cellEditorParams: {
                values: urlName,
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

export default getItemServerUrl;
