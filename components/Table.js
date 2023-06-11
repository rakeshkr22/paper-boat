import React, { useState } from 'react';

const Table = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Function to handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle sorting
  const handleSort = (key) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Sort data
  if (sortConfig.key) {
    currentData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Render table rows
  const renderTableRows = currentData.map((item, index) => (
    <tr key={index}>
      <td className="py-2">{item.publisher}</td>
      <td className="py-2">{item.item}</td>
      <td className="py-2">₹{item.price}</td>
      <td className="py-2">{item.quantity}</td>
      <td className="py-2">₹{item.totalPrice}</td>
      <td class="text-center py-2">
            <button class="text-red-500 hover:text-red-600">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
      </td>
    </tr>
  ));

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Generate pagination buttons
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        className={`mx-1 px-4 py-2 rounded ${
          i === currentPage ? 'bg-black text-white' : 'bg-white text-black-500 hover:bg-black-200'
        }`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex mx-auto mt-8 mb-8">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left font-semibold w-40">
              <button className="sortable" onClick={() => handleSort('publisher')}>
                Publisher
              </button>
            </th>
            <th className="text-left font-semibold w-40">
              <button className="sortable" onClick={() => handleSort('item')}>
                Item
              </button>
            </th>
            <th className="text-left font-semibold w-20">
              <button className="sortable" onClick={() => handleSort('price')}>
                Price
              </button>
            </th>
            <th className="text-left font-semibold w-20">
              <button className="sortable" onClick={() => handleSort('quantity')}>
                Quantity
              </button>
            </th>
            <th className="text-left font-semibold w-20">
              <button className="sortable" onClick={() => handleSort('totalPrice')}>
                Total Price
              </button>
            </th>
            <th class="text-right w-10"></th>
          </tr>
        </thead>
        <tbody>{renderTableRows}</tbody>
      </table>

    { /*
      <div className="flex justify-between mt-4">
        <div>
          <button
            className="Avenir text-black px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="Avenir text-black ml-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div>
          <span className="text-sm leading-5 Avenir text-black mr-2">Page</span>
          {paginationButtons}
        </div>
  </div> */}

      

    </div>
  );
};

export default Table;
