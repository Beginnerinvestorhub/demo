import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { MechanicaLayout } from '@/components/layout/mechanicaLayout';
import { MechanicaCard } from '@/components/ui/mechanicaCard';
import { MechanicaButton } from '@/components/ui/mechanicaButton';
import { MechanicaGear } from '@/components/ui/mechanicaGear';

export default function CompoundCalculator() {
    const [initialAmount, setInitialAmount] = useState<number>(1000);
    const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
    const [years, setYears] = useState<number>(10);
    const [rate, setRate] = useState<number>(7);

    const calculation = useMemo(() => {
        const r = rate / 100 / 12;
        const n = years * 12;
        const totalWithContributions = initialAmount * Math.pow(1 + r, n) +
            monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);

        const totalInvested = initialAmount + (monthlyContribution * n);
        const totalInterest = totalWithContributions - totalInvested;

        return {
            total: totalWithContributions,
            invested: totalInvested,
            interest: totalInterest
        };
    }, [initialAmount, monthlyContribution, years, rate]);

    return (
        <MechanicaLayout>
            <Head>
                <title>Compound Interest Visualizer | Beginner Investor Hub</title>
                <meta name="description" content="Visualize the long-term power of compounding with our technical investment engine." />
            </Head>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center space-x-6 mb-12">
                        <MechanicaGear size="large" color="copper" speed="slow" />
                        <div>
                            <h1 className="text-4xl font-black mechanica-heading-professional text-mechanica-moonlight-blue uppercase tracking-tighter">
                                Compound Interest Engine
                            </h1>
                            <p className="text-sm text-gray-500 mechanica-text-technical uppercase tracking-widest mt-1">
                                [ Module: Growth Projection v1.0 ]
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Inputs */}
                        <MechanicaCard variant="mechanical" className="lg:col-span-1 p-6">
                            <h2 className="text-xs font-black uppercase tracking-widest text-mechanica-moonlight-blue mb-6 border-b border-gray-100 pb-2">
                                Input Parameters
                            </h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Initial Capital</label>
                                    <input
                                        type="number"
                                        value={initialAmount}
                                        onChange={(e) => setInitialAmount(Number(e.target.value))}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 font-mono text-mechanica-moonlight-blue outline-none focus:border-mechanica-moonlight-blue/30 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Monthly Fuel</label>
                                    <input
                                        type="number"
                                        value={monthlyContribution}
                                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 font-mono text-mechanica-moonlight-blue outline-none focus:border-mechanica-moonlight-blue/30 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Time Horizon (Years)</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                        className="w-full accent-mechanica-moonlight-blue"
                                    />
                                    <div className="text-right font-mono text-sm text-mechanica-moonlight-blue">{years} Cycles</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Efficiency Rate (%)</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="15"
                                        step="0.5"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        className="w-full accent-mechanica-moonlight-blue"
                                    />
                                    <div className="text-right font-mono text-sm text-mechanica-moonlight-blue">{rate}% Efficiency</div>
                                </div>
                            </div>
                        </MechanicaCard>

                        {/* Results */}
                        <div className="lg:col-span-2 space-y-8">
                            <MechanicaCard variant="wood" className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Projected Output</h3>
                                            <div className="text-5xl font-black text-mechanica-moonlight-blue font-mono tracking-tighter">
                                                ${calculation.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div>
                                                <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400">Total Invested</h4>
                                                <div className="text-xl font-bold font-mono text-gray-600">${calculation.invested.toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400">Yield Gained</h4>
                                                <div className="text-xl font-bold font-mono text-green-600">${calculation.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <MechanicaGear size="xl" color="copper" speed="medium" />
                                    </div>
                                </div>
                            </MechanicaCard>

                            <MechanicaCard variant="mechanical" className="p-6 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <MechanicaGear size="medium" color="brass" speed="fast" />
                                </div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-mechanica-moonlight-blue mb-4">
                                    Growth Trajectory Analytics
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed max-w-lg mb-6">
                                    Compound interest is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest.
                                </p>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 italic text-xs text-gray-500 mechanica-text-technical uppercase tracking-widest">
                  // Statistical Variance: Nominal returns are subject to market volatility.
                                </div>
                            </MechanicaCard>

                            <div className="flex justify-end">
                                <MechanicaButton variant="mechanical" size="md">
                                    Export Projection Data
                                </MechanicaButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MechanicaLayout>
    );
}
