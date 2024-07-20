import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

export const Button = ({ onClick }) => {
    return (
        <div className='flex justify-center'>
            <button onClick={onClick} className='my-16 w-20 h-20 bg-red-500 bg-opacity-70 rounded-[22px] hover:bg-opacity-50'>
                <ArrowForwardIosSharpIcon />
            </button>
        </div>
    );
}