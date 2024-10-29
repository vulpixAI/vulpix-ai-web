import { Menu } from "../../components/Menu";
import useLastPage from "../../hooks/useLastPage";

export default function Posts() {
    useLastPage();

    return (
        <div className="h-screen">
            <Menu>
                <></>
            </Menu>
        </div>
    )
}