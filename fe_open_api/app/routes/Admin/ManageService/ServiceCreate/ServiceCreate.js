import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import {
    Container,
    Col,
    Row,
    Button,
} from "components";
import { HeaderMain } from "routes/components/HeaderMain";
import StickyFooter from "components/StickyFooter";
import ServiceCreateForm from "./ServiceCreateForm";
import { Formik, Form } from "formik";
import { AddItemRequest } from "routes/components";
import { HeaderSecondary } from "routes/components/HeaderSecondary";
import uuid from 'uuid/v4';
import { useToast } from "routes/hooks";
import SystemService from "services/SystemService";
import { useHistory } from "react-router";


const ServiceCreate = (props) => {
    const { t } = useTranslation();
    const showToast = useToast();
    const history = useHistory();
    const initialValues = {
        serviceName: "",
        serverUrl: [],
        group: []
    }
    const onDeleteItemReq = (id, rowData, setFieldValue, tableName) => {
        rowData = rowData.filter(e => e.id !== id)
        setFieldValue(tableName, rowData)
    };
    const addItemManual = (totalData, setFieldValue, tableName) => {
        let items = [...totalData]

        switch (tableName) {
            case 'serverUrl':
                items.push({
                    id: uuid()
                })
                break;
            case 'group':
                items.push({
                    id: uuid()
                })
                break;
            default:
                break;
        }
        setFieldValue(tableName, items)
    };
    const onSavePressHandler = async (values) => {
        let response = await SystemService.createService(values)
        if (response.data.status === "OK") {
            showToast("success", response.data.message);
            setTimeout(() => {
                history.push('/system-service/service-list');
            }, 1000);
        } else {
            showToast("error", response.data.message);
        }
    }
    return (
        <Container fluid>
            <Formik
                initialValues={initialValues}
                onSubmit={() => { }}

            >
                {({
                    values, setFieldValue
                }) => {

                    return (
                        <Form>
                            <Row className="mb-1">
                                <Col lg={12}>
                                    <HeaderMain
                                        title={(t("Create Service"))}
                                        className="mb-3 mb-lg-3"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col lg={12}>
                                    <ServiceCreateForm
                                        setFieldValue={setFieldValue}
                                        serviceName={values.serviceName}
                                    />
                                </Col>
                            </Row>
                            <Row className="justify-content-between mx-0 mt-3 mb-1">
                                <Col xs={6}>
                                    <Row className="justify-content-between mx-0 mt-3 mb-1">
                                        <HeaderSecondary
                                            title={t("Add server url")}
                                            className="my-2"
                                        />
                                        <span>
                                            <Button
                                                color="primary"
                                                onClick={() => addItemManual(values.serverUrl, setFieldValue)}
                                                style={{ height: 34, marginRight: '5px' }}
                                            >
                                                <span className="mr-1">+</span>
                                                <span>{t("Import")}</span>
                                            </Button>
                                            <Button
                                                color="primary"
                                                onClick={() => addItemManual(values.serverUrl, setFieldValue, 'serverUrl')}
                                                style={{ height: 34 }}
                                            >
                                                <span className="mr-1">+</span>
                                                <span>{t("AddManual")}</span>
                                            </Button>
                                        </span>

                                    </Row>
                                </Col>
                                <Col xs={6}>
                                    <Row className="justify-content-between mx-0 mt-3 mb-1">
                                        <HeaderSecondary
                                            title={t("Add group")}
                                            className="my-2"
                                        />
                                        <span>
                                            <Button
                                                color="primary"
                                                onClick={() => addItemManual()}
                                                style={{ height: 34, marginRight: '5px' }}
                                            >
                                                <span className="mr-1">+</span>
                                                <span>{t("Import")}</span>
                                            </Button>
                                            <Button
                                                color="primary"
                                                onClick={() => addItemManual(values.group, setFieldValue, 'group')}
                                                style={{ height: 34 }}
                                            >
                                                <span className="mr-1">+</span>
                                                <span>{t("AddManual")}</span>
                                            </Button>
                                        </span>

                                    </Row>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={6}>
                                    <AddItemRequest
                                        rowDataItemReq={values.serverUrl}
                                        onDeleteItem={(id, rowData) => onDeleteItemReq(id, rowData, setFieldValue, 'serverUrl')}
                                        serverUrlTable={true}
                                    />
                                </Col>
                                <Col xs={6}>
                                    <AddItemRequest
                                        rowDataItemReq={values.group}
                                        onDeleteItem={(id, rowData) => onDeleteItemReq(id, rowData, setFieldValue, 'group')}
                                        groupTable={true}
                                    />
                                </Col>
                            </Row>
                            <StickyFooter>
                                <Row className="justify-content-between mx-0 px-3">
                                    <Button
                                        className="mb-2 btn btn-secondary"
                                        onClick={() => history.goBack()}
                                    >
                                        {t("Back")}
                                    </Button>
                                    <Button
                                        color="primary"
                                        className="mr-3 mb-2 btn btn-secondary"
                                        type="button"
                                        label={t("Submit")}
                                        onClick={() => {
                                            onSavePressHandler(values);
                                        }}
                                    >
                                        <span>{t("Submit")}</span>
                                    </Button>
                                </Row>
                            </StickyFooter>
                        </Form>
                    )
                }}
            </Formik>
        </Container>
    )
}
export default ServiceCreate;