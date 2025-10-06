import Styles from "../Table.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { type IPaginationProps } from "../Interface";
import Select from "../../Fields/Select";

interface Option {
    label: string;
    value: any;
}

const Pagination: FC<IPaginationProps> = ({ pagination, handleNumberOfRows, handlePagination }) => {
    const [pageList, setPageList] = useState<number[]>([]);
    useEffect(() => {
        const pages = Array.from({ length: pagination.total }, (_, index) => index + 1);
        setPageList(() => pages);
    }, [pagination]);

    const options: Option[] = pagination.paginationOptions.map((el) => ({ label: `${el}`, value: el }));

    return (
        <div className={Styles.PaginationContainer}>
            <span
                className={Styles.Button}
                onClick={() => pagination.currPage > 1 && handlePagination(pagination.currPage - 1)}
            >
                <ChevronLeft className="w-5 h-5" />
            </span>
            {pageList.map((page) =>
                <span
                    className={`${Styles.Button} ${pagination.currPage === page && Styles.CurrentPage}`}
                    onClick={() => handlePagination(page)}
                >
                    {page}
                </span>)
            }
            <span className={Styles.Button}
                onClick={() => pagination.total > pagination.currPage && handlePagination(pagination.currPage + 1)}
            >
                <ChevronRight className="w-5 h-5" />
            </span>
            <Select
                className={Styles.Dropdown}
                value={`${pagination.rowsPerPage} Rows`}
                onChange={(e) => handleNumberOfRows(Number(e.target.value))}
                label="Select Value"
                options={options || []}

            />
        </div >
    )
}

export default Pagination;
