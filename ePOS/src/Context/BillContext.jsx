import { createContext, useContext, useState } from "react";

const BillSummary = createContext({});

export const UseBillSummary = () => useContext(BillSummary);

export const BillSummaryProvider = ({ children }) => {
    const [discValue, setDiscValue] = useState(0);
    const [amount, setAmount] = useState(0);
    const [totalPcs, setTotalPcs] = useState(0);

    return (
        <BillSummary.Provider
            value={{
                discValue,
                setDiscValue,
                amount,
                setAmount,
                totalPcs,
                setTotalPcs,
            }}
        >
            {children}
        </BillSummary.Provider>
    );
};
