import { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";
import { useLastPage } from "../../hooks/useLastPage";
import { LoadingScreen } from "../../components/LoadingScreen";

export default function Dashboard() {
    useLastPage();

    const [bearerToken, setBearerToken] = useState<string | null>("");
    const [showLoadingScreen, setLoadingScreen] = useState<boolean>(false);

    useEffect(() => {
        setBearerToken(sessionStorage.getItem("bearerToken"));

        if (!sessionStorage.getItem("isPageLoaded")) {
            sessionStorage.setItem("isPageLoaded", "true");
            setLoadingScreen(true);
            setTimeout(() => setLoadingScreen(false), 3000);
        }
    }, []);

    return (
        <>
            {showLoadingScreen
                ?
                <LoadingScreen />
                :
                <div className="h-screen overflow-hidden">
                    <Menu>
                        <></>
                    </Menu>
                </div>
            }
        </>
    )
}