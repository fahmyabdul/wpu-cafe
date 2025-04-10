import { Input, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { cn } from "../../../utils/cn";
import { LIMIT_LISTS } from "../../../constants/constants";
import CustomSpinner from "../CustomSpinner";

interface PropTypes {
    columns: Record<string, unknown>[];
    limit: string;
    data: Record<string, unknown>[];
    currentPage: number;
    totalPages: number;
    rightTopContent?: ReactNode;
    searchPlaceholder?: string;
    columnFilterContent?: ReactNode;
    bottomFilterContent?: ReactNode;
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    onClearSearch: () => void;
    onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
    onChangePage: (page: number) => void;
    isLoading?: boolean;
    emptyContent: ReactNode;
    renderCell: (index: number, item: Record<string,unknown>, columnKey: Key) => ReactNode;
}

const DataTable = (props: PropTypes) => {
    const { 
        columns, 
        data, 
        limit,
        rightTopContent, 
        onChangeLimit,
        searchPlaceholder,
        onChangeSearch, 
        onClearSearch, 
        totalPages,
        onChangePage,
        currentPage,
        emptyContent,
        isLoading,
        columnFilterContent,
        bottomFilterContent,
        renderCell,
    } = props;

    const TopContent = useMemo(() => {
        return (
            <div className="flex flex-row items-center justify-between ">
                <Input 
                    isClearable 
                    aria-label="datatable-search"
                    className="max-w-full sm:max-w-[34%] mr-2" 
                    placeholder={searchPlaceholder ? searchPlaceholder : "Search by Name"}
                    startContent={<FaMagnifyingGlass/>}
                    onClear={onClearSearch}
                    onChange={onChangeSearch}
                />
                <div className="flex flex-row gap-2">
                    {columnFilterContent && (
                        <div className="w-fit">
                            { columnFilterContent }
                        </div>
                    )}
                    {rightTopContent && (
                        <div className="w-fit">
                            {rightTopContent}
                        </div>
                    )}
                </div>
            </div>
        )
    }, [
        rightTopContent, 
        searchPlaceholder,
        onChangeSearch, 
        onClearSearch, 
        columnFilterContent,
    ]);

    const BottomContent = useMemo(() => {
        return (
            <div className="flex items-center justify-center px-2 py-2 lg:justify-between">
                <div className="flex flex-row gap-2">
                    <Select
                        aria-label="datatable-select"
                        className="hidden min-w-28 lg:block"
                        size="md"
                        selectedKeys={[limit]}
                        selectionMode="single"
                        onChange={onChangeLimit}
                        startContent={<p className="text-small">Show:</p>}
                    >
                        {LIMIT_LISTS.map((item) => (
                            <SelectItem
                                key={item.value}
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                    {bottomFilterContent && bottomFilterContent}
                </div>
                <Pagination 
                    aria-label="datatable-pagination"
                    isCompact 
                    showControls 
                    page={currentPage} 
                    total={totalPages}
                    onChange={onChangePage}
                    classNames={{
                        wrapper: "gap-0 overflow-visible h-8 rounded",
                        cursor:
                            "bg-teal-600 text-white font-bold",
                    }}
                />
            </div>
        );
    },[
        limit,
        currentPage,
        totalPages,
        onChangeLimit,
        onChangePage,
        bottomFilterContent,
    ]);

    return (
        <Table 
            isStriped
            selectionMode="single"
            aria-label="datatable-table"
            topContent={TopContent}
            topContentPlacement="outside"
            bottomContent={BottomContent}
            bottomContentPlacement="outside"
            classNames={{ 
                base: "max-w-full",
                wrapper: cn({"overflow-x-hidden": isLoading})
            }}
        >
            <TableHeader
                aria-label="datatable-header"
                columns={columns}
            >
                {(column) => (
                    <TableColumn key={column.uid as Key} className="text-white bg-teal-600 text-small">
                        {column.name as string}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                aria-label="datatable-body"
                items={data}
                emptyContent={emptyContent}
                isLoading={isLoading}
                loadingContent={
                    <div className="flex items-center justify-center w-full h-full bg-teal-600/60 dark:bg-foreground-700/30 backdrop-blur-sm">
                        <CustomSpinner width={300}/>
                    </div>
                }
            >
                {
                    (item)=> (
                        <TableRow 
                            aria-label={"datatable-row-"+item._id} 
                            key={item._id as Key}
                            className="hover:bg-teal-500 dark:hover:bg-teal-600 first:rounded-l-lg last:rounded-r-lg"
                        >
                            {
                                (columnKey) => {
                                    return (
                                        <TableCell
                                            className="first:rounded-l-lg last:rounded-r-lg"
                                        >
                                            {
                                                renderCell(data.indexOf(item), item, columnKey)
                                            }
                                        </TableCell>
                                    )
                                }
                            }
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    )
}

export default DataTable;