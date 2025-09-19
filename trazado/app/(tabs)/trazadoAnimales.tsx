import ExpoDraw from 'expo-draw';
import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import GatoSVG from '../../assets/svg/animales/Gato.svg';
import LoboSVG from '../../assets/svg/animales/Lobo.svg';
import OsoSVG from '../../assets/svg/animales/Oso.svg';
import PatoSVG from '../../assets/svg/animales/Pato.svg';
import PerroSVG from '../../assets/svg/animales/Perro.svg';
import SapoSVG from '../../assets/svg/animales/Sapo.svg';
import ToroSVG from '../../assets/svg/animales/Toro.svg';
import VacaSVG from '../../assets/svg/animales/Vaca.svg';
import GrosorSelector from '../../components/GrosorSelector';
import { Animal } from '../../src/types/Animal';
import { manejarVerificacionTrazado } from '../../src/utils/verificacionTrazado';

const ANIMALES: Animal[] = [
    { nombre: 'Gato', svg: GatoSVG, viewBox:{ width: 1722.052, height: 762.032 }, path: 'M225.533,168.125c35.024-7.031,67.579-9.826,97.679-8.398,30.093,1.435,53.314,10.419,69.658,26.953,16.345,16.541,21.404,43.945,15.178,82.227-8.307,16.406-17.646,26.893-28.02,31.445-10.38,4.56-21.403,5.536-33.078,2.93-11.675-2.6-23.738-6.769-36.191-12.5-33.212-8.068-60.319-6.896-81.334,3.516-21.014,10.419-37.037,28.778-48.061,55.078-11.03,26.307-17.84,58.984-20.431,98.047.517,19.532,5.643,38.477,15.372,56.836s21.854,32.617,36.386,42.773c14.526,10.156,29.314,12.695,44.363,7.617,15.044-5.078,28.02-21.289,38.916-48.633.517-1.301.906-2.6,1.167-3.906,1.296-3.906,2.335-8.918,3.113-15.039.778-6.115.128-11.779-1.945-16.992-1.818-3.381-4.348-6.506-7.589-9.375-3.247-2.862-6.555-5.334-9.923-7.422-3.375-2.081-7.528-4.425-12.453-7.031-6.227-1.818-10.058-7.287-11.48-16.406-1.429-9.112-.845-19.201,1.751-30.273,2.591-11.065,6.871-20.568,12.843-28.516,5.965-7.94,13.23-11.523,21.792-10.742,25.162-2.081,46.565-2.93,64.211-2.539,17.64.391,34.635,2.674,50.979,6.836,16.345,4.169,28.798,11.2,37.359,21.094,8.038,10.938,12.258,25.33,12.647,43.164.389,17.841-1.168,35.81-4.67,53.907-3.502,18.104-6.944,33.008-10.312,44.727-.778,6.775-2.469,11.98-5.06,15.625-.778,2.605-1.69,5.213-2.724,7.812-6.75,22.137-15.828,42.908-27.241,62.305-11.419,19.402-29.643,34.832-54.676,46.289-25.04,11.463-61.554,16.406-109.548,14.844-51.369-3.906-92.753-15.625-124.141-35.156-31.394-19.531-55.005-43.029-70.827-70.508-15.828-27.473-25.946-54.883-30.354-82.227-.523-59.375,4.536-107.874,15.177-145.508,10.635-37.628,24.127-67.053,40.472-88.281,16.344-21.222,32.944-36.914,49.812-47.07,16.861-10.156,31.388-17.443,43.585-21.875,5.704-2.344,10.246-4.425,13.621-6.25,14.526-3.381,29.187-6.506,43.974-9.375Z', emoji: '🐱' },
    { nombre: 'Lobo', svg: LoboSVG, viewBox:{ width: 1759.41, height: 762.032 }, path: 'M29.788,497.032c-3.113-53.644-4.804-104.816-5.059-153.516.255-9.112.389-20.703.389-34.766.255-24.219.517-49.279.778-75.195.255-25.909.517-44.592.778-56.055.778-11.456,6.81-19.141,18.096-23.047s25.228-5.139,41.834-3.711c16.6,1.435,33.272,4.364,50.006,8.789,16.734,4.432,30.743,9.375,42.029,14.844s17.317,10.291,18.096,14.453c-.261,23.438-1.04,54.041-2.335,91.797-1.301,35.419-2.274,71.552-2.918,108.398-.651,36.854-.523,68.945.389,96.29.906,27.344,3.308,44.666,7.199,51.953,7.783,7.557,22.182,10.742,43.196,9.57,21.015-1.172,43.975-3.711,68.881-7.617,17.379-2.6,33.596-4.688,48.645-6.25,5.704,0,11.931,6.316,18.68,18.945,6.743,12.635,11.803,27.801,15.177,45.508,3.369,17.713,2.853,33.984-1.557,48.828-4.414,14.844-14.787,24.354-31.132,28.516-49.557,13.025-118.693,19.402-207.42,19.141-21.537,0-39.372-2.668-53.509-8.008-14.144-5.334-25.362-12.109-33.662-20.312-8.306-8.203-14.399-16.34-18.291-24.414-3.892-8.068-6.877-17.834-8.95-29.297-3.113-22.912-6.227-61.193-9.34-114.844Z', emoji: '🐺' },
    { nombre: 'Oso', svg: OsoSVG, viewBox:{ width: 1341.067, height: 762.032 }, path: 'M265.616,197.422c11.152.263,22.571,1.307,34.246,3.125,37.614,4.95,68.747,16.932,93.397,35.938,24.645,19.013,43.196,42.188,55.649,69.531s19.068,55.994,19.847,85.938c.778,29.95-3.764,58.203-13.62,84.766-4.67,10.938-13.231,24.939-25.685,41.992-12.453,17.059-28.67,34.57-48.645,52.539-19.98,17.969-43.586,33.729-70.826,47.266-27.241,13.543-57.856,22.4-91.841,26.562-32.434,5.994-62.399,3.582-89.895-7.227-27.502-10.803-50.463-31.701-68.881-62.695-18.424-30.988-30.488-73.828-36.191-128.516-.778-42.188,9.662-82.227,31.327-120.117,21.659-37.891,50.979-68.811,87.949-92.773,36.97-23.956,78.026-36.065,123.167-36.328ZM310.369,350.938c-12.714-.519-30.487,7.422-53.314,23.828-35.802,32.812-59.674,60.352-71.604,82.617-11.936,22.266-13.882,37.5-5.837,45.704,8.038,8.203,23.866,7.557,47.477-1.953,23.604-9.504,53.053-29.621,88.339-60.352,9.595-12.756,16.016-25.977,19.263-39.648,3.241-13.672,2.919-25.323-.973-34.961-3.892-9.631-11.675-14.709-23.35-15.234Z', emoji: '🐻' },
    { nombre: 'Pato', svg: PatoSVG, viewBox:{ width: 1666.791, height: 762.032 }, path: 'M153.929,122.031c4.147.525,8.817.916,14.01,1.172,16.861,1.044,37.225,3.583,61.098,7.617,23.866,4.041,47.927,11.523,72.188,22.461,24.255,10.938,45.336,27.479,63.237,49.609,17.901,22.138,29.442,51.825,34.635,89.062,1.296,44.531-5.059,80.408-19.068,107.617-14.01,27.216-37.231,45.575-69.659,55.078-32.434,9.51-75.886,10.352-130.367,2.539l29.187,221.485c-22.833,6.775-42.485,11.98-58.957,15.625-16.479,3.643-32.884,6.055-49.229,7.227-16.344,1.172-29.965-.264-40.861-4.297-10.896-4.035-16.217-12.043-15.956-24.023L15.389,142.344c8.562-3.125,18.351-6.115,29.381-8.984,11.024-2.862,27.302-5.334,48.839-7.422,21.531-2.081,41.64-3.381,60.319-3.906ZM170.273,249.766c-7.783-.519-11.419,2.088-10.896,7.812l5.837,72.266c1.295,8.338,6.287,10.877,14.982,7.617,8.689-3.253,17.445-9.57,26.268-18.945,8.817-9.375,14.01-19.269,15.566-29.688.517-7.031-2.208-13.477-8.172-19.336-5.971-5.859-13.104-10.547-21.404-14.062-8.306-3.516-15.7-5.401-22.182-5.664Z', emoji: '🦆' },
    { nombre: 'Perro', svg: PerroSVG, viewBox:{ width: 1966.053, height: 762.032 }, path: 'M153.929,122.031c4.147.525,8.817.916,14.01,1.172,16.861,1.044,37.225,3.583,61.098,7.617,23.866,4.041,47.927,11.523,72.188,22.461,24.255,10.938,45.336,27.479,63.237,49.609,17.901,22.138,29.442,51.825,34.635,89.062,1.296,44.531-5.059,80.408-19.068,107.617-14.01,27.216-37.231,45.575-69.659,55.078-32.434,9.51-75.886,10.352-130.367,2.539l29.187,221.485c-22.833,6.775-42.485,11.98-58.957,15.625-16.479,3.643-32.884,6.055-49.229,7.227-16.344,1.172-29.965-.264-40.861-4.297-10.896-4.035-16.217-12.043-15.956-24.023L15.389,142.344c8.562-3.125,18.351-6.115,29.381-8.984,11.024-2.862,27.302-5.334,48.839-7.422,21.531-2.081,41.64-3.381,60.319-3.906ZM170.273,249.766c-7.783-.519-11.419,2.088-10.896,7.812l5.837,72.266c1.295,8.338,6.287,10.877,14.982,7.617,8.689-3.253,17.445-9.57,26.268-18.945,8.817-9.375,14.01-19.269,15.566-29.688.517-7.031-2.208-13.477-8.172-19.336-5.971-5.859-13.104-10.547-21.404-14.062-8.306-3.516-15.7-5.401-22.182-5.664Z', emoji: '🐶' },
    { nombre: 'Sapo', svg: SapoSVG, viewBox:{ width: 1699.48, height: 762.032 }, path: 'M341.308,252.695c-6.36,14.197-14.922,27.216-25.685,39.062-10.769,11.854-19.652,19.471-26.657,22.852-16.867-7.287-31.589-13.281-44.169-17.969-12.587-4.688-25.362-8.594-38.332-11.719-7.783-1.818-15.761-2.014-23.933-.586-8.172,1.435-13.17,4.755-14.982,9.961-1.818,7.812-.912,14.393,2.724,19.727,3.63,5.341,9.34,10.352,17.123,15.039,11.93,7.031,25.685,14.325,41.25,21.875,22.048,10.419,43.646,22.596,64.795,36.523,21.142,13.935,37.681,31.775,49.617,53.516,11.93,21.747,14.788,49.159,8.562,82.227-7.783,43.494-21.403,76.893-40.861,100.195-19.458,23.309-42.096,38.807-67.908,46.484-25.818,7.684-52.475,9.766-79.971,6.25-27.502-3.516-53.253-10.352-77.248-20.508-24-10.156-43.914-21.484-59.735-33.984-.262-6.77.389-16.211,1.946-28.32s4.214-24.475,7.978-37.109c3.758-12.629,8.884-22.912,15.372-30.859,6.482-7.941,14.526-10.871,24.128-8.789,18.418,12.762,34.635,22.852,48.645,30.273,14.009,7.422,28.603,13.152,43.78,17.188,15.177,4.041,29.12,4.102,41.834.195,12.708-3.906,22.182-14.191,28.408-30.859,5.448-16.145,4.214-29.553-3.697-40.234-7.917-10.676-19.98-19.66-36.191-26.954-16.217-7.287-33.796-14.19-52.731-20.703-21.014-7.031-40.539-14.776-58.568-23.242-18.035-8.459-31.072-19.336-39.11-32.617-13.231-19.269-19.98-43.42-20.236-72.461-.262-29.034,5.059-57.227,15.955-84.57,10.896-27.344,26.329-48.175,46.31-62.5,26.718-16.925,56.817-24.67,90.285-23.242,33.467,1.435,64.989,8.729,94.565,21.875,29.575,13.153,52.013,28.711,67.323,46.68,5.966,10.682,5.771,23.114-.583,37.305Z', emoji: '🐸' },
    { nombre: 'Toro', svg: ToroSVG, viewBox:{ width: 1758.632, height: 762.032 }, path: 'M16.167,266.758c-1.295-12.109-1.362-25.256-.195-39.453,1.167-14.19,3.436-31.836,6.811-52.93l428.461-16.406c9.595,2.606,15.237,10.224,16.928,22.852,1.685,12.635,1.423,26.562-.778,41.797-2.207,15.234-4.475,28.32-6.81,39.258-1.04,4.432-1.69,8.075-1.946,10.938l-117.914,3.516-21.403,367.579c-.523,4.168-6.75,8.924-18.68,14.258-11.937,5.34-25.818,9.766-41.64,13.281-15.828,3.516-29.838,4.559-42.029,3.125-12.198-1.428-18.68-6.836-19.458-16.211l-14.009-371.094-157.219,3.516c-5.448-3.906-8.823-11.914-10.118-24.023Z', emoji: '🐂' },
    { nombre: 'Vaca', svg: VacaSVG, viewBox:{ width: 1819.729, height: 762.032 }, path: 'M36.209,169.492c12.842-8.722,29.381-14.123,49.618-16.211,20.236-2.081,38.782-1.758,55.649.977,16.862,2.734,26.979,6.836,30.354,12.305l61.486,240.625c2.59,13.807,5.381,25.195,8.367,34.18,2.979,8.984,7.005,16.864,12.063,23.633,5.059,6.776,11.219,10.292,18.485,10.547,7.005-.256,13.292-4.035,18.874-11.329,5.575-7.287,10.312-15.753,14.204-25.391,3.892-9.631,7.783-22.003,11.675-37.109l62.653-225.781c2.335-5.206,10.763-9.112,25.296-11.719,14.526-2.6,31.582-3.32,51.174-2.148,19.586,1.172,38.198,4.627,55.844,10.352,17.64,5.731,30.744,14.258,39.305,25.586,8.562,11.328,8.817,25.977.778,43.945-18.162,62.244-41.901,124.158-71.216,185.742-29.32,61.59-62.265,122.852-98.846,183.79-15.565,22.918-34.963,41.15-58.179,54.688-23.222,13.543-47.026,19.141-71.41,16.797-24.389-4.162-45.275-14.123-62.654-29.883-17.384-15.754-29.187-31.701-35.413-47.852-1.818-4.426-9.212-26.496-22.182-66.211-12.976-39.709-27.825-85.022-44.559-135.938-16.734-50.909-37.943-115.686-63.627-194.336-4.67-17.443-.584-30.529,12.258-39.258Z', emoji: '🐮'},
];
const GROSOR_TRAZADO_POR_DEFECTO = 12;

