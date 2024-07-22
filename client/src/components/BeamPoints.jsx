import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { LightTooltip } from './Hovers';

export const BeamPoints = ({ balance }) => {
    const formatBalance = (balance) => {
        return balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="mx-5 text-slate-200 flex items-center border-l-2 border-slate-300 pl-8">
            <LightTooltip title="BEAM POINTS" arrow>
                <div className="cursor-pointer font-bold text-xl">
                    <OfflineBoltIcon sx={{ fontSize: 35 }}/>
                </div>
            </LightTooltip>
            <div className="cursor-default font-semibold ml-2 text-lg">
                { formatBalance(balance) }
            </div>
        </div>
    );
}