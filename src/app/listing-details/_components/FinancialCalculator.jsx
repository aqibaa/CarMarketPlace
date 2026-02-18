"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

function FinancialCalculator({ carDetail }) {

    const [carPrice, setcarPrice] = useState(0);
    const [interestRate, setinterestRate] = useState(0);
    const [loanTerm, setloanTerm] = useState(0);
    const [downPayment, setdownPayment] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0)
    const calculateMontlyPayment = () => {
        const Principle = carPrice - downPayment;
        const MonthlyInterestRate = interestRate / 1200
        const MonthlyPayment = (Principle * MonthlyInterestRate * Math.pow(1 + MonthlyInterestRate, loanTerm)) /
            (Math.pow(1 + MonthlyInterestRate, loanTerm) - 1)
        setMonthlyPayment(MonthlyPayment.toFixed(2));

    }

    return (
        <div className='p-10 border rounded-xl shadow-md mt-7 '>
            <h2 className='front-medium text-2xl '>
                Financial-Calculator
            </h2>
            <div className='flex max-sm:flex-col sm:flex-row gap-5 mt-5 '>
                <div className='w-full'>
                    <label>Price $</label>
                    <Input type={`number`} onChange={(e) => setcarPrice(e.target.value)} />
                </div>
                <div className='w-full'>
                    <label>Interest Rate</label>
                    <Input type='number' onChange={(e) => setinterestRate(e.target.value)} />
                </div>
            </div>
            <div className='flex max-sm:flex-col sm:flex-row gap-5 mt-5'>
                <div className='w-full'>
                    <label>Loan Term(Months)</label>
                    <Input type='number' onChange={(e) => setloanTerm(e.target.value)} />
                </div>
                <div className='w-full'>
                    <label>Down Payment</label>
                    <Input type='number' onChange={(e) => setdownPayment(e.target.value)} />
                </div>
            </div>

            {monthlyPayment > 0 && <h2 h2 className='font-medium text-2xl mt-5'>
                Your Monthly Payment is : <span className='text-4xl font-bold'>${monthlyPayment}</span>
            </h2>}
            <Button className="w-full mt-5" size="lg"
                onClick={calculateMontlyPayment}>
                Calculate
            </Button>
        </ div >
    )
}

export default FinancialCalculator