export default function TrazadoDiasScreen() {
    const [strokes, setStrokes] = useState<any[]>([]);
    const [clearFn, setClearFn] = useState<(() => void) | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [size, setSize] = useState<number>(GROSOR_TRAZADO_POR_DEFECTO);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedAnimal: Animal = ANIMALES[selectedIndex];
    const SvgAnimal = selectedAnimal.svg;
    const pathD = selectedAnimal.path; // Debes agregar el path SVG para cada animal
    const [registro, setRegistro] = useState<
        { tipo: 'abecedario' | 'animal', valor: string, resultado: string, fecha: string }[]
    >([]);

    const goPrev = () => {
        setSelectedIndex((selectedIndex - 1 + ANIMALES.length) % ANIMALES.length);
        setStrokes([]);
        setResult(null);
        if (clearFn) clearFn();
    };

    const goNext = () => {
        setSelectedIndex((selectedIndex + 1) % ANIMALES.length);
        setStrokes([]);
        setResult(null);
        if (clearFn) clearFn();
    };

    function guardarIntento(tipo: 'abecedario' | 'animal', valor: string, resultado: string) {
        setRegistro(prev => {
            const nuevoRegistro = [
                ...prev,
                {
                    tipo,
                    valor,
                    resultado,
                    fecha: new Date().toISOString()
                }
            ];
            console.log('Último registro:', nuevoRegistro[nuevoRegistro.length - 1]); // Solo el último registro
            return nuevoRegistro;
        });
    }

    return (
        <ImageBackground
            source={require('../../assets/images/fondoTrazadoAnimales.jpg')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: 'transparent'
            }}>
                <View style={{
                    marginTop: 60,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: 'GilroyBold',
                        fontSize: 32,
                        color: '#2D3A4A',
                        marginBottom: 8
                    }}>
                        ✏️ ¡Traza el animal!
                    </Text>

                    {/* Selector de animal */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 12,
                    }}>
                        <TouchableOpacity
                            onPress={goPrev}
                            style={{
                                padding: 8,
                                borderRadius: 16,
                                backgroundColor: '#FFD700',
                                marginRight: 8,
                                elevation: 2,
                            }}>
                            <Text style={{ fontSize: 24 }}>{'⬅️'}</Text>
                        </TouchableOpacity>
                        <View style={{
                            backgroundColor: '#FFF',
                            padding: 12,
                            borderRadius: 16,
                            borderWidth: 3,
                            borderColor: '#2D3A4A',
                            elevation: 3,
                            minWidth: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                fontFamily: 'GilroyBold',
                                fontSize: 22,
                                color: '#2D3A4A',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>
                                {selectedAnimal.nombre}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={goNext}
                            style={{
                                padding: 8,
                                borderRadius: 16,
                                backgroundColor: '#FFD700',
                                marginLeft: 8,
                                elevation: 2,
                            }}>
                            <Text style={{ fontSize: 24 }}>{'➡️'}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Selector de grosor */}
                    <GrosorSelector size={size} setSize={setSize} />
                </View>

                {/* Emoji del animal */}
                <View style={{ alignItems: 'center', marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 64,
                        marginBottom: 0,
                        textAlign: 'center'
                    }}>
                        {selectedAnimal.emoji}
                    </Text>
                </View>

                {/* Área de trazado */}
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        position: 'relative',
                        height: 300,
                        width: '100%',
                        maxWidth: 400,
                        marginBottom: 16,
                        backgroundColor: 'rgba(255, 248, 225, 0.45)',
                        borderRadius: 24,
                        overflow: 'hidden',
                        borderWidth: 2,
                        borderColor: '#82a6e7ff',
                    }}>
                        <SvgAnimal
                            width="100%"
                            height="300"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0
                            }}
                        />
                        <ExpoDraw
                            strokes={strokes}
                            containerStyle={{
                                backgroundColor: 'rgba(0,0,0,0.01)',
                                height: 300,
                                width: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }}
                            color="#000000"
                            strokeWidth={12}
                            enabled={true}
                            rewind={(undo) => { }}
                            clear={(clear) => setClearFn(() => clear)}
                            onChangeStrokes={(newStrokes) => setStrokes(newStrokes)}
                        />
                    </View>
                </View>

                {/* Botones */}
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        maxWidth: 400,
                        marginBottom: 12
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setStrokes([]);
                                setResult(null);
                                if (clearFn) clearFn();
                            }}
                            style={{
                                backgroundColor: '#FF69B4',
                                padding: 14,
                                borderRadius: 16,
                                marginRight: 12,
                                elevation: 2,
                                borderWidth: 2,
                                borderColor: '#FFF',
                            }}>
                            <Text style={{
                                color: '#FFF',
                                fontFamily: 'GilroyBold',
                                fontSize: 18
                            }}>
                                🧹 Limpiar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                const resultado = manejarVerificacionTrazado(
                                    strokes,
                                    selectedAnimal,
                                    400, // área de dibujo, ajusta si usas otro valor
                                    size * 4, // umbral dinámico según grosor
                                    0.7,      // porcentaje de acierto
                                    size      // pasoContorno, puedes ajustar según tu lógica
                                );
                                setResult(resultado);
                                guardarIntento('animal', selectedAnimal.nombre, resultado);
                            }}
                            style={{
                                backgroundColor: '#4CAF50',
                                padding: 14,
                                borderRadius: 16,
                                elevation: 2,
                                borderWidth: 2,
                                borderColor: '#FFF',
                            }}>
                            <Text style={{
                                color: '#FFF',
                                fontFamily: 'GilroyBold',
                                fontSize: 18
                            }}>
                                ✅ Verificar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* Popup de resultado */}
                    {result && (
                        <View style={{
                            alignItems: 'center',
                            marginTop: 8,
                            backgroundColor: '#FFF',
                            borderRadius: 18,
                            borderWidth: 4,
                            borderColor: result === '¡Correcto!' ? '#4CAF50' : '#FF69B4',
                            paddingVertical: 18,
                            paddingHorizontal: 32,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 8,
                            elevation: 6,
                        }}>
                            <Text style={{
                                fontSize: 28,
                                fontFamily: 'GilroyBold',
                                color: result === '¡Correcto!' ? '#4CAF50' : '#FF69B4',
                                textAlign: 'center',
                            }}>
                                {result === '¡Correcto!' ? '😊 ¡Correcto!' : '😢 Intenta de nuevo'}
                            </Text>
                        </View>
                    )}
                </View>

            </SafeAreaView>
        </ImageBackground>
    );
}