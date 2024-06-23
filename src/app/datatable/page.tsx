"use client"

import React, { useState, useEffect } from 'react';

interface DataItem {
  id: number;
  name: string;
  description: string;
}

interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
  next_page_url: string | null;
  previous_page_url: string | null;
}

interface ApiResponse {
  data: DataItem[];
  pagination: PaginationInfo;
}

interface PaginatedDataTableProps {
  apiUrl: string;
}
const API_BASE_URL = 'https://api.npoint.io/';
const PaginatedDataTable: React.FC<PaginatedDataTableProps> = ({ apiUrl }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData('https://api.npoint.io/c91038158904aa76f14d');
  }, [apiUrl]);

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result: ApiResponse = await response.json();
      setData(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handlePageChange = (page: number) => {
    if (pagination) {
      fetchData(`${apiUrl}?page=${page}`);
    }
  };

  const renderPaginationButtons = () => {
    if (!pagination) return null;

    const { current_page, total_pages } = pagination;
    const buttons = [];

    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(current_page - 1)}
        disabled={current_page === 1}
      >
        Previous
      </button>
    );

    const renderPageButton = (page: number) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        disabled={page === current_page}
      >
        {page}
      </button>
    );

    if (total_pages <= 7) {
      for (let i = 1; i <= total_pages; i++) {
        buttons.push(renderPageButton(i));
      }
    } else {
      buttons.push(renderPageButton(1));
      if (current_page > 3) buttons.push(<span key="ellipsis1">...</span>);

      const start = Math.max(2, current_page - 1);
      const end = Math.min(current_page + 1, total_pages - 1);

      for (let i = start; i <= end; i++) {
        buttons.push(renderPageButton(i));
      }

      if (current_page < total_pages - 2) buttons.push(<span key="ellipsis2">...</span>);
      buttons.push(renderPageButton(total_pages));
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(current_page + 1)}
        disabled={current_page === total_pages}
      >
        Next
      </button>
    );

    return buttons;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pagination) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>{renderPaginationButtons()}</div>
    </div>
  );
};

export default PaginatedDataTable;