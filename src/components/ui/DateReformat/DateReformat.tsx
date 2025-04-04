import { format } from "date-fns";

interface PropTypes {
    inputDate: string;
    toFormat: string;
}

const DateReformat = (props: PropTypes) => {
    const {inputDate, toFormat} = props;

    const date = new Date(inputDate);
    const dateFormatted = format(date, toFormat);

    return (
        <span className="light:text-black dark:text-white">
            {dateFormatted}
        </span>
    )
}

export default DateReformat;