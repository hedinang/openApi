import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SystemService from "services/SystemService";
import useToast from "routes/hooks/useToast";
import { useTranslation } from "react-i18next";
import {
    Container, Row, Col
} from "react-bootstrap";
import { HeaderMain } from "routes/components/HeaderMain";
import { AgGridReact } from "components/agGrid";
import { defaultColDef } from "helper/utilities";
import _ from "lodash";

const ServiceList = () => {
    const { t } = useTranslation();
    const showToast = useToast();
    const history = useHistory();
    const [serviceList, setServiceList] = useState([])
    const [gridApi, setGridApi] = useState(null);

    const columnDefs = [
        {
            headerName: t("Service"),
            field: "name"
        },
        {
            headerName: t("Amount of Server Url"),
            field: "amountOfUrl"
        },
        {
            headerName: t("Amount of Group"),
            field: "amountOfGroup"
        }
    ];

    const retrieveServiceList = async () => {
        const response = await SystemService.listService();
        if (response.data.status === "OK") {
            setServiceList(response.data.data);

        } else {
            showToast("error", error.response.data.message);
        }
    };

    useEffect(() => {
        retrieveServiceList();
    }, []);

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
        setGridApi(params.api);
    };

    const onRowDoubleClick = (event) => {
        const { id } = event && event.data;
        history.push({
            pathname: 'service-detail',
            search: `?id=${id}`
        });
    };

    return (
        <>
            <Container fluid>
                <Row className="mb-1">
                    <Col lg={12}>
                        <HeaderMain
                            title={t("Service List")}
                            className="mb-3 mb-lg-3"
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col lg={12}>
                        <div className="ag-theme-custom-react" style={{ height: "500px" }}>
                            <AgGridReact
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                rowData={serviceList}
                                pagination
                                paginationPageSize={10}
                                onGridReady={onGridReady}
                                rowSelection="multiple"
                                rowMultiSelectWithClick
                                onRowDoubleClicked={onRowDoubleClick}
                                suppressRowClickSelection
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ServiceList;
