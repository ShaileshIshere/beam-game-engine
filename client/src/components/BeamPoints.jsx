import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { LightTooltip } from './Hovers';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const BeamPoints = () => {
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const handlePoints = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:3000/api/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPoints(response.data.balance)
            } catch (error) {
                console.log("error fetching balance: ", error);
            }
        }
        handlePoints();
    }, [points])

    const formatBalance = (points) => {
        return points.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="mx-5 text-slate-200 flex items-center border-l-2 border-slate-300 pl-8">
            <LightTooltip title="BEAM POINTS" arrow>
                <div className="cursor-pointer font-bold text-xl">
                    <OfflineBoltIcon sx={{ fontSize: 35 }}/>
                </div>
            </LightTooltip>
            <div className="cursor-default font-semibold ml-2 text-lg">
                { formatBalance(points) }
            </div>
        </div>
    );
}