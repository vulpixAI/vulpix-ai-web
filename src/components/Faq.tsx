import { default as FaqComponet } from "react-faq-component";

const data = {
    rows: [
        {
            title: "Lorem ipsum dolor sit amet?",
            content: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam."
        },
        {
            title: "Nunc maximus, magna at ultricies elementum?",
            content: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam."
        },
        {
            title: "Lorem ipsum dolor sit amet?",
            content: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam."
        },
        {
            title: "Nunc maximus, magna at ultricies elementum?",
            content: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam."
        },
        {
            title: "Lorem ipsum dolor sit amet?",
            content: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam."
        }
    ],
};

const styles = {
    bgColor: "transparent",
    titleTextColor: "#c3d1dc",
    rowTitleColor: "#c3d1dc",
    rowContentColor: "#c3d1dc",
    arrowColor: "#5d5aff"
};

export function Faq() {
    return (
        <FaqComponet
            data={data}
            styles={styles}
        />
    )
}