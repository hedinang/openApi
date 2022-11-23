import React, { useState, useEffect, useRef } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { useTranslation } from "react-i18next";
import classes from "./NavbarTopMenuToggle.scss";
import { ToastContainer } from "react-toastify";
import ActionModal from "routes/components/ActionModal";

const NavbarTopMenuToggle = () => {
    const { t } = useTranslation();
    const [toggleOn, setToggleOn] = useState(true);
    const refActionModal = useRef(null);
    useEffect(() => {
        if (localStorage.getItem(process.env.SHARE_COOKIES_NAME))
            setToggleOn(true)
        else setToggleOn(false)
    }, [])

    const onToggleChanged = () => {
        if (toggleOn) {
            localStorage.removeItem(process.env.SHARE_COOKIES_NAME)
            window.location.href = 'http://localhost:4100/system-service/service-list'
        }
        else {
            window.location.href = 'http://localhost:4100/login'
        }

    };
    return (
        <>
            <div className={classes["toggle-menu"]}>
                <p className={[classes["text-buyer"], toggleOn ? "" : classes.active].join(" ")}>{t("User")}</p>
                <InputSwitch
                    className={classes["toggle-button"]}
                    // checked={toggleOn}
                    trueValue={toggleOn}
                    onChange={(e) => refActionModal.current.toggleModal(e)
                        }
                />
                <p className={[classes["text-supplier"], !toggleOn ? "" : classes.active].join(" ")}>{t("Guest")}</p>
            </div>
            <ActionModal
                ref={refActionModal}
                title={t("Switch Profile Notice")}
                body={t("Do you wish to switch to ") + (toggleOn ? "Guest" : "User")}
                button="Yes"
                color="primary"
                action={(e) => { onToggleChanged(e) }}
            />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                draggable={false}
                hideProgressBar
            />
        </>
    );
};

export default NavbarTopMenuToggle;
