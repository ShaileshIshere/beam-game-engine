import { useEffect, useState } from "react";
import { LightTooltip } from './Hovers';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { balanceState, searchTermState } from "../atom";
import { ConfirmModal } from "./ConfirmModal";
import axios from "axios";
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { BeamPoints } from "./BeamPoints";

export const AllGames = ({ games, view }) => {
    const [gameList, setGameList] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchTerm = useRecoilValue(searchTermState) || "";
    const setBalance = useSetRecoilState(balanceState);

    useEffect(() => {
        setGameList(games || []);
        setFilteredGames(games || []);
    }, [games]);

    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredData = gameList.filter(game =>
            game.gameName.toLowerCase().startsWith(lowercasedFilter)
        );
        setFilteredGames(filteredData);
    }, [searchTerm, gameList]);

    const handleBuyClick = (game) => {
        setSelectedGame(game);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGame(null);
    };

    const handleConfirmPurchase = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.post('http://localhost:3000/api/account/purchaseGame', {
                gameId: selectedGame.gameId
            }, config);

            if (response.data) {
                console.log(`Game purchased: ${selectedGame.gameName}`);
                setIsModalOpen(false);
                setSelectedGame(null);
                const balanceResponse = await axios.get('http://localhost:3000/api/account/balance', config);
                // Assuming setBalance comes from props or another state management
                setBalance(balanceResponse.data.balance); 
            }
        } catch (error) {
            console.error('Error purchasing game:', error);
        }
    };

    return (
        <div className="sm:px-44 px-14 py-3 static">
            <div className="flex justify-center items-center mb-4">
                <h1 className="sm:text-2xl text-md sm:font-bold font-semibold sm:mb-4 sm:text-center mr-6 text-slate-300">{("Game Dashboard").toUpperCase()}</h1>
                <div className="sm:hidden sm:flex">
                    <BeamPoints />
                </div>
            </div>
            <div className="flex flex-wrap -mx-4">
                {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                        <div 
                            key={game.gameId} 
                            className="w-1/2 sm:w-2/4 md:w-1/3 lg:w-1/5 px-2 mb-4 flex flex-col items-center transform transition-transform duration-500 hover:scale-[1.035] hover:shadow-lg"
                        >
                            <div className="overflow-hidden rounded-lg w-fit h-full flex flex-col items-center justify-center bg-neutral-800">
                                <div className="relative group">
                                    <img 
                                        src={`/allGames/${game.gameId}.jpeg`} 
                                        alt={game.gameName} 
                                        className="sm:w-[30rem] w-[20rem] sm:h-[30rem] h-[20rem] object-cover transition-opacity duration-500 group-hover:opacity-40"
                                        onError={(e) => {
                                            e.target.src = '/images/placeholder.jpg';
                                            e.target.alt = 'Image not available';
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <LightTooltip title="BUY NOW" arrow>
                                            <button
                                                onClick={() => handleBuyClick(game)}
                                                className="bg-black bg-opacity-70 p-4 rounded-full mx-1 h-14 w-14 flex items-center justify-center"
                                            >
                                                <BookmarkSharpIcon className="text-white" sx={{ fontSize: 30 }} />
                                            </button>
                                        </LightTooltip>
                                    </div>
                                </div>
                                <div className="bg-neutral-800 w-full sm:h-36 h-40 px-1 mt-2 flex flex-col items-center justify-center cursor-default">
                                    <h2 className="sm:text-lg text-md font-semibold mb-2 text-center text-slate-200">{game.gameName}</h2>
                                    <div className="flex flex-wrap gap-2 mb-2 justify-center">
                                        {game.platform.map((platform, index) => (
                                            <div 
                                                key={index} 
                                                className="bg-red-700 sm:text-sm text-xs text-slate-200 sm:px-3 sm:py-1 rounded-full px-2 py-1"
                                            >
                                                {platform}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="sm:text-lg text-md text-slate-200 text-center flex items-center justify-center mt-2 cursor-pointer">
                                        <p className="mr-1">{game.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                        <OfflineBoltIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-[21rem] w-screen flex items-center justify-center my-20">
                        <p className="text-center text-slate-300 font-bold text-2xl">
                            {view === 'purchased' ? "No games purchased till now" : "No games available"}
                        </p>
                    </div>
                )}
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmPurchase}
                selectedGame={selectedGame}
            />
        </div>
    );
}
