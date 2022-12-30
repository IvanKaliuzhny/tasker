import {Box, Image} from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'

function NoPage() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 150,
        }}>
            <img
                src={"/obladaet.jpg"} alt="слышь тебе сюда нельзя"
                width={450}
            />
        </div>
    )
}

export default NoPage;