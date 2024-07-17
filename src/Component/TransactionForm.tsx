import { useForm } from "react-hook-form";
import { schemaForm, TransactionFormData, TransactionFormProps } from "./typeAnnotation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDate } from "./utils";

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, type }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TransactionFormData>({
        resolver: zodResolver(schemaForm),
    });

    const { currentDate, lastYearDate, nextYearDate } = getDate();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="mb-4">
                <label htmlFor="name" className="block font-medium text-gray-700">
                    Nama
                </label>
                <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="amount" className="block font-medium text-gray-700">
                    Jumlah Uang
                </label>
                <input
                    {...register("amount")}
                    type="number"
                    id="amount"
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.amount ? "border-red-500" : ""}`}
                />
                {errors.amount && <p className="mt-1 text-red-500 text-sm">{errors.amount.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="date" className="block font-medium text-gray-700">
                    Tanggal
                </label>
                <input
                    {...register("date")}
                    type="date"
                    id="date"
                    defaultValue={currentDate}
                    min={lastYearDate}
                    max={nextYearDate}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.date ? "border-red-500" : ""}`}
                />
                {errors.date && <p className="mt-1 text-red-500 text-sm">{errors.date.message}</p>}
            </div>
            <input type="hidden" {...register("type")} value={type} />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-primary hover:bg-[#1d4195] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    Simpan
                </button>
            </div>
        </form>
    );
};

export default TransactionForm;
