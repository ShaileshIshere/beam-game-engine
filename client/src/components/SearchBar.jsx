import { React } from 'react';
import { useRecoilState } from 'recoil';
import { searchTermState } from '../atom';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form className='flex items-center sm:mr-16' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={ ("search").toUpperCase() } 
        className="bg-neutral-900 font-medium sm:w-[35rem] w-60 sm:text-sm text-xs mr-4 text-center text-white border border-gray-600 rounded-3xl py-2 px-4 ml-4 outline-none placeholder-gray-400"
        value={searchTerm}
        onChange={handleSearch}
      />
    </form>
  );
}