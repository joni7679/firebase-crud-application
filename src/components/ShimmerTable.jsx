import React from 'react'

function ShimmerTable() {
    const shimmerRows = new Array(4).fill(0);

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white font-sans">
            <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto px-6 pb-6">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-400 border-b border-gray-700">
                            <tr>
                                <th className="px-3 py-2">#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th colSpan={2} className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-white">
                            {shimmerRows.map((_, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b mt-[50px] border-gray-700 hover:bg-gray-700 transition animate-pulse"
                                >
                                    <td className="px-3 py-4">
                                        <div className="h-4 w-6 bg-gray-700 rounded"></div>
                                    </td>
                                    <td>
                                        <div className="w-20 h-20 bg-gray-700 rounded-md"></div>
                                    </td>
                                    <td>
                                        <div className="h-4 w-24 bg-gray-700 rounded"></div>
                                    </td>
                                    <td>
                                        <div className="h-4 w-16 bg-gray-700 rounded"></div>
                                    </td>
                                    <td>
                                        <div className="h-4 w-20 bg-gray-700 rounded"></div>
                                    </td>
                                    <td>
                                        <div className="h-4 w-14 bg-gray-700 rounded"></div>
                                    </td>
                                    <td className="text-center">
                                        <div className="h-6 w-16 bg-gray-700 rounded"></div>
                                    </td>
                                    <td className="text-center">
                                        <div className="h-6 w-16 bg-gray-700 rounded"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ShimmerTable;
