import { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";
import { Input } from "../../components/Input";
import { Skeleton } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import axios from "axios";

interface postResponse {
    media_url: string,
    caption: string,
    like_count: number
}

export default function Posts() {
    const [posts, setPosts] = useState<postResponse[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [hasPost, setHasPost] = useState<boolean>(true);

    const [startDate, setStartDate] = useState<Dayjs | any>(dayjs().subtract(1, "month"));
    const [endDate, setEndDate] = useState<Dayjs | any>(dayjs());

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(response => {
            setPosts(response.data);
            setLoading(false);
        }).catch((err) => {
            if (err.response.status == 404) {
                setTimeout(() => { setLoading(false), setHasPost(false) }, 3000);
            }
        });
    }, []);

    return (
        <Menu>
            <div className="flex flex-col items-center h-screen w-full overflow-hidden">
                <div className="h-1/5 pt-16 w-full flex justify-end items-center mr-16">
                    <Input.DatePicker maxDate={endDate} value={startDate} onChange={(date: Dayjs | any) => setStartDate(date)} />
                    <span className="text-white-gray text-2xl font-bold mr-2">-</span>
                    <Input.DatePicker minDate={startDate} maxDate={dayjs()} value={endDate} onChange={(date: Dayjs | any) => setEndDate(date)} />
                </div>
                <div className={`${!isLoading && "overflow-x-hidden"} ${hasPost ? "grid grid-cols-2" : "flex justify-center"} px-2 h-4/5 pb-8`}>
                    {isLoading
                        ?
                        <>
                            <Skeleton
                                sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 16px" }}
                                variant="rectangular"
                                width={672}
                                height={300}
                            />
                            <Skeleton
                                sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 16px" }}
                                variant="rectangular"
                                width={672}
                                height={300}
                            />
                            <Skeleton
                                sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "48px 16px" }}
                                variant="rectangular"
                                width={672}
                                height={300}
                            />
                            <Skeleton
                                sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "48px 16px" }}
                                variant="rectangular"
                                width={672}
                                height={300}
                            />
                            <Skeleton
                                sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 16px" }}
                                variant="rectangular"
                                width={672}
                                height={300}
                            />
                            <Skeleton
                                sx={{ bgcolor: '#222222', borderRadius: "1rem", margin: "0 16px" }}
                                variant="rectangular"
                                width={672}
                                height={300}
                            />
                        </>
                        :
                        hasPost
                            ? posts.map((post: postResponse, index: number) =>
                                <div key={index} className={`relative flex items-center justify-between ${index != 0 && index != 1 && "mt-12"} bg-dark-gray rounded-2xl pr-6 mx-4 w-[41rem]`}>
                                    <img className="w-[340px] h-[300px] rounded-2xl" src={post.media_url} />
                                    <p className="flex justify-start ml-8 text-white-gray w-[460px] h-[122px] overflow-hidden">{post.caption}</p>
                                    <span className="text-white-gray absolute bottom-4 right-4 hover:text-purple transition-colors cursor-pointer">
                                        <Tooltip title="Informações" placement="bottom">
                                            <InfoIcon />
                                        </Tooltip>
                                    </span>
                                </div>
                            )
                            : <h1 className="text-white-gray text-xl mt-8">Ooops! Parece que ainda não tem nada por aqui. Que tal publicar algo e inaugurar o espaço? 😄</h1>
                    }
                </div>
            </div>
        </Menu>
    )
}