import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler,
    BubbleController,
    RadialLinearScale,
    Title,
} from 'chart.js';

/**
 * Centralized initialization for Chart.js in the Mechanica pattern.
 * Run this once at the application level or in a hook.
 */
export const registerMechanicaCharts = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        ArcElement,
        BubbleController,
        RadialLinearScale,
        Tooltip,
        Legend,
        Filler,
        Title
    );

    // Set Global Defaults
    ChartJS.defaults.font.family = "'Source Code Pro', 'Fira Code', monospace";
    ChartJS.defaults.color = '#94a3b8'; // gray-400
    ChartJS.defaults.plugins.tooltip.backgroundColor = '#1e293b'; // slate-800
    ChartJS.defaults.plugins.tooltip.titleFont = { size: 13, weight: 'bold', family: 'serif' };
    ChartJS.defaults.plugins.tooltip.padding = 16;
    ChartJS.defaults.plugins.tooltip.cornerRadius = 12;
};

/**
 * Common Mechanica Theme Options
 */
export const getMechanicaTheme = (overrides = {}) => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                labels: {
                    font: {
                        family: "'Inter', sans-serif",
                        weight: 'bold' as const,
                        size: 11
                    },
                    padding: 20
                }
            },
            tooltip: {
                enabled: true,
                displayColors: true,
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)', // gray-400 with opacity
                    drawBorder: false
                },
                ticks: {
                    font: {
                        family: "'Source Code Pro', monospace",
                        weight: 'bold' as const,
                        size: 10
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    font: {
                        family: "'Source Code Pro', monospace",
                        weight: 'bold' as const,
                        size: 10
                    }
                }
            }
        },
        ...overrides
    };
};

/**
 * Color Utilities for Charts
 */
export const MECHANICA_COLORS = {
    primary: '#4F738E', // moonlight-blue
    accent: '#B8860B',  // brass
    danger: '#f43f5e',  // rose-500
    success: '#10b981', // emerald-500
    neutral: '#6366f1', // indigo-500
    grid: 'rgba(148, 163, 184, 0.1)',
};
