import { padZero } from "./stringUtils";

export function formatMonth(number: number) {
    let month = "";

    switch (number) {
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Fev";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Abr";
            break;
        case 4:
            month = "Mai";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Ago";
            break;
        case 8:
            month = "Set";
            break;
        case 9:
            month = "Out";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dez";
            break;
    }

    return month;
}

export function formatDate(date: any) {
    return `${new Date(date).getFullYear()}-${padZero(new Date(date).getMonth() + 1)}-${padZero(new Date(date).getDate())}`;
}