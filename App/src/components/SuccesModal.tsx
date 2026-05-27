import type { ModalType } from "../types/types";

export default function SuccessModal({state, message, onClose}: ModalType) {
    if (state === false) return null
    console.log(`${onClose}`)

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-mauve-900 rounded-2xl border border-emerald-700 p-8 text-center">
                <svg className="w-16 h-16 fill-emerald-400 mx-auto mb-4" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"/>
                </svg>
                <h3 className="text-mauve-100 font-bold text-xl mb-2">Success!</h3>
                <p className="text-mauve-400 mb-4">{message}</p>
                {/* <button 
                    onClick={onClose}
                    className="px-8 py-2 bg-emerald-700 text-mauve-100 
                    rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                    OK
                </button> */}
            </div>
        </div>
    )
}