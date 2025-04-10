const ORDER_TABLES = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
];

const ORDER_COLUMN_LISTS = [
    {name: "No", uid: "no"},
    {name: "Customer Name", uid: "customer_name"},
    {name: "Table", uid: "table_number"},
    {name: "Total", uid: "total"},
    {name: "Status", uid: "status"},
    {name: "Ordered At", uid: "created_at"},
    {name: "Actions", uid: "actions"},
];

const COLUMN_STATUS_LISTS = [
    { label: "All", value: "" },
    { label: "Processing", value: "PROCESSING" },
    { label: "Completed", value: "COMPLETED" },
];


const SORT_ORDER_LISTS = [
    { label: "Descending", value: "desc" },
    { label: "Ascending", value: "asc" },
];

const SORT_BY_LISTS = [
    { label: "Ordered At", value: "created_at" },
    { label: "Customer Name", value: "customer_name" },
    { label: "Table", value: "table_number" },
    { label: "Total", value: "total" },
    { label: "Status", value: "status" },
];

export { ORDER_TABLES, ORDER_COLUMN_LISTS, COLUMN_STATUS_LISTS, SORT_ORDER_LISTS, SORT_BY_LISTS };