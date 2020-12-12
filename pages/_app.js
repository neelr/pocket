import React from "react"
import { ThemeProvider } from "theme-ui"
import theme from "../components/theme"

export default ({ Component, props }) => (
    <ThemeProvider theme={theme}>
        <Component {...props} />
    </ThemeProvider>
)