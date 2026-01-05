module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/acousticsCalculations.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Room Acoustics Calculations
// Based on established acoustic physics formulas
__turbopack_context__.s([
    "absorptionCoefficients",
    ()=>absorptionCoefficients,
    "calculateOptimalPositions",
    ()=>calculateOptimalPositions,
    "calculateRoomMetrics",
    ()=>calculateRoomMetrics,
    "calculateRoomModes",
    ()=>calculateRoomModes,
    "calculateRoomRatios",
    ()=>calculateRoomRatios,
    "calculateTotalAbsorption",
    ()=>calculateTotalAbsorption,
    "determineRoomCharacter",
    ()=>determineRoomCharacter,
    "estimateFrequencyResponse",
    ()=>estimateFrequencyResponse,
    "estimateRT60",
    ()=>estimateRT60,
    "estimateRT60ByBand",
    ()=>estimateRT60ByBand,
    "evaluateRT60",
    ()=>evaluateRT60,
    "getProblematicModes",
    ()=>getProblematicModes
]);
// Speed of sound in air at 20°C (m/s)
const SPEED_OF_SOUND = 343;
function calculateRoomModes(length, width, height) {
    const modes = [];
    // Calculate first 5 modes for each dimension (axial modes)
    for(let n = 1; n <= 5; n++){
        // Length modes
        const lengthFreq = n * SPEED_OF_SOUND / (2 * length);
        modes.push({
            frequency: Math.round(lengthFreq * 10) / 10,
            type: 'axial',
            dimension: 'length',
            severity: n === 1 ? 'high' : n <= 3 ? 'medium' : 'low',
            description: `${n}° modo longitudinal (${length}m)`
        });
        // Width modes
        const widthFreq = n * SPEED_OF_SOUND / (2 * width);
        modes.push({
            frequency: Math.round(widthFreq * 10) / 10,
            type: 'axial',
            dimension: 'width',
            severity: n === 1 ? 'high' : n <= 3 ? 'medium' : 'low',
            description: `${n}° modo transversal (${width}m)`
        });
        // Height modes
        const heightFreq = n * SPEED_OF_SOUND / (2 * height);
        modes.push({
            frequency: Math.round(heightFreq * 10) / 10,
            type: 'axial',
            dimension: 'height',
            severity: n === 1 ? 'high' : n <= 3 ? 'medium' : 'low',
            description: `${n}° modo vertical (${height}m)`
        });
    }
    // Sort by frequency and remove duplicates within 5Hz
    return modes.sort((a, b)=>a.frequency - b.frequency).filter((mode, index, arr)=>{
        if (index === 0) return true;
        return Math.abs(mode.frequency - arr[index - 1].frequency) > 5;
    });
}
function getProblematicModes(modes) {
    return modes.filter((mode)=>mode.frequency < 300 && mode.severity === 'high');
}
function estimateRT60(volume, totalAbsorption) {
    if (totalAbsorption === 0) return 10 // Very reflective room
    ;
    const rt60 = 0.161 * volume / totalAbsorption;
    return Math.round(rt60 * 100) / 100;
}
function estimateRT60ByBand(volume, absorption) {
    return {
        low: estimateRT60(volume, absorption.low),
        mid: estimateRT60(volume, absorption.mid),
        high: estimateRT60(volume, absorption.high)
    };
}
function evaluateRT60(rt60, purpose) {
    const idealRanges = {
        music: {
            min: 0.3,
            max: 0.5
        },
        instrument: {
            min: 0.4,
            max: 0.7
        },
        work: {
            min: 0.2,
            max: 0.4
        }
    };
    const range = idealRanges[purpose];
    if (rt60 >= range.min && rt60 <= range.max) {
        return {
            rating: 'good',
            message: `RT60 ideal para ${purpose === 'music' ? 'escuchar música' : purpose === 'instrument' ? 'tocar instrumento' : 'trabajar'}`
        };
    } else if (rt60 < range.min) {
        return {
            rating: 'problematic',
            message: 'Sala demasiado seca, falta reverberación natural'
        };
    } else if (rt60 < range.max * 1.5) {
        return {
            rating: 'acceptable',
            message: 'RT60 ligeramente alto, considerar agregar absorción'
        };
    } else {
        return {
            rating: 'problematic',
            message: 'Sala demasiado viva, exceso de reverberación'
        };
    }
}
const absorptionCoefficients = {
    floor: {
        // Duros (más reflexivos)
        ceramico: {
            low: 0.01,
            mid: 0.01,
            high: 0.02
        },
        madera: {
            low: 0.15,
            mid: 0.10,
            high: 0.10
        },
        vinilico: {
            low: 0.03,
            mid: 0.03,
            high: 0.04
        },
        concreto: {
            low: 0.01,
            mid: 0.01,
            high: 0.02
        },
        marmol: {
            low: 0.01,
            mid: 0.01,
            high: 0.01
        },
        // Blandos (más absorbentes)
        alfombra: {
            low: 0.10,
            mid: 0.40,
            high: 0.60
        },
        goma: {
            low: 0.05,
            mid: 0.15,
            high: 0.30
        },
        // Otros
        otro: {
            low: 0.05,
            mid: 0.05,
            high: 0.05
        }
    },
    wall: {
        // Duras (más reflexivas)
        desnudas: {
            low: 0.02,
            mid: 0.02,
            high: 0.03
        },
        vidrio: {
            low: 0.03,
            mid: 0.02,
            high: 0.02
        },
        ladrillo: {
            low: 0.03,
            mid: 0.03,
            high: 0.04
        },
        // Con elementos
        cuadros: {
            low: 0.05,
            mid: 0.10,
            high: 0.15
        },
        bibliotecas: {
            low: 0.10,
            mid: 0.25,
            high: 0.40
        },
        cortinas: {
            low: 0.05,
            mid: 0.25,
            high: 0.45
        },
        paneles_madera: {
            low: 0.15,
            mid: 0.20,
            high: 0.15
        },
        // Mixto
        mixto: {
            low: 0.06,
            mid: 0.15,
            high: 0.20
        }
    },
    furniture: {
        // Asientos
        sofa: {
            low: 0.25,
            mid: 0.35,
            high: 0.40
        },
        silla: {
            low: 0.05,
            mid: 0.15,
            high: 0.20
        },
        puff: {
            low: 0.20,
            mid: 0.30,
            high: 0.35
        },
        // Almacenamiento
        estanteria: {
            low: 0.10,
            mid: 0.20,
            high: 0.30
        },
        armario: {
            low: 0.08,
            mid: 0.12,
            high: 0.15
        },
        cajonera: {
            low: 0.06,
            mid: 0.10,
            high: 0.12
        },
        // Trabajo/Estudio
        escritorio: {
            low: 0.05,
            mid: 0.10,
            high: 0.10
        },
        mesa: {
            low: 0.03,
            mid: 0.08,
            high: 0.10
        },
        rack: {
            low: 0.05,
            mid: 0.12,
            high: 0.18
        },
        // Otros
        cama: {
            low: 0.30,
            mid: 0.40,
            high: 0.45
        },
        plantas: {
            low: 0.05,
            mid: 0.10,
            high: 0.15
        },
        instrumentos: {
            low: 0.10,
            mid: 0.15,
            high: 0.20
        },
        alfombra: {
            low: 0.15,
            mid: 0.40,
            high: 0.60
        }
    }
};
function calculateTotalAbsorption(project) {
    const { lengthM = 0, widthM = 0, heightM = 0, floorType, wallType, furniture = [] } = project;
    // Calculate surface areas
    const floorArea = lengthM * widthM;
    const wallArea = 2 * (lengthM * heightM + widthM * heightM);
    const ceilingArea = floorArea;
    // Get absorption coefficients
    const floorCoeff = absorptionCoefficients.floor[floorType || 'otro'];
    const wallCoeff = absorptionCoefficients.wall[wallType || 'desnudas'];
    const ceilingCoeff = {
        low: 0.02,
        mid: 0.02,
        high: 0.03
    } // Assume hard ceiling
    ;
    // Calculate base absorption from surfaces
    let absorption = {
        low: floorArea * floorCoeff.low + wallArea * wallCoeff.low + ceilingArea * ceilingCoeff.low,
        mid: floorArea * floorCoeff.mid + wallArea * wallCoeff.mid + ceilingArea * ceilingCoeff.mid,
        high: floorArea * floorCoeff.high + wallArea * wallCoeff.high + ceilingArea * ceilingCoeff.high
    };
    // Add furniture contribution (assume ~1m² effective area per item)
    furniture.forEach((item)=>{
        const furnitureKey = item;
        const furnitureCoeff = absorptionCoefficients.furniture[furnitureKey];
        if (furnitureCoeff) {
            absorption.low += furnitureCoeff.low;
            absorption.mid += furnitureCoeff.mid;
            absorption.high += furnitureCoeff.high;
        }
    });
    const average = (absorption.low + absorption.mid + absorption.high) / 3;
    return {
        ...absorption,
        average: Math.round(average * 100) / 100
    };
}
function calculateRoomRatios(length, width, height) {
    const lengthWidth = Math.round(length / width * 100) / 100;
    const lengthHeight = Math.round(length / height * 100) / 100;
    const widthHeight = Math.round(width / height * 100) / 100;
    // Ideal room ratios (Bolt's criteria and others)
    // Avoid 1:1:1 (cube), 1:2:3, 1:2:4, and other simple integer ratios
    const isGoodRatio = (ratio)=>{
        // Avoid ratios very close to integers
        const nearestInt = Math.round(ratio);
        const distanceFromInt = Math.abs(ratio - nearestInt);
        return distanceFromInt > 0.15;
    };
    const goodRatios = [
        isGoodRatio(lengthWidth),
        isGoodRatio(lengthHeight),
        isGoodRatio(widthHeight)
    ];
    const goodCount = goodRatios.filter(Boolean).length;
    let rating;
    let message;
    if (goodCount === 3) {
        rating = 'good';
        message = 'Proporciones favorables, bajo riesgo de modos coincidentes';
    } else if (goodCount >= 2) {
        rating = 'acceptable';
        message = 'Proporciones aceptables, algunos modos pueden coincidir';
    } else {
        rating = 'poor';
        message = 'Proporciones problemáticas, probable acumulación modal';
    }
    return {
        lengthWidth,
        lengthHeight,
        widthHeight,
        rating,
        message
    };
}
function estimateFrequencyResponse(roomModes, roomCharacter, volume) {
    const response = [];
    // Generate response curve from 20Hz to 20kHz (logarithmic spacing)
    const frequencies = [
        20,
        25,
        31.5,
        40,
        50,
        63,
        80,
        100,
        125,
        160,
        200,
        250,
        315,
        400,
        500,
        630,
        800,
        1000,
        1250,
        1600,
        2000,
        2500,
        3150,
        4000,
        5000,
        6300,
        8000,
        10000,
        12500,
        16000,
        20000
    ];
    // Base response depends on room character
    const baseResponse = {
        viva: 0,
        equilibrada: -2,
        seca: -4
    }[roomCharacter];
    frequencies.forEach((freq)=>{
        let responseDb = baseResponse;
        // Low frequency: affected by room modes
        if (freq < 300) {
            // Find nearby room modes
            const nearbyModes = roomModes.filter((mode)=>Math.abs(mode.frequency - freq) < 10);
            if (nearbyModes.length > 0) {
                // Boost at room mode frequencies
                const maxSeverity = nearbyModes.some((m)=>m.severity === 'high') ? 12 : nearbyModes.some((m)=>m.severity === 'medium') ? 6 : 3;
                responseDb += maxSeverity;
            }
            // Small rooms have less bass extension
            if (volume < 30) {
                const bassRolloff = (300 - freq) / 300 * -6;
                responseDb += bassRolloff;
            }
        }
        // Mid frequency: relatively flat, affected by room character
        if (freq >= 300 && freq < 4000) {
            if (roomCharacter === 'viva') {
                responseDb += Math.random() * 4 - 2; // ±2dB variance
            } else if (roomCharacter === 'seca') {
                responseDb -= 2;
            }
        }
        // High frequency: affected by absorption
        if (freq >= 4000) {
            if (roomCharacter === 'seca') {
                responseDb -= (freq - 4000) / 16000 * 8; // Roll off highs
            } else if (roomCharacter === 'viva') {
                responseDb += 2; // Bright
            }
        }
        // Mark as issue if response deviates more than ±6dB from target
        const isIssue = Math.abs(responseDb) > 6;
        response.push({
            frequency: freq,
            response: Math.round(responseDb * 10) / 10,
            issue: isIssue,
            description: isIssue ? responseDb > 6 ? `Pico de +${responseDb.toFixed(1)}dB` : `Valle de ${responseDb.toFixed(1)}dB` : undefined
        });
    });
    return response;
}
function determineRoomCharacter(rt60Mid, totalAbsorption, surfaceArea) {
    const avgAbsorptionCoeff = totalAbsorption / surfaceArea;
    // Viva: Long RT60, low absorption
    if (rt60Mid > 0.6 || avgAbsorptionCoeff < 0.15) {
        return 'viva';
    }
    // Seca: Short RT60, high absorption
    if (rt60Mid < 0.3 || avgAbsorptionCoeff > 0.35) {
        return 'seca';
    }
    // Equilibrada: Moderate RT60 and absorption
    return 'equilibrada';
}
function calculateRoomMetrics(length, width, height) {
    const volume = Math.round(length * width * height * 100) / 100;
    const floorArea = Math.round(length * width * 100) / 100;
    const wallArea = Math.round(2 * (length * height + width * height) * 100) / 100;
    const ceilingArea = floorArea;
    const surfaceArea = Math.round((floorArea + wallArea + ceilingArea) * 100) / 100;
    const ratios = calculateRoomRatios(length, width, height);
    return {
        volume,
        surfaceArea,
        floorArea,
        wallArea,
        ceilingArea,
        ratios
    };
}
function calculateOptimalPositions(length, width, equipmentPosition) {
    const recommendations = [];
    // Default: speakers on short wall (most common)
    let speakerWall = 'short';
    if (equipmentPosition === 'pared_larga') {
        speakerWall = 'long';
    } else if (equipmentPosition === 'pared_corta') {
        speakerWall = 'short';
    } else {
        // Auto-determine: prefer short wall if room is not too wide
        speakerWall = width / length > 0.7 ? 'short' : 'long';
    }
    let speakers;
    let listeningPosition;
    if (speakerWall === 'short') {
        // Speakers on short wall (width direction)
        const speakerDistanceFromWall = 0.15 // 15% from front wall
        ;
        const speakerSpacing = 0.35 // 35% from side walls
        ;
        speakers = [
            {
                x: speakerSpacing,
                y: speakerDistanceFromWall
            },
            {
                x: 1 - speakerSpacing,
                y: speakerDistanceFromWall
            }
        ];
        // Listening position: 38% rule (avoid 50% which is room mode null)
        listeningPosition = {
            x: 0.5,
            y: 0.38
        };
        recommendations.push(`Parlantes separados ${Math.round(width * (1 - 2 * speakerSpacing) * 100) / 100}m`);
        recommendations.push(`Punto de escucha a ${Math.round(length * 0.38 * 100) / 100}m de pared frontal`);
    } else {
        // Speakers on long wall (length direction)
        const speakerDistanceFromWall = 0.15;
        const speakerSpacing = 0.35;
        speakers = [
            {
                x: speakerDistanceFromWall,
                y: speakerSpacing
            },
            {
                x: speakerDistanceFromWall,
                y: 1 - speakerSpacing
            }
        ];
        listeningPosition = {
            x: 0.38,
            y: 0.5
        };
        recommendations.push(`Configuración en pared larga`);
        recommendations.push(`Parlantes separados ${Math.round(length * (1 - 2 * speakerSpacing) * 100) / 100}m`);
    }
    recommendations.push('Formar triángulo equilátero con punto de escucha');
    recommendations.push('Evitar esquinas para los parlantes');
    return {
        speakers,
        listeningPosition,
        recommendations
    };
}
}),
"[project]/lib/acousticProducts.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Acoustic Products Database with Real Pricing
// Prices updated as of 2025 - USD and ARS
__turbopack_context__.s([
    "acousticProductsDB",
    ()=>acousticProductsDB,
    "calculateTreatmentCost",
    ()=>calculateTreatmentCost,
    "generateProductRecommendations",
    ()=>generateProductRecommendations,
    "getProductById",
    ()=>getProductById,
    "getProductsByCategory",
    ()=>getProductsByCategory,
    "getTotalAbsorptionArea",
    ()=>getTotalAbsorptionArea
]);
const acousticProductsDB = [
    // ===== ABSORBERS =====
    {
        id: 'foam-panel-5cm',
        name: 'Acoustic Foam Panel 60x60cm (5cm)',
        category: 'absorber',
        priceUSD: 12,
        priceARS: 12000,
        supplier: 'Amazon / MercadoLibre',
        link: 'https://www.amazon.com/s?k=acoustic+foam+panels',
        absorptionCoefficient: 0.65,
        coverage: 0.36,
        thickness: 5,
        installation: 'easy',
        description: 'Basic foam panel for mid-high frequency absorption. Good for first reflections and flutter echo.'
    },
    {
        id: 'foam-panel-10cm',
        name: 'Acoustic Foam Panel 60x60cm (10cm)',
        category: 'absorber',
        priceUSD: 18,
        priceARS: 18000,
        supplier: 'Amazon / MercadoLibre',
        link: 'https://www.amazon.com/s?k=thick+acoustic+foam',
        absorptionCoefficient: 0.80,
        coverage: 0.36,
        thickness: 10,
        installation: 'easy',
        description: 'Thicker foam for better mid-frequency absorption. More effective than 5cm panels.'
    },
    {
        id: 'pro-fabric-panel-5cm',
        name: 'Fabric-Wrapped Panel 60x120cm (5cm)',
        category: 'absorber',
        priceUSD: 45,
        priceARS: 45000,
        supplier: 'ATS Acoustics / Local',
        link: 'https://www.atsacoustics.com/',
        absorptionCoefficient: 0.85,
        coverage: 0.72,
        thickness: 5,
        installation: 'moderate',
        description: 'Professional fabric-wrapped fiberglass panel. Better aesthetics and performance than foam.'
    },
    {
        id: 'pro-fabric-panel-10cm',
        name: 'Fabric-Wrapped Panel 60x120cm (10cm)',
        category: 'absorber',
        priceUSD: 85,
        priceARS: 85000,
        supplier: 'GIK Acoustics / ATS',
        link: 'https://www.gikacoustics.com/',
        absorptionCoefficient: 0.95,
        coverage: 0.72,
        thickness: 10,
        installation: 'moderate',
        description: 'High-performance broadband absorber. Excellent for critical listening environments.'
    },
    {
        id: 'ceiling-cloud-panel',
        name: 'Ceiling Cloud Panel 120x120cm (10cm)',
        category: 'absorber',
        priceUSD: 120,
        priceARS: 120000,
        supplier: 'Acoustics First',
        link: 'https://www.acousticsfirst.com/',
        absorptionCoefficient: 0.95,
        coverage: 1.44,
        thickness: 10,
        installation: 'professional',
        description: 'Large ceiling-mounted panel for overhead reflection control.'
    },
    // ===== BASS TRAPS =====
    {
        id: 'corner-bass-trap-60cm',
        name: 'Corner Bass Trap 30x30x60cm',
        category: 'bass_trap',
        priceUSD: 65,
        priceARS: 65000,
        supplier: 'GIK Acoustics / Primacoustic',
        link: 'https://www.gikacoustics.com/product/gik-acoustics-tri-trap/',
        absorptionCoefficient: 0.75,
        installation: 'moderate',
        description: 'Corner-mounted bass trap for low frequency control. Treats problematic room modes.'
    },
    {
        id: 'corner-bass-trap-120cm',
        name: 'Corner Bass Trap 30x30x120cm',
        category: 'bass_trap',
        priceUSD: 120,
        priceARS: 120000,
        supplier: 'GIK Acoustics',
        link: 'https://www.gikacoustics.com/',
        absorptionCoefficient: 0.85,
        installation: 'moderate',
        description: 'Full-height corner bass trap. Maximum low-frequency absorption for serious rooms.'
    },
    {
        id: 'soffit-bass-trap',
        name: 'Soffit Bass Trap 60x60x30cm',
        category: 'bass_trap',
        priceUSD: 95,
        priceARS: 95000,
        supplier: 'GIK Acoustics / Real Traps',
        link: 'https://www.gikacoustics.com/',
        absorptionCoefficient: 0.90,
        installation: 'moderate',
        description: 'Wall-ceiling junction trap. Treats bass buildup at boundaries.'
    },
    {
        id: 'membrane-bass-trap',
        name: 'Membrane Bass Trap 60x120cm',
        category: 'bass_trap',
        priceUSD: 180,
        priceARS: 180000,
        supplier: 'GIK Acoustics / Artnovion',
        link: 'https://www.gikacoustics.com/product/gik-acoustics-monster-bass-trap-flexrange-technology/',
        absorptionCoefficient: 0.95,
        installation: 'professional',
        description: 'Tuned membrane absorber for specific low frequencies. Professional-grade solution.'
    },
    // ===== DIFFUSERS =====
    {
        id: 'qrd-diffuser-small',
        name: 'QRD Diffuser 60x60cm',
        category: 'diffuser',
        priceUSD: 85,
        priceARS: 85000,
        supplier: 'Acoustics First / Vicoustic',
        link: 'https://www.acousticsfirst.com/',
        installation: 'moderate',
        description: 'Quadratic residue diffuser. Scatters sound evenly without absorbing energy.'
    },
    {
        id: 'qrd-diffuser-large',
        name: 'QRD Diffuser 60x120cm',
        category: 'diffuser',
        priceUSD: 140,
        priceARS: 140000,
        supplier: 'Acoustics First / RPG',
        link: 'https://www.rpgacoustic.com/',
        installation: 'moderate',
        description: 'Large diffuser for rear wall. Creates spacious, natural sound field.'
    },
    {
        id: 'skyline-diffuser',
        name: 'Skyline Diffuser 60x60cm',
        category: 'diffuser',
        priceUSD: 95,
        priceARS: 95000,
        supplier: 'Acoustics First / DIY',
        link: 'https://www.acousticsfirst.com/',
        installation: 'moderate',
        description: '2D diffuser with multi-directional scattering. Great for mixing positions.'
    },
    {
        id: 'poly-diffuser',
        name: 'Poly Cylindrical Diffuser 60x60cm',
        category: 'diffuser',
        priceUSD: 110,
        priceARS: 110000,
        supplier: 'Vicoustic / RPG',
        link: 'https://www.vicoustic.com/',
        installation: 'moderate',
        description: 'Curved poly diffuser. Broadband diffusion with modern aesthetics.'
    },
    // ===== RUGS & CARPETS =====
    {
        id: 'thick-rug-small',
        name: 'Thick Area Rug 1.5x2m',
        category: 'rug',
        priceUSD: 80,
        priceARS: 80000,
        supplier: 'IKEA / Local stores',
        link: '',
        absorptionCoefficient: 0.30,
        coverage: 3,
        installation: 'easy',
        description: 'Medium pile rug for small rooms. Reduces floor reflections.'
    },
    {
        id: 'thick-rug-medium',
        name: 'Thick Area Rug 2x3m',
        category: 'rug',
        priceUSD: 150,
        priceARS: 150000,
        supplier: 'IKEA / Local stores',
        link: '',
        absorptionCoefficient: 0.35,
        coverage: 6,
        installation: 'easy',
        description: 'Large thick pile rug. Essential for first reflection point between speakers and listener.'
    },
    {
        id: 'thick-rug-large',
        name: 'Thick Area Rug 3x4m',
        category: 'rug',
        priceUSD: 280,
        priceARS: 280000,
        supplier: 'Specialty carpet stores',
        link: '',
        absorptionCoefficient: 0.40,
        coverage: 12,
        installation: 'easy',
        description: 'Extra large rug for comprehensive floor treatment in bigger rooms.'
    },
    // ===== CURTAINS =====
    {
        id: 'light-curtain',
        name: 'Light Curtain Fabric (per m²)',
        category: 'curtain',
        priceUSD: 15,
        priceARS: 15000,
        supplier: 'Local fabric stores',
        link: '',
        absorptionCoefficient: 0.25,
        installation: 'easy',
        description: 'Light fabric curtain. Basic window treatment for high-frequency control.'
    },
    {
        id: 'medium-curtain',
        name: 'Medium Weight Curtain (per m²)',
        category: 'curtain',
        priceUSD: 25,
        priceARS: 25000,
        supplier: 'Local fabric stores',
        link: '',
        absorptionCoefficient: 0.40,
        installation: 'easy',
        description: 'Heavier curtain fabric. Better absorption across frequency range.'
    },
    {
        id: 'heavy-curtain',
        name: 'Heavy Acoustic Curtain (per m²)',
        category: 'curtain',
        priceUSD: 40,
        priceARS: 40000,
        supplier: 'Acoustic specialty stores',
        link: '',
        absorptionCoefficient: 0.55,
        installation: 'easy',
        description: 'Multi-layer acoustic curtain. Excellent for window and door treatment.'
    },
    {
        id: 'blackout-acoustic-curtain',
        name: 'Blackout Acoustic Curtain (per m²)',
        category: 'curtain',
        priceUSD: 55,
        priceARS: 55000,
        supplier: 'Acoustic specialty stores',
        link: '',
        absorptionCoefficient: 0.65,
        installation: 'easy',
        description: 'Premium curtain with blackout and acoustic properties. Blocks light and sound.'
    },
    // ===== MISCELLANEOUS =====
    {
        id: 'door-seal-kit',
        name: 'Door Seal Kit (weatherstripping)',
        category: 'misc',
        priceUSD: 25,
        priceARS: 25000,
        supplier: 'Hardware stores',
        link: '',
        installation: 'easy',
        description: 'Rubber seal for door gaps. Reduces sound leakage and external noise.'
    },
    {
        id: 'window-plug',
        name: 'Window Plug Insert (custom size)',
        category: 'misc',
        priceUSD: 60,
        priceARS: 60000,
        supplier: 'DIY / Custom',
        link: '',
        absorptionCoefficient: 0.80,
        installation: 'moderate',
        description: 'Removable insulated plug for windows. Dramatically reduces noise when needed.'
    },
    {
        id: 'isolation-pads',
        name: 'Speaker Isolation Pads (pair)',
        category: 'misc',
        priceUSD: 35,
        priceARS: 35000,
        supplier: 'Amazon / Music stores',
        link: 'https://www.amazon.com/s?k=speaker+isolation+pads',
        installation: 'easy',
        description: 'Foam/rubber pads to decouple speakers from surfaces. Tightens bass response.'
    },
    {
        id: 'bass-shaker',
        name: 'Bass Shaker / Tactile Transducer',
        category: 'misc',
        priceUSD: 50,
        priceARS: 50000,
        supplier: 'Music/Audio stores',
        link: 'https://www.amazon.com/s?k=bass+shaker',
        installation: 'moderate',
        description: 'Adds tactile bass feel without acoustic bass problems. Mounts to furniture.'
    },
    {
        id: 'measurement-mic',
        name: 'USB Measurement Microphone',
        category: 'misc',
        priceUSD: 80,
        priceARS: 80000,
        supplier: 'Amazon / MiniDSP',
        link: 'https://www.minidsp.com/products/acoustic-measurement/umik-1',
        installation: 'easy',
        description: 'Calibrated mic for room measurements. Use with REW software to measure actual performance.'
    },
    {
        id: 'acoustic-caulk',
        name: 'Acoustic Sealant (tube)',
        category: 'misc',
        priceUSD: 12,
        priceARS: 12000,
        supplier: 'Hardware stores',
        link: '',
        installation: 'easy',
        description: 'Flexible sealant for gaps and cracks. Prevents sound leaks through small openings.'
    },
    {
        id: 'mass-loaded-vinyl',
        name: 'Mass Loaded Vinyl (per m²)',
        category: 'misc',
        priceUSD: 35,
        priceARS: 35000,
        supplier: 'Acoustic specialty stores',
        link: '',
        installation: 'professional',
        description: 'Heavy vinyl barrier for soundproofing walls. Blocks sound transmission.'
    }
];
function getProductsByCategory(category) {
    return acousticProductsDB.filter((p)=>p.category === category);
}
function getProductById(id) {
    return acousticProductsDB.find((p)=>p.id === id);
}
function calculateTreatmentCost(products, currency = 'USD') {
    return products.reduce((total, item)=>{
        const product = getProductById(item.id);
        if (!product) return total;
        const price = currency === 'USD' ? product.priceUSD : product.priceARS;
        return total + price * item.quantity;
    }, 0);
}
function getTotalAbsorptionArea(products) {
    return products.reduce((total, item)=>{
        const product = getProductById(item.id);
        if (!product || !product.coverage) return total;
        return total + product.coverage * item.quantity;
    }, 0);
}
function generateProductRecommendations(roomArea, _roomVolume, roomCharacter, budget) {
    const recommendations = [];
    // Free/DIY recommendations
    if (budget === 'free') {
        recommendations.push({
            productId: 'thick-rug-medium',
            quantity: 1,
            placement: 'Between speakers and listening position',
            priority: 'high',
            reason: 'Reduces floor reflections and flutter echo'
        });
        recommendations.push({
            productId: 'light-curtain',
            quantity: Math.ceil(roomArea * 0.15),
            placement: 'Windows and glass surfaces',
            priority: 'medium',
            reason: 'Controls window reflections'
        });
    }
    // Low budget recommendations
    if (budget === 'low') {
        const panelCount = Math.ceil(roomArea / 3) // Rough estimate: 1 panel per 3m² of floor
        ;
        recommendations.push({
            productId: 'foam-panel-5cm',
            quantity: Math.min(panelCount, 12),
            placement: 'First reflection points on side walls',
            priority: 'high',
            reason: 'Treats early reflections and reduces flutter echo'
        });
        if (roomCharacter === 'viva') {
            recommendations.push({
                productId: 'corner-bass-trap-60cm',
                quantity: 4,
                placement: 'All four corners of the room',
                priority: 'high',
                reason: 'Tames excessive bass and room modes'
            });
        }
        recommendations.push({
            productId: 'thick-rug-medium',
            quantity: 1,
            placement: 'Floor between speakers and listening position',
            priority: 'high',
            reason: 'Critical floor reflection point'
        });
        recommendations.push({
            productId: 'isolation-pads',
            quantity: 1,
            placement: 'Under speakers',
            priority: 'medium',
            reason: 'Decouples speakers from surface, tightens bass'
        });
    }
    // Advanced recommendations
    if (budget === 'advanced') {
        const wallPanels = Math.ceil(roomArea / 2.5);
        recommendations.push({
            productId: 'pro-fabric-panel-10cm',
            quantity: Math.min(wallPanels, 16),
            placement: 'First reflection points and front wall',
            priority: 'high',
            reason: 'Professional broadband absorption for accurate sound'
        });
        recommendations.push({
            productId: 'corner-bass-trap-120cm',
            quantity: 4,
            placement: 'Floor-to-ceiling in all corners',
            priority: 'high',
            reason: 'Maximum low-frequency control'
        });
        if (roomCharacter !== 'seca') {
            recommendations.push({
                productId: 'qrd-diffuser-large',
                quantity: Math.ceil(roomArea / 12),
                placement: 'Rear wall behind listening position',
                priority: 'medium',
                reason: 'Creates natural spaciousness without over-damping'
            });
        }
        recommendations.push({
            productId: 'ceiling-cloud-panel',
            quantity: Math.ceil(roomArea / 10),
            placement: 'Ceiling between speakers and listener',
            priority: 'medium',
            reason: 'Controls ceiling reflections'
        });
        recommendations.push({
            productId: 'measurement-mic',
            quantity: 1,
            placement: 'For room analysis',
            priority: 'medium',
            reason: 'Measure and verify improvements with REW software'
        });
    }
    return recommendations;
}
}),
"[project]/app/api/analyze-room/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticsCalculations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/acousticsCalculations.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticProducts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/acousticProducts.ts [app-route] (ecmascript)");
;
;
;
const N8N_URL = process.env.N8N_ANALYZE_ROOM_WEBHOOK_URL;
async function POST(req) {
    try {
        const project = await req.json();
        // Validate required fields
        if (!project.lengthM || !project.widthM || !project.heightM) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing room dimensions"
            }, {
                status: 400
            });
        }
        // If N8N webhook is configured, try to use it (for future AI enhancements)
        if (N8N_URL) {
            try {
                const n8nRes = await fetch(N8N_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...project,
                        locale: "es-AR",
                        source: "web-mvp",
                        version: "0.2.0"
                    }),
                    signal: AbortSignal.timeout(5000)
                });
                if (n8nRes.ok) {
                    const data = await n8nRes.json();
                    // If N8N returns enhanced analysis, use it
                    if (data.roomMetrics) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
                    }
                }
            } catch (n8nError) {
                console.warn("N8N webhook failed, using local analysis:", n8nError);
            // Continue with local analysis
            }
        }
        // Generate comprehensive analysis locally
        const analysis = generateLocalAnalysis(project);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(analysis);
    } catch (error) {
        console.error("Error analyzing room:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
/**
 * Generate comprehensive analysis using local calculations
 */ function generateLocalAnalysis(project) {
    const { lengthM = 0, widthM = 0, heightM = 0, goal } = project;
    // === STEP 1: Calculate room metrics ===
    const metrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticsCalculations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateRoomMetrics"])(lengthM, widthM, heightM);
    // === STEP 2: Calculate room modes ===
    const roomModes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticsCalculations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateRoomModes"])(lengthM, widthM, heightM);
    // === STEP 3: Calculate absorption ===
    const absorption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticsCalculations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateTotalAbsorption"])(project);
    // === STEP 4: Estimate RT60 ===
    const rt60 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticsCalculations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["estimateRT60ByBand"])(metrics.volume, absorption);
    const rt60Eval = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticsCalculations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateRT60"])(rt60.mid, goal || "music");
    // === STEP 5: Determine room character ===
    const roomCharacter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticsCalculations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["determineRoomCharacter"])(rt60.mid, absorption.average, metrics.surfaceArea);
    // === STEP 6: Generate frequency response estimate ===
    const frequencyResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticsCalculations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["estimateFrequencyResponse"])(roomModes, roomCharacter, metrics.volume);
    // === STEP 7: Calculate optimal speaker positions ===
    const positions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticsCalculations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateOptimalPositions"])(lengthM, widthM, project.equipmentPosition || "indefinido");
    // === STEP 8: Generate recommendations ===
    // Free recommendations
    const freeRecommendations = generateFreeRecommendations(project, roomCharacter, positions);
    // Low budget recommendations
    const lowBudgetRecs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticProducts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateProductRecommendations"])(metrics.floorArea, metrics.volume, roomCharacter, "low");
    const lowBudgetProducts = convertToProductRecommendations(lowBudgetRecs, "ARS");
    const lowBudgetCost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticProducts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateTreatmentCost"])(lowBudgetRecs.map((r)=>({
            id: r.productId,
            quantity: r.quantity
        })), "ARS");
    // Advanced recommendations
    const advancedRecs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticProducts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateProductRecommendations"])(metrics.floorArea, metrics.volume, roomCharacter, "advanced");
    const advancedProducts = convertToProductRecommendations(advancedRecs, "USD");
    const advancedCost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticProducts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateTreatmentCost"])(advancedRecs.map((r)=>({
            id: r.productId,
            quantity: r.quantity
        })), "USD");
    // === STEP 9: Generate summary ===
    const summary = generateSummary(project, roomCharacter, metrics, rt60, roomModes);
    // === STEP 10: Create room diagram data ===
    const roomDiagram = {
        floorPlan: {
            width: widthM,
            length: lengthM,
            speakerPositions: positions.speakers,
            listeningPosition: positions.listeningPosition,
            furnitureLayout: generateFurnitureLayout(project.furniture || [], widthM, lengthM)
        },
        treatmentPlan: generateTreatmentPlan(roomCharacter, lowBudgetRecs, advancedRecs)
    };
    // === STEP 11: Count priorities ===
    const priorityScore = calculatePriorityScore(roomCharacter, rt60Eval, roomModes);
    // === STEP 12: Assemble final response ===
    const response = {
        summary,
        roomCharacter,
        priorityScore,
        roomMetrics: {
            ...metrics,
            roomModes,
            rt60Estimate: rt60,
            rt60Evaluation: rt60Eval
        },
        materialsAnalysis: {
            floorAbsorption: absorption.low / metrics.floorArea,
            wallAbsorption: absorption.mid / metrics.wallArea,
            ceilingAbsorption: 0.02,
            furnitureContribution: (project.furniture?.length || 0) * 0.3,
            totalAbsorption: absorption.average
        },
        frequencyResponse,
        freeChanges: {
            title: "Cambios sin gastar dinero",
            items: freeRecommendations
        },
        lowBudgetChanges: {
            title: "Mejoras con bajo presupuesto (ARS $50k-150k)",
            totalEstimatedCost: {
                min: Math.round(lowBudgetCost * 0.7),
                max: Math.round(lowBudgetCost * 1.2),
                currency: "ARS"
            },
            items: lowBudgetProducts
        },
        advancedChanges: {
            title: "Soluciones avanzadas (USD $500-2000)",
            totalEstimatedCost: {
                min: Math.round(advancedCost * 0.8),
                max: Math.round(advancedCost * 1.3),
                currency: "USD"
            },
            items: advancedProducts
        },
        roomDiagram,
        generatedAt: new Date().toISOString()
    };
    return response;
}
// ===== HELPER FUNCTIONS =====
/**
 * Generate free (no cost) recommendations
 */ function generateFreeRecommendations(project, roomCharacter, positions) {
    const recommendations = [];
    // Speaker placement
    recommendations.push(...positions.recommendations);
    // Listening position advice
    recommendations.push("Evitar punto de escucha exactamente en el centro de la sala (50% de profundidad)");
    // Room character specific
    if (roomCharacter === "viva") {
        recommendations.push("Agregar mantas gruesas en las paredes para absorción temporal");
        recommendations.push("Colocar almohadones en las esquinas para reducir acumulación de graves");
        recommendations.push("Abrir puertas de placares para añadir absorción difusa");
    } else if (roomCharacter === "seca") {
        recommendations.push("Remover exceso de materiales absorbentes si la sala suena muy apagada");
        recommendations.push("Mantener superficies duras y lisas para preservar brillo natural");
    } else {
        recommendations.push("La sala tiene buen balance, enfocarse en optimizar posiciones");
    }
    // Furniture recommendations
    if (!project.furniture || project.furniture.length === 0) {
        recommendations.push("Agregar muebles como biblioteca o sofá para romper reflexiones paralelas");
    }
    // General tips
    recommendations.push("Despejar espacio entre parlantes y paredes (mínimo 30cm)");
    recommendations.push("Experimentar con pequeños cambios de posición antes de comprar tratamiento");
    return recommendations;
}
/**
 * Convert product recommendations to full product objects
 */ function convertToProductRecommendations(recommendations, currency) {
    return recommendations.map((rec)=>{
        const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$acousticProducts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProductById"])(rec.productId);
        if (!product) {
            throw new Error(`Product not found: ${rec.productId}`);
        }
        const unitPrice = currency === "USD" ? product.priceUSD : product.priceARS;
        const totalPrice = unitPrice * rec.quantity;
        return {
            productId: rec.productId,
            product: product.name,
            category: product.category,
            quantity: rec.quantity,
            unitPrice,
            totalPrice,
            currency,
            supplier: product.supplier,
            link: product.link,
            placement: rec.placement,
            impactLevel: rec.priority,
            installation: product.installation
        };
    });
}
/**
 * Generate executive summary
 */ function generateSummary(project, roomCharacter, metrics, rt60, roomModes) {
    const goal = project.goal === "music" ? "escuchar música" : project.goal === "instrument" ? "tocar instrumento" : "trabajar y concentrarse";
    const characterDesc = {
        viva: "viva (reverberante)",
        equilibrada: "equilibrada",
        seca: "seca (muy absorbente)"
    }[roomCharacter];
    const problematicModes = roomModes.filter((m)=>m.frequency < 200 && m.severity === "high");
    let summary = `Análisis para sala de ${metrics.volume.toFixed(1)}m³ optimizada para ${goal}. `;
    summary += `La sala tiene carácter acústico ${characterDesc} con RT60 promedio de ${rt60.mid.toFixed(2)}s. `;
    if (roomCharacter === "viva") {
        summary += `Se recomienda agregar absorción para controlar reverberación excesiva. `;
    } else if (roomCharacter === "seca") {
        summary += `La sala es muy absorbente, considerar agregar difusión para recuperar vitalidad. `;
    } else {
        summary += `El balance acústico es bueno, enfocarse en tratamiento de puntos específicos. `;
    }
    if (problematicModes.length > 0) {
        summary += `Se detectaron ${problematicModes.length} modos problemáticos en graves (${problematicModes.slice(0, 3).map((m)=>`${m.frequency.toFixed(0)}Hz`).join(", ")}), requieren trampas de graves en esquinas.`;
    }
    return summary;
}
/**
 * Generate furniture layout for diagram
 */ function generateFurnitureLayout(furniture, width, length) {
    const layout = [];
    furniture.forEach((item, index)=>{
        // Simple placement algorithm - spread furniture around the room
        const angle = index / furniture.length * Math.PI * 2;
        const radiusX = width * 0.3;
        const radiusY = length * 0.3;
        layout.push({
            type: item,
            x: 0.5 + Math.cos(angle) * (radiusX / width),
            y: 0.5 + Math.sin(angle) * (radiusY / length),
            width: 0.15,
            length: 0.15
        });
    });
    return layout;
}
/**
 * Generate treatment plan for diagram
 */ function generateTreatmentPlan(roomCharacter, lowBudget, advanced) {
    const plan = [];
    // Always recommend corner bass traps
    plan.push({
        type: "bass_trap",
        position: {
            x: 0,
            y: 0
        },
        wall: "front",
        priority: "high"
    }, {
        type: "bass_trap",
        position: {
            x: 1,
            y: 0
        },
        wall: "front",
        priority: "high"
    }, {
        type: "bass_trap",
        position: {
            x: 0,
            y: 1
        },
        wall: "back",
        priority: "high"
    }, {
        type: "bass_trap",
        position: {
            x: 1,
            y: 1
        },
        wall: "back",
        priority: "high"
    });
    // First reflection points (side walls)
    plan.push({
        type: "absorber",
        position: {
            x: 0,
            y: 0.3
        },
        wall: "left",
        priority: "high"
    }, {
        type: "absorber",
        position: {
            x: 1,
            y: 0.3
        },
        wall: "right",
        priority: "high"
    });
    // Rear diffusion (if not too dead)
    if (roomCharacter !== "seca") {
        plan.push({
            type: "diffuser",
            position: {
                x: 0.5,
                y: 1
            },
            wall: "back",
            priority: "medium"
        });
    }
    return plan;
}
/**
 * Calculate priority scores
 */ function calculatePriorityScore(roomCharacter, rt60Eval, roomModes) {
    let critical = 0;
    let improvements = 0;
    let optimizations = 0;
    // RT60 issues
    if (rt60Eval.rating === "problematic") {
        critical += 1;
    } else if (rt60Eval.rating === "acceptable") {
        improvements += 1;
    }
    // Room modes
    const problematicModes = roomModes.filter((m)=>m.frequency < 200 && m.severity === "high");
    critical += Math.min(problematicModes.length, 3);
    // Room character
    if (roomCharacter === "viva") {
        improvements += 2; // Needs absorption
    } else if (roomCharacter === "seca") {
        improvements += 1; // Might need diffusion
    } else {
        optimizations += 3; // Just fine-tuning
    }
    // Always some optimizations possible
    optimizations += 2;
    return {
        critical,
        improvements,
        optimizations
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7fdf0764._.js.map