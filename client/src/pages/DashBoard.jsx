import React from 'react';
import axios from 'axios';
import { AppBar } from "../components/AppBar";
import { AllGames } from '../components/AllGames';
import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { balanceState } from '../atom';
import { SubAppBar } from '../components/SubAppBar';

export const DashBoard = () => {
    const [view, setView] = useState('all');
    const [games, setGames] = useState([]);
    const setBalance = useSetRecoilState(balanceState);

    const fetchBalance = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            // const response = await axios.get('http://localhost:3000/api/account/balance', config);
            const response = await axios.get('https://beam-game-engine-server.vercel.app/api/account/balance', config);
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []); // Removed balance from dependency array

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found, redirecting to login...');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                let response;
                if (view === 'purchased') {
                    // response = await axios.get('http://localhost:3000/api/games/purchased', config);
                    response = await axios.get('https://beam-game-engine-server.vercel.app/api/games/purchased', config);
                    setGames(response.data.purchasedGames || []);
                } 
                else {
                    // response = await axios.get('http://localhost:3000/api/games/all', config);
                    response = await axios.get('https://beam-game-engine-server.vercel.app/api/games/all', config);
                    setGames(response.data || []);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setGames([]); // Clear games if no data
                } else {
                    console.error('Error fetching games:', error);
                }
            }
        };
        fetchGames();
    }, [view]);

    return (
        <div className="h-max bg-neutral-900">
            <AppBar setView={setView} />
            <div className='pt-24'>
                <SubAppBar setView={setView} />
                <AllGames games={games} view={view} />
            </div>
        </div>
    );
};
