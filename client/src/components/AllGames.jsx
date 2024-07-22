import { useEffect, useState } from "react";
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import games from "../api/allGames";

export const AllGames = () => {
    const [gameList, setGameList] = useState([]);
    useEffect(() => {
        setGameList(games)
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Game Dashboard</h1>
            <div className="flex flex-wrap -mx-2">
                {gameList.map((game) => (
                    <div 
                        key={game.id} 
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2 mb-4 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        <div className="overflow-hidden rounded-lg w-fit h-full flex flex-col items-center justify-center bg-neutral-800">
                            <img 
                                src={`/allGames/${game.id}.jpeg`} 
                                alt={game.name} 
                                className="w-[30rem] h-[36rem] object-cover"
                                onError={(e) => {
                                    e.target.src = '/images/placeholder.jpg';
                                    e.target.alt = 'Image not available';
                                }}
                            />
                            <div className="p-4 bg-neutral-800 w-full h-44 mt-2 flex flex-col items-center">
                                <h2 className="text-lg font-semibold mb-2 text-center text-slate-200">{game.name}</h2>
                                <div className="flex flex-wrap gap-2 mb-2 justify-center">
                                    {game.platform.map((platform, index) => (
                                        <div 
                                            key={index} 
                                            className="bg-red-700 text-slate-200 px-2 py-1 rounded-lg"
                                        >
                                            {platform}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-200 text-center"> <OfflineBoltIcon /> {game.priceINR}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}