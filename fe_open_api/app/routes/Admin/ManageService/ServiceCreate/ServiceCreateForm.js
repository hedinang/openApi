import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
    Card, CardBody, FormGroup, Col, Row, Label, Input
} from "components";
import { MultiAdd } from "../components/MultiSelect/MultiAdd";
const ServiceCreateForm = (props) => {
    const { t } = useTranslation();
    const {
        serviceName,
        setFieldValue
    } = props;
    
    const SingleValue = ({ data, ...props }) => {
        if (data.value === "") return <div>{data.label}</div>
        return (<div>{"+" + data.value}</div>);
    };
    const onChange = (e) => {
        setFieldValue('serviceName', e.target.value)
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
                                            {t("Service Name")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8">
                                        <Input
                                            type="text"
                                            value={serviceName}
                                            onChange={onChange}
                                            placeholder="enter name for service"
                                        />
                                    </Col>
                                </Row>
                                {/* <Row xs='12'>
                                                <Col xs="4" md="4">
                                                    <label
                                                    // htmlFor="userName"
                                                    // className={classes.inputText1}
                                                    >
                                                        {t("Server Url List")}
                                                    </label>
                                                </Col>
                                                <Col xs="8" md="8" >
                                                    <FormGroup>
                                                        <MultiAdd
                                                            name="moduleServer"
                                                            className="form-control"
                                                            // options={modules.map((module) => ({
                                                            //     name: module.moduleName,
                                                            //     value: module.moduleCode
                                                            // }))}
                                                            options={serverUrlList.map((element) => ({
                                                                name: element,
                                                                value: element
                                                            }))}
                                                            objectName="Module"
                                                            setFieldValue={setFieldValue}
                                                            defaultValue={[
                                                                { value: 'a', name: 'a' },
                                                                { value: 'b', name: 'b' },
                                                                { value: 'c', name: 'c' },
                                                                { value: 'd', name: 'd' },
                                                            ]}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row> */}
                            </Col>
                            <Col xs="6" md="6"></Col>
                        </Row>
                    </FormGroup>
                </CardBody>
            </Card>
        </>
    );
};

ServiceCreateForm.propTypes = {
    isCreate: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    form: PropTypes.instanceOf(Object).isRequired,
    updateForm: PropTypes.func.isRequired
};

export default ServiceCreateForm;
