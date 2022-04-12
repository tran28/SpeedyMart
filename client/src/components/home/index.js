import Content from './Content';
import { ContentData } from "./ContentData"
import Footer from "./Footer"

function Home() {
    return (
        <>
            {/* M: Map through the 'ContentData' JSON array and populate home page*/}
            {ContentData.map((item) => {
                return (
                    <Content key={item.id} {...item} />
                )
            })}

            {/* M: Footer component*/}
            <Footer />
        </>
    )
}

export default Home;