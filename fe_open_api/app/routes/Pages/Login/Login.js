/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import UserDataService from "services/UserService";
import { ToastContainer, toast } from "react-toastify";
import {
    FormGroup,
    EmptyLayout,
    Divider
} from "components";
import { AvForm, AvField } from "availity-reactstrap-validation";
import ButtonSpinner from "components/ButtonSpinner";
import { HeaderMain } from "routes/components/HeaderMain";
import classes from "./Login.scss";
import { useToast } from "routes/hooks";
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useToast();
    const handleLogin = () => {
        if (email && password) {
            setIsLoading(true);
            UserDataService.authentication({ username: email, password: password })
                .then((response) => {
                    setIsLoading(false);
                    const responseData = response.data;
                    if (responseData.status === "OK") {
                        localStorage.setItem(process.env.SHARE_COOKIES_NAME, responseData?.data)
                        showToast("success", response.data.message);
                        setTimeout(() => {
                            window.location.href = 'http://localhost:4100/system-service/service-list'
                        }, 1000);

                    } else {
                        showToast("error", "login incorrect");
                        setTimeout(() => {
                            window.location.href = 'http://localhost:4100/login'
                        }, 1000);
                        

                    }

                })
        }
    }

    return (
        <EmptyLayout>
            <EmptyLayout.Section>
                <div className={`${classes.login_container}`}>
                    <Divider className={`${classes.image_content}`}>
                        <div className={`${classes.login_image}`} />
                        <div className={`${classes.logo_doxa}`} />
                    </Divider>

                    <Divider className={`${classes.login_content}`}>
                        <HeaderMain
                            title="Welcome"
                            className={`${classes.title} mx-0 px-0`}
                        />
                        <div className={`${classes.sub_title}`}>
                            Let do it together!
                        </div>
                        <AvForm
                            onValidSubmit={handleLogin}
                        >
                            <FormGroup>
                                <AvField
                                    type="text"
                                    name="email"
                                    label="Email or Username"
                                    placeholder="Enter email..."
                                    validate={{
                                        required: { value: true, errorMessage: "Email is required." },
                                        // pattern: { value: "^[a-zA-Z0-9_]+((\\.[a-zA-Z0-9_]+)+)?@[a-z][a-zA-Z-0-9]*\\.[a-z]+(\\.[a-z]+)*?$", errorMessage: "Email is invalid." }
                                    }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <AvField
                                    type="password"
                                    name="password"
                                    label="Password"
                                    placeholder="Password..."
                                    validate={{
                                        required: { value: true, errorMessage: "Password is required." }
                                    }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {/* <Link to="/pages/forgotpassword" className={`${classes.forgot_password}`}>
                                    Forgot Password?
                                </Link> */}
                                <ButtonSpinner text="Login" isLoading={isLoading} type="submit" />
                            </FormGroup>
                        </AvForm>
                        {/* <div className={`${classes.register}`}>
                            <div>Not a user yet?</div>
                            <Link to="/pages/register" className={`${classes.register_now}`}>
                                Register Now!
                            </Link>
                        </div> */}
                        {/* <FooterLogin /> */}
                    </Divider>
                </div>
            </EmptyLayout.Section>
            <ToastContainer
                position="top-right"
                autoClose={50000}
                draggable={false}
                hideProgressBar
            />
        </EmptyLayout>
    );
};

export default Login;
