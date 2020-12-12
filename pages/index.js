import fetch from "isomorphic-unfetch"
import { Flex, Heading, Link, Text } from "rebass"
import React from "react"
import Head from "next/head"
import { ThemeProvider } from "theme-ui"
import theme from "../components/theme"

export default ({ pages }) => {
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Pocket</title>
                <meta property="og:title" content="Pocket" />
                <meta property="og:description" content="A few links I have saved for later!" />
                <meta name="og:image" content="https://pocket.neelr.dev/static/card.png" />
                <meta name="twitter:title" content="Pocket" />
                <meta name="twitter:description" content="A few links I have saved for later!" />
                <meta name="twitter:image" content="https://pocket.neelr.dev/static/card.png" />
            </Head>
            <Flex width="100vw" minHeight="100vh" flexDirection="column">
                <Heading fontSize={[4, 5, 6]} mx="auto" mt={["50px", "100px"]} mb="5px">Pocket</Heading>
                <Text mx="auto" mb="20px" fontWeight="bold">Take a look at the links I have saved!</Text>
                <Flex mx="auto" flexDirection="column" width={["90vw", "70vw", "60vw"]}>
                    {pages.map(v => {
                        return <Link sx={{
                            color: "primary",
                            textDecoration: "underline",
                            transition: "all 0.5s",
                            ":hover": {
                                textDecorationStyle: "wavy",
                                cursor: "pointer",
                                transform: "scale(1.1) translate(0px,-3px);",
                                color: "secondary"
                            }
                        }} mx="auto">{v}</Link>
                    })}
                </Flex>
                <Flex mt="auto" height="100px">
                    <Text m="auto"><Link sx={{
                        color: "primary",
                        textDecoration: "underline",
                        ":hover": {
                            textDecorationStyle: "wavy",
                            cursor: "pointer",
                        }
                    }} href="https://neelr.dev">@neelr</Link> | <Link sx={{
                        color: "primary",
                        textDecoration: "underline",
                        ":hover": {
                            textDecorationStyle: "wavy",
                            cursor: "pointer",
                        }
                    }} href="https://github.com/neelr/pocket">Source</Link></Text>
                </Flex>
            </Flex>
        </ThemeProvider>
    )
}

export let getStaticProps = async () => {
    let data = await fetch("https://db.neelr.dev/api/df56b597c2d219efc92084bac536315a")
    let { pages } = await data.json()
    return {
        props: {
            pages
        },
        unstable_revalidate: 1,
    }
}