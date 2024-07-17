import React from "react";
import wallet from "./assets/wallet.png";
import expense from "./assets/expense.png";
import bag from "./assets/bag.png";
import { MinusCircle, PlusCircle } from "@phosphor-icons/react";
import { AppState, TransactionFormData } from "./Component/typeAnnotation";
import { calculatePercentage, formatCurrency } from "./Component/utils";
import ModalOpen from "./Component/Modal";

class App extends React.Component<Record<string, never>, AppState> {
    constructor(props: Record<string, never>) {
        super(props);

        this.state = this.loadStateFromLocalStorage() || {
            balance: 0,
            percentage: 0,
            income: 0,
            expense: 0,
            transactionIn: 0,
            transactionOut: 0,
            summary: [],
        };
    }

    componentDidUpdate() {
        this.saveStateToLocalStorage();
    }

    saveStateToLocalStorage = () => {
        localStorage.setItem("appState", JSON.stringify(this.state));
    };

    loadStateFromLocalStorage = (): AppState | null => {
        const savedState = localStorage.getItem("appState");
        return savedState ? JSON.parse(savedState) : null;
    };

    handleFormData = (data: TransactionFormData) => {
        this.setState((prevState) => {
            const newBalance = data.type === "IN" ? prevState.balance + data.amount : prevState.balance - data.amount;
            const newIncome = data.type === "IN" ? prevState.income + data.amount : prevState.income;
            const newExpense = data.type === "OUT" ? prevState.expense + data.amount : prevState.expense;
            const newPercentage = calculatePercentage(newIncome, newBalance);

            return {
                balance: newBalance,
                percentage: newPercentage,
                income: newIncome,
                expense: newExpense,
                transactionIn: data.type === "IN" ? prevState.transactionIn + 1 : prevState.transactionIn,
                transactionOut: data.type === "OUT" ? prevState.transactionOut + 1 : prevState.transactionOut,
                summary: [...prevState.summary, data],
            };
        });
    };

    render() {
        return (
            <div className="bg-image relative">
                <div className="container mx-auto font-poppins grid place-content-center min-h-svh p-5 pb-0">
                    <div className="max-w-[800px] lg:w-[800px] rounded-xl p-5 flex flex-col items-center bg-white/50 border-[3px] border-white backdrop-blur-[1px]">
                        <h1 className="text-center text-6xl pb-5 border-b-2 border-slate-700 w-full font-bold bg-clip-text text-transparent bg-gradient-to-tr to-[#3C3DBF] from-[#2998FF]">FEEDUITEN APPS</h1>
                        <div className="w-full max-h-[600px] overflow-y-auto scroll-custom">
                            <p className="mt-5 text-4xl font-semibold text-primary text-center">{formatCurrency(this.state.balance)}</p>
                            <p className=" text-center">Uang kamu tersisa {this.state.percentage}% lagi</p>

                            <div className="grid grid-cols-1 min-[615px]:grid-cols-2 w-full gap-5 mt-10">
                                <div className="rounded-lg p-3 shadow-[2px_2px_15px_0_rgba(0,0,0,0.30)] bg-white/50">
                                    <div className="w-9 h-9 flex items-center justify-center bg-blue-400 border border-black rounded-md">
                                        <img src={wallet} alt="" />
                                    </div>
                                    <p className="font-semibold text-slate-700 mt-1">Pemasukan</p>
                                    <p className="text-3xl font-semibold  mt-4 text-primary">{formatCurrency(this.state.income)}</p>
                                    <p className="font-semibold text-slate-700 mt-1">
                                        <span className="text-primary font-bold">{this.state.transactionIn}</span> Transaksi
                                    </p>
                                </div>
                                <div className="rounded-lg p-3 shadow-[2px_2px_15px_0_rgba(0,0,0,0.30)] bg-white/50">
                                    <div className="w-9 h-9 flex items-center justify-center bg-secondary border border-black rounded-md">
                                        <img src={expense} alt="" />
                                    </div>
                                    <p className="font-semibold text-slate-500 mt-1">Pengeluaran</p>
                                    <p className="text-3xl font-semibold mt-4 text-secondary">{formatCurrency(this.state.expense)}</p>
                                    <p className="font-semibold text-slate-500 mt-1">
                                        <span className="text-secondary font-bold">{this.state.transactionOut}</span> Transaksi
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-5 items-center justify-between w-full mt-10 border-b-2 border-white/90 pb-2">
                                <p className="text-2xl font-semibold text-primary">Ringkasan Transaksi</p>
                                <div className="flex items-center gap-1">
                                    <ModalOpen
                                        className="flex items-center gap-1 bg-primary cursor-pointer py-2 px-4 rounded-xl text-white group hover:scale-105 duration-300"
                                        text="Pemasukan"
                                        icon={<PlusCircle size={28} className="text-white group-hover:rotate-180 duration-300" />}
                                        type="IN"
                                        formSubmit={this.handleFormData}
                                    />

                                    <ModalOpen
                                        className="flex items-center gap-1 bg-secondary cursor-pointer py-2 px-4 rounded-xl text-white group hover:scale-105 duration-300"
                                        text="Pengeluaran"
                                        icon={<MinusCircle size={28} className="text-white group-hover:rotate-180 duration-300" />}
                                        type="OUT"
                                        formSubmit={this.handleFormData}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-4 w-full">
                                {this.state.summary.map((summary, i) => (
                                    <div key={i} className="w-full p-2 bg-white/20 shadow-[2px_2px_15px_0_rgba(0,0,0,0.30)] rounded-lg flex items-center justify-between gap-5">
                                        <div className="flex items-center gap-5">
                                            <div className={`w-14 h-14 rounded-lg flex items-center justify-center border border-black ${summary.type === "IN" ? "bg-primary/80" : "bg-red-400"}`}>
                                                <img src={summary.type === "IN" ? wallet : bag} alt="" className="w-8 h-8 object-cover" />
                                            </div>
                                            <div className="flex flex-col justify-between h-14 py-[2px]">
                                                <p className="text-xl font-semibold line-clamp-1">{summary.name}</p>
                                                <p className="leading-3">{summary.date}</p>
                                            </div>
                                        </div>
                                        <p className={`text-2xl font-semibold text-nowrap ${summary.type === "IN" ? "text-primary" : "text-secondary"}`}>{formatCurrency(summary.amount)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
