import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function errorHandler(err: any) {

    if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<unknown>;
        console.log(axiosError);
        if (axiosError.response?.status == 404) {
            toast.error('invalid API call or we having trouble processing your request', { style: { color: "red" }, position: 'top-center' })
        }
        else {
            const errorMessage = axiosError.response?.data || axiosError.message ||  "Something went wrong! Please try again or try reloading the page";
            toast.error(errorMessage as string, { style: { color: "red" }, position: 'top-center' })
        }
    } else {
        // toast.error("An unexpected error occurred Please try again or try reloading the page", { style: { color: "red" }, position: 'top-center' });
    }

}