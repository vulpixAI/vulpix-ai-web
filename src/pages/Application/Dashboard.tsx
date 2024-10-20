import { Menu } from "../../components/Menu";
import { useLastPage } from "../../hooks/useLastPage";
import { Questions } from "../../components/Questions";

export default function Dashboard() {
    useLastPage();

    return (
        <div className="h-screen overflow-hidden">
            <Questions />
            <Menu>
                <></>
            </Menu>
        </div>
    )
}