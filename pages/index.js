import fetch from "isomorphic-unfetch"
import { Flex, Heading } from "rebass"

export default props => {
    return (
        <Flex width="100vw" minHeight="100vh">
            <Heading fontSize={[4, 5, 6]} mx="auto" my={["50px", "100px"]}>Pocket</Heading>
        </Flex>
    )
}

export let getServerSideProps = async () => {
    fetch("")
}