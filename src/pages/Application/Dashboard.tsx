import { useState } from "react";
import { Menu } from "../../components/Menu";
import { useLastPage } from "../../hooks/useLastPage";
import { Questions } from "../../components/Questions";

export default function Dashboard() {
    useLastPage();

    const [isFormCompleted, setFormCompleted] = useState<boolean>(false);

    return (
        <div className="h-screen">
            {isFormCompleted
                ?
                <Menu>
                    <></>
                </Menu>
                :
                <Questions />
            }
        </div>
    )
}