import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
    Card, CardBody, FormGroup, Col, Row, Button, SelectInput, Label, Input, HorizontalInput, CustomInput
} from "components";
import Select from "react-select";
import SystemService from "services/SystemService";
import { Checkbox } from "primereact/checkbox";
const ApiCreateForm = (props) => {
    const { t } = useTranslation();
    const {
        isCreate,
        isEdit,
        values,
        setFieldValue
    } = props;
    let isChange = false;
    if (isEdit || isCreate) {
        isChange = true;
    }
    const SingleValue = ({ data, ...props }) => {
        if (data.value === "") return <div>{data.label}</div>
        return (<div>{"+" + data.value}</div>);
    };

    const [serviceList, setServiceList] = useState([])
    const [groupList, setGroupList] = useState([])
    const [methodList, setMethodList] = useState([])
    const [encryptList, setEncryptList] = useState([])
    const changeApiName = (e) => {
        setFieldValue('apiName', e.target.value)
    }
    const changeGroup = (e) => {
        setFieldValue('group', e.value)
    }
    const changeSystem = (e) => {
        setFieldValue('serviceId', e.value)
        listGroup(e.value)
    }

    const changeEncryption = (e) => {
        setFieldValue('encryption', e.value)
    }
    const changeMethod = (e) => {
        setFieldValue('method', e.value)
    }

    const changeHasRequestBody = (e) => {
        setFieldValue('hasRequestBody', e.checked)
    }
    const changeDefaultRequestBody = (e) => {
        setFieldValue('defaultRequestBody', e.value)
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
        listApiMethod()
        listEncryption()
        listService()
    }, [])

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
                                            placeholder="enter name for api"
                                            type="text"
                                            value={values.apiName}
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
                                            defaultValue={"Please select a server instance"}
                                        />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <label
                                        >
                                            {t("Encrytion")}
                                        </label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            // components={{ SingleValue }}
                                            onChange={changeEncryption}
                                            options={encryptList.map((element) => ({
                                                label: element.name,
                                                value: element.name
                                            }))}
                                            isSearchable
                                            defaultValue={"Please select a server instance"}
                                        />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <label
                                        >
                                            {t("Method")}
                                        </label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            onChange={changeMethod}
                                            options={methodList.map((element) => ({
                                                label: element.name,
                                                value: element.name
                                            }))}
                                            isSearchable
                                            defaultValue={"Please select a server instance"}
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
                                            onChange={(e) => {
                                                changeGroup(e);
                                            }}
                                            options={groupList.map((element) => ({
                                                label: element.groupName,
                                                value: element.id
                                            }))}
                                            isSearchable
                                            defaultValue={"Please select a server instance"}
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
                                    <HorizontalInput
                                        name="defaultRequestBody"
                                        label={t("Default request body")}
                                        type="textarea"
                                        maxLength={3000}
                                        placeholder={t("Enter default request body")}
                                        rows={10}
                                        className="mb-0"
                                    /> : <></>}
                            </Col>
                        </Row>


                    </FormGroup>
                </CardBody>
            </Card>
        </>
    );
};

ApiCreateForm.propTypes = {
    isCreate: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    // form: PropTypes.instanceOf(Object).isRequired,
    updateForm: PropTypes.func.isRequired
};

export default ApiCreateForm;
