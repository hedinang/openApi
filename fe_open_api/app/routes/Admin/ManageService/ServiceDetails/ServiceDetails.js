import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useHistory, useLocation } from "react-router";
import {
    Container,
    Col,
    Row,
    Button,
} from "components";
import useToast from "routes/hooks/useToast";
import { HeaderMain } from "routes/components/HeaderMain";
import StickyFooter from "components/StickyFooter";
import SystemService from "services/SystemService";
import { useCurrentCompany, usePermission } from "routes/hooks";
import ServiceForm from "./ServiceForm";
import { Formik, Form } from "formik";
import ServiceGroupDetails from "./ServiceGroupDetails";
import ActionModal from "routes/components/ActionModal";

const ServiceDetails = (props) => {
    const { t } = useTranslation();
    const showToast = useToast();
    const history = useHistory();
    const [isCreate, setIsCreate] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    let [authorize, setAuthorize] = useState([])
    let [dataDetail, setDataDetail] = useState()
    const token = localStorage.getItem(process.env.SHARE_COOKIES_NAME)
    const refActionModalRemoveService = useRef(null);
    const query = new URLSearchParams(location.search);
    const serviceId = query.get("id");
    const getServiceDetail = async () => {
        let response = await SystemService.detailService(serviceId)
        if (response.data.status === "OK") {
            setDataDetail(response.data.data)
        } else {
            showToast("error", response.data.message);
        }
    }
    useEffect(() => {
        getServiceDetail()
    }, [])

    const deleteApi = async (apiId) => {
        let response = await SystemService.deleteApi(apiId)
        if (response.data.status === "OK") {
            showToast("success", response.data.message);
            getServiceDetail()
        } else {
            showToast("error", response.data.message);
        }
    }
    const deleteService = async () => {
        console.log('aaa')
        let response = await SystemService.deleteService(serviceId)
        if (response.data.status === "OK") {
            showToast("success", response.data.message);
            history.push('/system-service/service-list')
        } else {
            showToast("error", response.data.message);
        }
    }

    const onBackButtonPressHandler = () => {

    };
    const onEditService = () => {
        history.push('/system-service/service-edit?id=' + serviceId);
    };
    const bottomButtonList = () => {
        if (token)
            return <Row className="mx-0">
                <Button
                    color="danger" // danger warning primary
                    className="mr-3"
                    type="submit"
                    onClick={() => refActionModalRemoveService.current.toggleModal()}

                >
                    {t("Remove")}
                </Button>
                <Button
                    color="primary"
                    type="submit"
                    onClick={onEditService}
                >
                    {t("Edit")}
                </Button>
            </Row>
        else return <></>

    }

    const initialValues = {}
    return (
        <>
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
                                            title={(t("Service Details"))}
                                            className="mb-3 mb-lg-3"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    <Col lg={12}>
                                        <ServiceForm
                                            isCreate={isCreate}
                                            isEdit={isEdit}
                                            headerName={t("General Information")}
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            dataDetail={dataDetail}
                                            authorize={authorize}
                                            setAuthorize={setAuthorize}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    {dataDetail?.groupDtoList?.map(e => < ServiceGroupDetails groupService={e}
                                        authorize={authorize}
                                        deleteApi={deleteApi}
                                        token={token}
                                        serverUrl={values.serverUrl} />)}
                                </Row>
                                <StickyFooter>
                                    <Row className="justify-content-between mx-0 px-3">
                                        <Button
                                            onClick={() => (isEdit ? onBackButtonPressHandler() : history.goBack())}
                                        >
                                            {t("Back")}
                                        </Button>
                                        {bottomButtonList()}
                                    </Row>
                                </StickyFooter>
                            </Form>
                        )
                    }}
                </Formik>
                <ActionModal
                    ref={refActionModalRemoveService}
                    title="Remove Api"
                    body="Do you wish to remove this service?"
                    button="Yes"
                    color="primary"
                    textCancel="No"
                    colorCancel="danger"
                    action={(e) => deleteService()}
                />
            </Container>
        </>
    );
};

export default ServiceDetails;
