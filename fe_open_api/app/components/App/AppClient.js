import React, { useState, useEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "layout/default";
import { RoutedContent } from "routes";
import { ThemeProvider } from "styled-components";
import WebFont from "webfontloader";
import GlobalStyles from "theme/GlobalStyles";
import { useTheme } from "theme/useTheme";

const basePath = process.env.BASE_PATH || "/";

function AppClient() {
    const [crumbs, setCrumbs] = useState([]);
    const { theme, themeLoaded, getFonts } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);
    const updateCrumbs = (props) => {
        if (JSON.stringify(props) !== JSON.stringify(crumbs)) {
            setTimeout(() => {
                setCrumbs(props);
            });
        }
    };
    useEffect(() => {
        setSelectedTheme(theme);
    }, [themeLoaded]);

    useEffect(() => {
        WebFont.load({
            google: {
                families: getFonts()
            }
        });
    });

    return (
        <>
            {
                themeLoaded
                && (
                    <ThemeProvider theme={selectedTheme}>
                        <GlobalStyles />
                        <Router basename={basePath}>
                            <AppLayout crumbs={crumbs}>
                                <RoutedContent setCrumbs={updateCrumbs} />
                            </AppLayout>
                        </Router>
                    </ThemeProvider>
                )
            }
        </>
    );
}

export default hot(module)(AppClient);
