import { Menu } from "../../components/Menu";
import { useLastPage } from "../../hooks/useLastPage";

export default function Creative() {
    useLastPage();

    return (
        <div className="h-screen">
            <Menu>
                <></>
            </Menu>
        </div>
    )
}