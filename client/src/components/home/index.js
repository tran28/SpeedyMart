import Content from './Content';
import { ContentData } from "./ContentData"

function Home() {
    return (
        <>
            {ContentData.map((item) => {
                return (
                    <Content {...item}/>
                )
            })}
        </>
    )
}

export default Home;