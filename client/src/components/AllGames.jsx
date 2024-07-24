import { useEffect, useState } from "react";
import { LightTooltip } from './Hovers';
import { useRecoilValue } from "recoil";
import { searchTermState } from "../atom";
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
// import games from "../api/allGames";

export const AllGames = ({ games }) => {
    const [gameList, setGameList] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const searchTerm = useRecoilValue(searchTermState) || "";
  
    useEffect(() => {
      setGameList(games || []);
      setFilteredGames(games || []); // Initialize filtered games with the full game list
    }, [games]);
  
    useEffect(() => {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = gameList.filter(game =>
        game.gameName.toLowerCase().startsWith(lowercasedFilter)
      );
      setFilteredGames(filteredData);
    }, [searchTerm, gameList]);

    return (
        <div className="px-44 py-3 static">
            <h1 className="text-2xl font-bold mb-4 text-center text-slate-300">{("Game Dashboard").toUpperCase()}</h1>
            <div className="flex flex-wrap -mx-4">
                {filteredGames.length > 0 ? ( filteredGames.map((game) => (
                    <div 
                        key={game.gameId} 
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2 mb-4 flex flex-col items-center transform transition-transform duration-500 hover:scale-[1.035] hover:shadow-lg"
                    >
                        <div className="overflow-hidden rounded-lg w-fit h-full flex flex-col items-center justify-center bg-neutral-800">
                            <div className="relative group">
                                <img 
                                    src={`/allGames/${game.gameId}.jpeg`} 
                                    alt={game.gameName} 
                                    className="w-[30rem] h-[25rem] object-cover transition-opacity duration-500 group-hover:opacity-40"
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder.jpg';
                                        e.target.alt = 'Image not available';
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <LightTooltip title="BUY NOW" arrow>
                                        <button className="bg-black bg-opacity-70 p-3 rounded-full mx-2">
                                            <BookmarkSharpIcon className="text-white" sx={{fontSize: 30}} />
                                        </button>
                                    </LightTooltip>
                                    <LightTooltip title="ADD TO CART" placement="top" arrow>
                                        <button className="bg-black bg-opacity-70 p-3 rounded-full mx-2">
                                            <ShoppingCartSharpIcon className="text-white" sx={{fontSize: 30}} />
                                        </button>
                                    </LightTooltip>
                                </div>
                            </div>
                            <div className="pt-2 bg-neutral-800 w-full h-44 mt-2 flex flex-col items-center cursor-default">
                                <h2 className="text-lg font-semibold mb-2 text-center text-slate-200">{game.gameName}</h2>
                                <div className="flex flex-wrap gap-2 mb-2 justify-center">
                                    {game.platform.map((platform, index) => (
                                        <div 
                                            key={index} 
                                            className="bg-red-700 text-sm text-slate-200 px-2 py-1 rounded-lg"
                                        >
                                            {platform}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-lg text-slate-200 text-center flex
                                items-center justify-center mt-2 cursor-pointer">
                                    <p className="mr-1">  {game.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                    <OfflineBoltIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                ) : (
                    <p className="text-center text-slate-300">No games available</p>
                )}
            </div>
        </div>
    );
}