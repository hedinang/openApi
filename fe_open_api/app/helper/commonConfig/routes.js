import URL_CONFIG from "services/urlConfig";
// import URL_MANAGE_PROJECT from "services/ProjectService/url";
import i18next from "i18next";
// import { CONTRACT_MODULE_ROUTE } from "services/ContractModuleService";

import { RequisitionSideBar, CompanyAdminSideBar } from "./sidebars";

const APP_ROUTES = () => {
    // const roleCheck = JSON.parse(localStorage.getItem("companyRole"));

    // let companyAdminSideBar = [];
    // if (roleCheck !== null && roleCheck.role.length !== 0) {
    //     for (let i = 0; i < roleCheck.role.length; i++) {
    //         if (roleCheck.role[i] === "COMPANY_ADMIN") {
    //             companyAdminSideBar = CompanyAdminSideBar;
    //         }
    //     }
    // }

    return {
        entity: [
            {
                id: 1,
                icon: "fa fa-fw fa-plus-square",
                title: "Onboard Entity",
                path: URL_CONFIG.CREATE_ENTITY,
                // children: []
            }
        ]
    };
};

// Object.freeze(APP_ROUTES);

export default APP_ROUTES;
