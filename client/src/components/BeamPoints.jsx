import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { LightTooltip } from './Hovers';
import { useRecoilValue } from 'recoil';
import { balanceState } from '../atom';
import { useState, useEffect } from 'react';

export const BeamPoints = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 640);
      };
  
      // Initial check
      handleResize();
  
      // Add resize event listener
      window.addEventListener('resize', handleResize);
  
      // Cleanup listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const balance = useRecoilValue(balanceState);

    const formatBalance = (points) => {
        return points.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="sm:mx-5 text-slate-200 flex items-center border-l-2 border-slate-300 pl-6">
            <LightTooltip title="BEAM POINTS" arrow>
                <div className="cursor-pointer font-bold text-xl flex justify-center items-center">
                    <OfflineBoltIcon sx={{ fontSize: isSmallScreen ? 20 : 30 }} />
                </div>
            </LightTooltip>
            <div className="cursor-default font-semibold sm:ml-2 ml-1 sm:text-lg text-md">
                { formatBalance(balance) }
            </div>
        </div>
    );
}