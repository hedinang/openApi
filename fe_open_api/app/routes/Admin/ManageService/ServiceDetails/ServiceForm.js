import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
    Card, CardBody, CardHeader, FormGroup, Col, Row, Button, SelectInput, Label, Input
} from "components";
import { formatDateTime } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import Select from "react-select";
import { AddItemRequest } from "routes/components";
import { Formik } from "formik";
import uuid from 'uuid/v4';
const ServiceForm = (props) => {
    const { t } = useTranslation();
    const {
        isCreate,
        isEdit,
        authorize,
        setFieldValue,
        setAuthorize,
        values,
        dataDetail
    } = props;
    let isChange = false;
    if (isEdit || isCreate) {
        isChange = true;
    }
    const changeServerUrl = (e) => {
        setFieldValue('serverUrl', e.value)
    }
    const addItemManual = (totalData, tableName) => {
        let items = [...totalData]
        items.push({
            id: uuid()
        })
        setAuthorize(items)
    };
    const onDeleteItemReq = (id, rowData, tableName) => {
        rowData = rowData.filter(e => e.id !== id)
        setAuthorize(rowData)
    };
    return (
        <>

            <Card>
                <CardBody className="p-4">
                    <FormGroup>
                        <Row xs="12" className="d-flex mx-0">
                            <Col xs="6" md="6">
                                <Row xs="12" className="d-flex mx-0 mt-5">
                                    <Col xs="4" md="4">
                                        <Label
                                        >
                                            {t("Service Name")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8">
                                        <Input
                                            type="text"
                                            value={dataDetail?.name}
                                            disabled
                                        />

                                    </Col>
                                </Row>
                                <Row xs="12" className="d-flex mx-0 mt-2">
                                    <Col xs="4" md="4">
                                        <label>
                                            {t("Server Url")}
                                        </label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            onChange={(e) => changeServerUrl(e)}
                                            options={dataDetail?.serverUrl?.map((element) => ({
                                                label: element.urlName,
                                                value: element.urlName
                                            }))}
                                            isSearchable
                                            defaultValue={"Please select a server instance"}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="6" md="6">
                                <Button
                                    color="primary"
                                    onClick={() => addItemManual(authorize, 'authorize')}
                                    style={{ height: 34, marginBottom: '5px' }}
                                >
                                    <span className="mr-1">+</span>
                                    <span>{t("Add authorize")}</span>
                                </Button>
                                <AddItemRequest
                                    rowDataItemReq={authorize}
                                    onDeleteItem={(id, rowData) => onDeleteItemReq(id, rowData, 'authorize')}
                                    authorizeTable={true}
                                    floatingFilter={true}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                </CardBody>
            </Card>

        </>
    );
};

ServiceForm.propTypes = {
    isCreate: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    form: PropTypes.instanceOf(Object).isRequired,
    updateForm: PropTypes.func.isRequired
};

export default ServiceForm;
