import React from "react";
import { ModalProps, ModalState, TransactionFormData } from "./typeAnnotation";
import { SubmitHandler } from "react-hook-form";
import TransactionForm from "./TransactionForm";

class ModalOpen extends React.Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);

        this.state = {
            show: false,
        };
    }

    toggleModal = () => {
        this.setState((prevState) => ({
            show: !prevState.show,
        }));
    };

    modalClose = () => {
        this.setState({ show: false });
    };

    handleSubmit: SubmitHandler<TransactionFormData> = (data) => {
        this.props.formSubmit(data);
        this.toggleModal();
    };

    render() {
        const { className, text, icon, type } = this.props;
        const { show } = this.state;

        return (
            <>
                <div className={className} onClick={this.toggleModal}>
                    {icon}
                    <span className="hidden sm:inline-block ml-2">{text}</span>
                </div>
                {show && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50 rounded-lg">
                        <div className="bg-white p-5 rounded-xl w-full sm:w-[500px] relative">
                            <div onClick={this.modalClose} className="absolute cursor-pointer top-0 right-0 translate-x-3 -translate-y-3 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:rotate-180 duration-500">
                                <span className="absolute w-7 h-1 bg-black rotate-45 rounded-md"></span>
                                <span className="absolute w-7 h-1 bg-black -rotate-45 rounded-md"></span>
                            </div>
                            <h2 className="text-2xl font-semibold text-center">Tambahkan {text}</h2>
                            <TransactionForm onSubmit={this.handleSubmit} type={type} />
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default ModalOpen;
