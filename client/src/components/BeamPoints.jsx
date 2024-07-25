import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { LightTooltip } from './Hovers';
import { useRecoilValue } from 'recoil';
import { balanceState } from '../atom';

export const BeamPoints = () => {
    const balance = useRecoilValue(balanceState);

    const formatBalance = (points) => {
        return points.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="mx-5 text-slate-200 flex items-center border-l-2 border-slate-300 pl-6">
            <LightTooltip title="BEAM POINTS" arrow>
                <div className="cursor-pointer font-bold text-xl">
                    <OfflineBoltIcon sx={{ fontSize: 30 }}/>
                </div>
            </LightTooltip>
            <div className="cursor-default font-semibold ml-2 text-lg">
                { formatBalance(balance) }
            </div>
        </div>
    );
}