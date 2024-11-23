import { useEffect, useRef, useState } from "react";
import { Menu } from "../../components/Menu";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { formatMonth } from "../../utils/dateUtils";
import { padZero } from "../../utils/stringUtils";
import { Skeleton } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import CircularProgress from '@mui/material/CircularProgress';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import EventIcon from '@mui/icons-material/Event';
import axios from "axios";

interface postResponse {
    media_url: string,
    caption: string,
    like_count: number
}

export default function Posts() {
    const postsContainer: any = useRef(null);
    const isLastPage = useRef(false);
    const isPaginationLoading = useRef(false);

    const [posts, setPosts] = useState<postResponse[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [hasPost, setHasPost] = useState<boolean>(true);

    const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(1, "month"));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [selectedStartDate, setSelectedStartDate] = useState<any>(dayjs().subtract(1, "month"));
    const [selectedEndDate, setSelectedEndDate] = useState<any>(dayjs());

    const [isDateRangePickerModalOpen, setDateRangePickerModalOpen] = useState<boolean>(false);
    const openDateRangePickerModal = () => { setStartDate(selectedStartDate), setEndDate(selectedEndDate), setDateRangePickerModalOpen(true) };
    const closeDateRangePickerModal = () => setDateRangePickerModalOpen(false);

    const [page, setPage] = useState<number>(0);

    function handleScroll() {
        if (isLastPage.current) return;
        if (isPaginationLoading.current) return;

        if (postsContainer.current.clientHeight + postsContainer.current.scrollTop + 1 >= postsContainer.current.scrollHeight) {
            isPaginationLoading.current = true;
            setPage(prev => prev + 1);
        }
    }

    useEffect(() => {
        setTimeout(() => postsContainer.current.addEventListener("scroll", handleScroll), 200);
    }, []);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/posts?page=${page}&size=10`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(response => {
            page == 0 ? setPosts(response.data.content) : setPosts(prev => [...prev, ...response.data.content]);
            setLoading(false);
            isPaginationLoading.current = false;
            response.data.last && (isLastPage.current = true);
        }).catch((err) => {
            if (err.response.status == 404) {
                setTimeout(() => { setLoading(false), setHasPost(false) }, 3000);
            }
        });
    }, [page]);

    function filterDate() {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        closeDateRangePickerModal();
    }

    return (
        <Menu>
            <div className="flex flex-col items-center h-screen w-full overflow-hidden">
                <div className="h-1/5 pt-16 w-full flex justify-end items-center mr-16">
                    <button onClick={openDateRangePickerModal} className="text-white-gray bg-dark-gray flex items-center justify-center py-2 px-4 mr-12 rounded-2xl select-none"><EventIcon sx={{ marginRight: "8px" }} />
                        {formatMonth(new Date(selectedStartDate).getMonth())} {padZero(new Date(selectedStartDate).getDate())}, {new Date(selectedStartDate).getFullYear()}
                        <span className="mx-2">–</span>
                        {formatMonth(new Date(selectedEndDate).getMonth())} {padZero(new Date(selectedEndDate).getDate())}, {new Date(selectedEndDate).getFullYear()}
                    </button>
                </div>
                <div ref={postsContainer} className={`${!isLoading && "overflow-x-hidden"} ${hasPost ? "grid grid-cols-2" : "flex justify-center"} px-2 h-4/5`}>
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
                            ?
                            <>
                                {posts.map((post: postResponse, index: number) =>
                                    <div key={index} className={`relative flex items-center justify-between ${index != 0 && index != 1 && "mt-12"} bg-dark-gray rounded-2xl pr-6 mx-4 w-[41rem] h-[300px]`}>
                                        <img className="w-[340px] h-[300px] rounded-2xl" src={post.media_url} />
                                        <p className="flex justify-start ml-8 text-white-gray w-[460px] h-[122px] overflow-hidden">{post.caption}</p>
                                        <span className="text-white-gray absolute bottom-4 right-4 hover:text-purple transition-colors cursor-pointer">
                                            <Tooltip title="Informações" placement="bottom">
                                                <InfoIcon />
                                            </Tooltip>
                                        </span>
                                    </div>
                                )
                                }
                                <div className="flex justify-end w-full my-8">
                                    {isPaginationLoading.current && <CircularProgress size="50px" sx={{ color: "#5d5aff", marginRight: "-25px" }} />}
                                </div>
                            </>
                            : <h1 className="text-white-gray text-xl mt-8">Ooops! Parece que ainda não tem nada por aqui. Que tal publicar algo e inaugurar o espaço? 😄</h1>
                    }
                </div>
            </div>

            <Modal.Dialog title="Filtrar por Data" onConfirm={filterDate} isOpen={isDateRangePickerModalOpen} onClose={closeDateRangePickerModal}>
                <div className="flex flex-col items-center justify-center w-full">
                    <h3 className="text-center">Bora escolher a data pra dar aquele filtro nas <br /> suas publicações? 📅</h3>
                    <div className="flex justify-center items-center mt-6">
                        <Input.DateRangePicker
                            valueStart={startDate}
                            maxDateStart={endDate}
                            onChangeStart={(date: Dayjs) => setStartDate(date)}
                            valueEnd={endDate}
                            minDateEnd={startDate}
                            onChangeEnd={(date: Dayjs) => setEndDate(date)}
                        />
                    </div>
                </div>
            </Modal.Dialog>
        </Menu>
    )
}