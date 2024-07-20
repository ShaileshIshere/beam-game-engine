import { Link } from "react-router-dom"

export const BottomWarning = ({ linkText, to }) => {
    return (
        <div className="flex justify-center">
            <Link className="text-md text-center text-stone-700 hover:text-stone-500" to={to}>
                { linkText.toUpperCase() }
            </Link>    
        </div>
    );
}