import React from "react";
import IconButton from "../Button/IconButton";
interface ITableProps {
    columns: any[];
    data: any[];
    actions?: any[];
}


const Table: React.FC<ITableProps> = ({ columns, data, actions }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                className="border-r border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700"
                            >
                                {col.title}
                            </th>
                        ))}
                        {actions && actions.length > 0 && (
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (actions ? 1 : 0)}
                                className="text-center py-4 text-gray-500"
                            >
                                No records found
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr key={row._id} className="border-t border-gray-200 hover:bg-gray-50">
                                {columns.map((col) => (
                                    <td
                                        key={String(col.key)}
                                        className="border-r border-gray-200 px-4 py-2 text-sm text-gray-700 max-w-[300px] truncate overflow-hidden whitespace-nowrap"
                                    >
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                                {actions && actions.length > 0 && (
                                    <td className="px-4 py-2 flex gap-2">
                                        {actions.map((action, idx) => (
                                            <IconButton
                                                variant={action.tooltip === "Delete" ? "danger" : "primary"}
                                                size="md"
                                                onClick={() => action.onClick(row._id)}
                                                fullWidth
                                                icon={action.icon}
                                            />
                                        ))}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>

    );
};

export default Table;
