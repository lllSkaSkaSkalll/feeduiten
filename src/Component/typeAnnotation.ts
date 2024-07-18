import { z } from "zod";
import { getDate } from "./utils";
import { SubmitHandler } from "react-hook-form";

const { nextYearDate, lastYearDate } = getDate();

export const schemaForm = z.object({
    name: z.string().trim().min(1, "Kategori harus diisi"),
    amount: z.preprocess((val) => Number(val), z.number().min(1, "Jumlah uang harus diisi")),
    date: z
        .string()
        .trim()
        .min(1, "Tgl. harus diisi")
        .refine(
            (dateStr) => {
                const date = new Date(dateStr);
                const today = new Date(lastYearDate);
                const nextYear = new Date(nextYearDate);
                return date >= today && date <= nextYear;
            },
            {
                message: `Tanggal harus antara ${lastYearDate} dan ${nextYearDate}`,
            }
        ),
    type: z.enum(["IN", "OUT"]),
});

export type TransactionFormData = z.infer<typeof schemaForm>;

export interface AppState {
    balance: number;
    percentage: number;
    income: number;
    expense: number;
    transactionIn: number;
    transactionOut: number;
    summary: {
        id: number;
        name: string;
        date: string;
        amount: number;
        type: "IN" | "OUT";
    }[];
}

export interface ModalProps {
    className: string;
    text: string;
    icon: React.ReactNode;
    type: "IN" | "OUT";
    formSubmit: (data: TransactionFormData) => void;
}

export interface ModalState {
    show: boolean;
}

export interface TransactionFormProps {
    onSubmit: SubmitHandler<TransactionFormData>;
    type: "IN" | "OUT";
}
