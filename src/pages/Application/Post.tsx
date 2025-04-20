import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu } from "../../components/Menu";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { formatMonth, formatDate } from "../../utils/dateUtils";
import { padZero } from "../../utils/stringUtils";
import { Skeleton } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import CircularProgress from '@mui/material/CircularProgress';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PersonIcon from '@mui/icons-material/Person';
import ExploreIcon from '@mui/icons-material/Explore';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import EventIcon from '@mui/icons-material/Event';
import axios from "axios";
import React from "react";

interface postResponse {
    id: string,
    media_url: string,
    caption: string,
    like_count: number
}

interface PostMetrics {
    image_url: string,
    caption: string,
    metrics: {
        comments: { value: number },
        impressions: { value: number },
        likes: { value: number },
        profile_visits: { value: number },
        reach: { value: number },
        saved: { value: number },
        shares: { value: number }
    }
}

export default function Post() {
    const postsContainer: any = useRef(null);
    const isLastPage = useRef(false);
    const isPaginationLoading = useRef(false);

    const [posts, setPosts] = useState<postResponse[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [hasPost, setHasPost] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");

    const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(1, "month"));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [selectedStartDate, setSelectedStartDate] = useState<any>(dayjs().subtract(1, "year"));
    const [selectedEndDate, setSelectedEndDate] = useState<any>(dayjs());
    const [isDateRangeChanged, setDateRangeChanged] = useState<boolean>(false);

    const [isDateRangePickerModalOpen, setDateRangePickerModalOpen] = useState<boolean>(false);
    const openDateRangePickerModal = () => { setStartDate(selectedStartDate), setEndDate(selectedEndDate), setDateRangePickerModalOpen(true) };
    const closeDateRangePickerModal = () => setDateRangePickerModalOpen(false);

    const [isGetPostByIdLoading, setGetPostByIdLoading] = useState<boolean>(false);
    const [selectedPostMetrics, setSelectedPostMetrics] = useState<Partial<PostMetrics>>({});
    const [isPostInfoModalOpen, setPostInfoModalOpen] = useState<boolean>(false);
    const openPostInfoModal = () => setPostInfoModalOpen(true);
    const closePostInfoModal = () => setPostInfoModalOpen(false);
    const modalCaptionDiv: any = useRef(null);
    const [isCaptionDivScrollable, setCaptionDivScrollable] = useState<boolean>(false);

    const [page, setPage] = useState<number>(0);

    function handleScroll() {
        if (isLastPage.current) return;
        if (isPaginationLoading.current) return;

        if (postsContainer.current.clientHeight + postsContainer.current.scrollTop + 1 >= postsContainer.current.scrollHeight) {
            isPaginationLoading.current = true;
            setPage(prev => prev + 1);
        }
    }

    useLayoutEffect(() => {
        if (postsContainer.current) {
            postsContainer.current.addEventListener("scroll", handleScroll);
            return () => postsContainer.current.removeEventListener("scroll", handleScroll);
        }
    }, [postsContainer.current]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/posts?page=${page}&size=10&dataInicio=${formatDate(selectedStartDate)}&dataFim=${formatDate(selectedEndDate)}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(response => {
            if (response.status == 204) {
                setDateRangeChanged(false);
                setMessage("Hmm... 🔍 Nada foi encontrado por aqui.");
                setTimeout(() => { setLoading(false), setHasPost(false) }, 3000);
                return;
            }

            if (isDateRangeChanged) {
                setPosts(response.data.content);
                setDateRangeChanged(false);
            } else {
                page > 0 ? setPosts(prev => [...prev, ...response.data.content]) : setPosts(response.data.content);
            }
            setLoading(false);

            isPaginationLoading.current = false;
            isLastPage.current = response.data.last;
        }).catch(err => {
            if (err.response.status == 401) {
                setMessage("Hmm... 😅 Você ainda não se conectou em nenhuma rede social. Que tal fazer isso agora?");
                setTimeout(() => { setLoading(false), setHasPost(false) }, 3000);
            }
        });
    }, [page, isDateRangeChanged]);

    useEffect(() => {
        if (modalCaptionDiv.current) {
            const hasScroll = modalCaptionDiv.current.scrollHeight > modalCaptionDiv.current.clientHeight;
            setCaptionDivScrollable(hasScroll);
        }
    }, [selectedPostMetrics]);

    async function getPostById(postId: string, postImage: string, postCaption: string) {
        setSelectedPostMetrics({ image_url: postImage, caption: postCaption });
        setGetPostByIdLoading(true);
        await axios.get(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`
            }
        }).then(response => {
            setSelectedPostMetrics((prev: any) => ({ ...prev, ...response.data }));
            setGetPostByIdLoading(false);
        });
    }

    function filterDate() {
        postsContainer.current.scrollTop = 0;
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
        setPage(0);
        setHasPost(true);
        setLoading(true);
        setDateRangeChanged(true);
        closeDateRangePickerModal();
    }

    return (
        <Menu>
            <div className="flex flex-col items-center h-screen w-full overflow-hidden">
                <div className="h-1/5 pt-16 w-full flex justify-end items-center mr-16">
                    <Tooltip title="Filtrar Publicações" placement="left">
                        <button onClick={openDateRangePickerModal} className="text-white-gray bg-dark-gray flex items-center justify-center py-2 px-4 mr-12 rounded-2xl select-none transition-all hover:text-purple"><EventIcon sx={{ marginRight: "8px" }} />
                            {formatMonth(new Date(selectedStartDate).getMonth())} {padZero(new Date(selectedStartDate).getDate())}, {new Date(selectedStartDate).getFullYear()}
                            <span className="mx-2">–</span>
                            {formatMonth(new Date(selectedEndDate).getMonth())} {padZero(new Date(selectedEndDate).getDate())}, {new Date(selectedEndDate).getFullYear()}
                        </button>
                    </Tooltip>
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
                                    <React.Fragment key={index}>
                                        <div key={index} className={`relative flex items-center justify-between ${index != 0 && index != 1 && "mt-12"} bg-dark-gray rounded-2xl pr-6 mx-4 w-[41rem] h-[300px]`}>
                                            <img className="w-[340px] h-[300px] rounded-2xl pointer-events-none" src={post.media_url} />
                                            <p className="flex justify-start ml-8 text-white-gray w-[460px] h-[122px] overflow-hidden">{post.caption}</p>
                                            <button onClick={() => { getPostById(post.id, post.media_url, post.caption), openPostInfoModal() }} className="text-white-gray absolute bottom-4 right-4 hover:text-purple transition-colors cursor-pointer">
                                                <Tooltip title="Informações" placement="bottom">
                                                    <InfoIcon />
                                                </Tooltip>
                                            </button>
                                        </div>
                                        {posts.length % 2 != 0 && posts.length - 1 == index &&
                                            <div className=" flex items-center justify-between mt-12 rounded-2xl pr-6 mx-4 w-[41rem] h-[300px]"></div>
                                        }
                                    </React.Fragment>
                                )
                                }
                                <div className={`flex items-center justify-end w-full ${isLastPage.current ? "h-10" : "h-24"}`}>
                                    {isPaginationLoading.current && <CircularProgress size="50px" sx={{ color: "#5d5aff", marginRight: "-25px" }} />}
                                </div>
                            </>
                            : <h1 className="text-white-gray text-xl mt-4">{message}</h1>
                    }
                </div>
            </div>

            <Modal.Dialog title="Filtrar por Data" onConfirm={filterDate} isOpen={isDateRangePickerModalOpen} onClose={closeDateRangePickerModal}>
                <div className="flex flex-col items-center justify-center w-full">
                    <h3 className="text-center">Bora escolher a data pra filtrar as suas publicações? 📅</h3>
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

            <Modal.Modal width={800} title="Informações da Publicação" isOpen={isPostInfoModalOpen} onClose={closePostInfoModal}>
                <div className="flex justify-center items-center h-full w-full">
                    {isGetPostByIdLoading
                        ? <div className="my-4">
                            <CircularProgress size="50px" sx={{ color: "#5d5aff", marginTop: "-40px" }} />
                        </div>
                        : <div className="flex flex-col h-full">
                            <div className="flex items-center">
                                <img className="w-[340px] h-[300px] rounded-2xl pointer-events-none" src={selectedPostMetrics.image_url} />
                                <p ref={modalCaptionDiv} className={`flex ${!isCaptionDivScrollable && "items-center"} ml-6 pr-2 text-white-gray w-[460px] h-[300px] overflow-y-auto`}>{selectedPostMetrics.caption}</p>
                            </div>
                            <div className="mt-10 mb-2 w-full h-full flex justify-between ml-2">
                                <div className="flex flex-col justify-between h-20">
                                    <div className="flex items-center w-28">
                                        <Tooltip title="Curtidas" placement="bottom">
                                            <ThumbUpIcon />
                                        </Tooltip>
                                        <span className="ml-3 mt-[1px]">{selectedPostMetrics.metrics?.likes.value}</span>
                                    </div>

                                    <div className="flex items-center w-28">
                                        <Tooltip title="Visualizações" placement="bottom">
                                            <VisibilityIcon />
                                        </Tooltip>
                                        <span className="ml-3 mt-[1px]">{selectedPostMetrics.metrics?.impressions.value}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between h-20">
                                    <div className="flex items-center w-28">
                                        <Tooltip title="Comentários" placement="bottom">
                                            <CommentIcon />
                                        </Tooltip>
                                        <span className="ml-3 mt-[1px]">{selectedPostMetrics.metrics?.comments.value}</span>
                                    </div>

                                    <div className="flex items-center w-28">
                                        <Tooltip title="Visitas ao Perfil" placement="bottom">
                                            <PersonIcon />
                                        </Tooltip>
                                        <span className="ml-3 mt-[1px]">{selectedPostMetrics.metrics?.profile_visits.value}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between h-20">
                                    <div className="flex items-center w-28">
                                        <Tooltip title="Compartilhamentos" placement="bottom">
                                            <ShareIcon />
                                        </Tooltip>
                                        <span className="ml-3 mt-[1px]">{selectedPostMetrics.metrics?.shares.value}</span>
                                    </div>

                                    <div className="flex items-center w-28">
                                        <Tooltip title="Alcance de Pessoas" placement="bottom">
                                            <ExploreIcon />
                                        </Tooltip>
                                        <span className="ml-3 mt-[1px]">{selectedPostMetrics.metrics?.reach.value}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col h-20">
                                    <div className="flex items-center w-24">
                                        <Tooltip title="Salvos" placement="bottom">
                                            <BookmarkIcon />
                                        </Tooltip>
                                        <span className="ml-3 mt-[1px]">{selectedPostMetrics.metrics?.saved.value}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Modal.Modal>
        </Menu>
    )
}