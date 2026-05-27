import { useForm } from "react-hook-form";
import z, { string } from "zod";
import { sendEmail } from "../api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import SuccessModal from "./SuccesModal";
import { useState } from "react";

const subscribeSchema = z.object({
    email: string().email().optional()
})

type SubscribeMailType = z.infer<typeof subscribeSchema>

export default function Subscribe() {
    const [modalState, setModalState] = useState<boolean>(false);
    const { handleSubmit ,register, formState: { isSubmitting } } = useForm<SubscribeMailType>({
        resolver: zodResolver(subscribeSchema)
    });

    const onSubmit = async (data: object) => {
        try {
            await sendEmail(data)
            setModalState(true)
        } catch (error) {
            console.log(error)
        } 
    }

    const handleCloseModal = () => {
        setModalState(true)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2">
                    <input 
                        { ...register('email') }
                        placeholder="Your email" 
                        className="flex-1 px-3 py-2 bg-mauve-800 border border-mauve-700 rounded-lg 
                                text-mauve-200 text-sm placeholder-mauve-500
                                focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                    />
                    <button type='submit' disabled={isSubmitting} className="py-2 px-4 bg-linear-to-r from-emerald-800 to-green-700 
                                    text-mauve-200 text-sm font-semibold rounded-lg cursor-pointer 
                                    transition-all duration-300 hover:from-green-700 hover:to-emerald-800">
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </div>
            </form>
            {<SuccessModal state={modalState} message={'Mail sending is succesful!'} onClose={handleCloseModal} />}
        </>
    )
}