import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
    Card, CardBody, CardHeader, FormGroup, Col, Row, Button, SelectInput, Label, Input, HorizontalInput
} from "components";
import { formatDateTime } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import Select from "react-select";
import SystemService from "services/SystemService";
import { Field } from "formik";
import classNames from "classnames";
import { Checkbox } from "primereact/checkbox";
const ApiEditForm = (props) => {
    const { t } = useTranslation();
    const {
        isCreate,
        isEdit,
        values,
        setFieldValue,
        dataDetail

    } = props;
    let isChange = false;
    if (isEdit || isCreate) {
        isChange = true;
    }
    const SingleValue = ({ data, ...props }) => {
        return (<div>{data.value}</div>);
    };

    const [serviceList, setServiceList] = useState([])
    const [groupList, setGroupList] = useState([])
    const [methodList, setMethodList] = useState([])
    const [encryptList, setEncryptList] = useState([])
    const changeApiName = (e) => {
        setFieldValue('name', e.target.value)
    }
    const changeGroup = (e) => {
        setFieldValue('groupId', e.value)
    }
    const changeHasRequestBody = (e) => {
        setFieldValue('hasRequestBody', e.checked)
    }
    const changeDefaultRequestBody = (e) => {
        setFieldValue('defaultRequestBody', e.target.value)
    }
    const changeSystem = (e) => {
        setFieldValue('serviceId', e.value)
        listGroup(e.value)
    }

    const changeEncryption = (e) => {
        setFieldValue('encryptionType', e.value)
    }
    const changeMethod = (e) => {
        setFieldValue('method', e.value)
    }

    const listApiMethod = async () => {
        let response = await SystemService.listApiMethod();
        if (response.data.status === "OK") {
            let result = response.data.data
            setMethodList(result)
        }
    }
    const listEncryption = async () => {
        let response = await SystemService.listEncryption();
        if (response.data.status === "OK") {
            let result = response.data.data
            setEncryptList(result)
        }
    }
    const listService = async () => {
        let response = await SystemService.listService();
        if (response.data.status === "OK") {
            let result = response.data.data
            setServiceList(result)
            setGroupList([])
        }
    }
    const listGroup = async (systemId) => {
        let response = await SystemService.listGroup(systemId);
        if (response.data.status === "OK") {
            let result = response.data.data
            setGroupList(result)
        }
    }
    useEffect(() => {
        listGroup(values.serviceId)

    }, [values.serviceId])
    useEffect(() => {
        listApiMethod()
        listEncryption()
        listService()
    }, [])

    const systemFilter = (serviceId) => {
        let e = serviceList.find(e => e?.id === serviceId)
        return {
            key: e?.id,
            value: e?.name
        }
    }
    const groupFilter = (groupId) => {
        let e = groupList.find(e => e?.id === groupId)
        return {
            key: e?.id,
            value: e?.groupName
        }
    }

    return (
        <>
            <Card>
                <CardBody className="p-4">
                    <FormGroup>
                        <Row xs='12'>
                            <Col xs='6'>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <Label
                                        >
                                            {t("Api Name")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8">
                                        <Input
                                            type="text"
                                            defaultValue={values?.name}
                                            onChange={changeApiName}
                                        />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <Label
                                        >
                                            {t("Service Name")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8">
                                        <Select
                                            onChange={(e) => changeSystem(e)}
                                            options={serviceList.map((element) => ({
                                                label: element.name,
                                                value: element.id
                                            }))}
                                            isSearchable
                                            components={{ SingleValue }}
                                            value={systemFilter(values.serviceId)}
                                        />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <label>
                                            {t("Encrytion")}
                                        </label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            components={{ SingleValue }}
                                            onChange={e => changeEncryption(e)}
                                            options={encryptList.map((element) => ({
                                                label: element.name,
                                                value: element.name
                                            }))}
                                            isSearchable
                                            value={{
                                                key: values?.encryptionType,
                                                value: values?.encryptionType
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <label>
                                            {t("Method")}
                                        </label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            components={{ SingleValue }}
                                            onChange={e => changeMethod(e)}
                                            options={methodList.map((element) => ({
                                                label: element.name,
                                                value: element.name
                                            }))}
                                            isSearchable
                                            value={{
                                                key: values?.method,
                                                value: values?.method
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="4" md="4">
                                        <Label
                                        >
                                            {t("Group")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            components={{ SingleValue }}
                                            onChange={(e) => { changeGroup(e) }}
                                            options={groupList.map((element) => ({
                                                label: element.groupName,
                                                value: element.id
                                            }))}
                                            isSearchable
                                            value={groupFilter(values?.groupId)}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="6" md="6">
                                <Row>
                                    <Col xs="4" md="4">
                                        <Label
                                        >
                                            {t("Is there request body")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8">
                                        <Checkbox
                                            checked={values.hasRequestBody}
                                            onChange={(e) => changeHasRequestBody(e)}
                                        />
                                    </Col>
                                </Row>
                                {values.hasRequestBody ?
                                    <Row xs="12" md="12">
                                        <Col xs="4" md="4">
                                            <Label className="p-0">Default request body</Label>
                                        </Col>
                                        <Col xs="8" md="8">
                                            <textarea
                                                value={values?.defaultRequestBody}
                                                type="textarea"
                                                maxLength={3000}
                                                rows={9}
                                                className={
                                                    classNames(
                                                        "form-control",
                                                    )
                                                }
                                                onChange={e => changeDefaultRequestBody(e)}
                                            />
                                        </Col>
                                    </Row> : <></>
                                }
                            </Col>
                        </Row>


                    </FormGroup>
                </CardBody>
            </Card>
        </>
    );
};

ApiEditForm.propTypes = {
    isCreate: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    form: PropTypes.instanceOf(Object).isRequired,
    updateForm: PropTypes.func.isRequired
};

export default ApiEditForm;
