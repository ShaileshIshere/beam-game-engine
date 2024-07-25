export const ConfirmModal = ({ isOpen, onClose, onConfirm, selectedGame }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-neutral-900 rounded-lg shadow-lg p-6 w-1/4 text-slate-200 text-center rounded-[20px]">
                <h2 className="text-xl font-bold mb-4">{("Confirm Purchase").toUpperCase()}</h2>
                <p> Do you really want to purchase </p>
                <p className="mb-5"> <strong>{selectedGame.gameName}</strong> </p>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-red-700 px-4 py-2 rounded-full mr-2"
                    >
                        exit
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-700 text-white px-4 py-2 rounded-full"
                    >
                        confirm
                    </button>
                </div>
            </div>
        </div>
    );
};