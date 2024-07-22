import React from 'react';

export const SearchBar = () => {
  return (
    <form className='flex items-center mr-16' action="">
        <input
            type="text"
            placeholder="Search..."
            className="bg-neutral-900 w-96 text-white border border-gray-600 rounded-3xl py-2 px-4 mr-2 outline-none placeholder-gray-400"
        />
        <button
            type="submit"
            className="bg-neutral-900 text-white border border-gray-600 rounded-3xl py-2 px-4 hover:bg-neutral-800"
        >
            Search
        </button>
    </form>
  );
}