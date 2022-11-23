import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useHistory, useLocation } from "react-router";
import {
    Container,
    Col,
    Row,
    Button,
    ButtonToolbar,
} from "components";
import useToast from "routes/hooks/useToast";
import { HeaderMain } from "routes/components/HeaderMain";
import StickyFooter from "components/StickyFooter";
import ApiCreateForm from "./ApiCreateForm";
import { Formik, Form } from "formik";
import { AddItemRequest } from "routes/components";
import { HeaderSecondary } from "routes/components/HeaderSecondary";
import SystemService from "services/SystemService";
import uuid from 'uuid/v4';
const ApiCreate = (props) => {
    const { t } = useTranslation();
    const showToast = useToast();
    const history = useHistory();
    const [isCreate, setIsCreate] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [listDataType, setListDataType] = useState(['string', 'boolean', 'number', 'file'])
    const [listParamType, setListParamType] = useState(['header', 'body', 'none'])
    const initialValues = {
        name: '',
        serviceId: '',
        method: '',
        encryptionType: '',
        groupId: '',
        hasRequestBody: false,
        defaultRequestBody: '',
        params: [],
    }
    const onSavePressHandler = async (values) => {
        let response = await SystemService.createApi(values)
        if (response.data.status === "OK") {
            // back list screen
            showToast("success", response.data.message);
            setTimeout(() => {
                history.push('/system-service/service-detail?id=' + values.serviceId);
            }, 1000);
        } else {
            showToast("error", response.data.message);
        }
    }
    const addItemManual = (totalData, setFieldValue, tableName) => {
        let items = totalData === undefined ? [] : [...totalData]
        items.push({
            id: uuid(),
            paramName: '',
            dataType: '',
            paramType: '',
            defaultValue: '',
            mandatory: false,
            note: '',
            autoGenerate: false
        })
        setFieldValue(tableName, items)
    };
    const onDeleteItemReq = (id, rowData, setFieldValue, tableName) => {
        rowData = rowData.filter(e => e.id !== id)
        setFieldValue(tableName, rowData)
    };
    const onChangeMandatory = (e, rowData, data, params) => {
        const newRowData = [...rowData];
        newRowData.forEach(item => {
            if (item.id === data.id)
                item.mandatory = e.checked;
        });
        params.api.setRowData(newRowData);
    }
    const onChangeAutoGenerate = (e, rowData, data, params) => {
        const newRowData = [...rowData];
        newRowData.forEach(item => {
            if (item.id === data.id) {
                item.autoGenerate = e.checked;
            }
        });
        params.api.setRowData(newRowData);
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
                                        title={(t("Create Api"))}
                                        className="mb-3 mb-lg-3"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col lg={12}>
                                    <ApiCreateForm
                                        isCreate={isCreate}
                                        isEdit={isEdit}
                                        headerName={t("General Information")}
                                        values={values}
                                        setFieldValue={setFieldValue}
                                    />
                                </Col>
                            </Row>
                            <Row className="justify-content-between mx-0 mt-3 mb-1">
                                <HeaderSecondary
                                    title={t("Add parameter")}
                                    className="my-2"
                                />
                                <span>
                                    <Button
                                        color="primary"
                                        style={{ height: 34, marginRight: '5px' }}
                                    >
                                        <span className="mr-1">+</span>
                                        <span>{t("Import")}</span>
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={() => addItemManual(values.params, setFieldValue, 'params')}
                                        style={{ height: 34 }}
                                    >
                                        <span className="mr-1">+</span>
                                        <span>{t("AddManual")}</span>
                                    </Button>
                                </span>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={12}>
                                    <AddItemRequest
                                        rowDataItemReq={values.params !== undefined ? values.params : []}
                                        onDeleteItem={(id, rowData) => onDeleteItemReq(id, rowData, setFieldValue, 'params')}
                                        apiCreate={true}
                                        listDataType={listDataType}
                                        listParamType={listParamType}
                                        onChangeMandatory={
                                            (e, rowData, data, params) => {
                                                onChangeMandatory(e, rowData, data, params);
                                            }
                                        }
                                        onChangeAutoGenerate={
                                            (e, rowData, data, params) => {
                                                onChangeAutoGenerate(e, rowData, data, params);
                                            }
                                        }

                                    />
                                </Col>
                            </Row>
                            <StickyFooter>
                                <Row className="justify-content-between mx-0 px-3">
                                    <Button
                                        className="mb-2 btn btn-secondary"
                                        onClick={() => (isEdit ? onBackButtonPressHandler() : history.goBack())}
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
export default ApiCreate;