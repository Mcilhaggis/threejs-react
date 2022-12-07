
// Entry point of react App
import React, { Suspense, useState, useEffect, useRef, useLayoutEffect } from "react";
import { Canvas, camera, setDefaultCamera, Camera, PerspectiveCamera, useThree } from "@react-three/fiber"
import { OrbitControls, Bounds, useBounds, Html, KeyboardControls } from '@react-three/drei'

import MenuPanel from './MenuPanel'
import Progress from './Progress'
import Model from './Model'
// import CustomCamera from './CustomCamera'

import '../styles.scss'
const SceneViewer = () => {
    const [modelScale, setModelScale] = useState(1);
    const [modelXPos, setModelXPos] = useState(0);
    const [modelYPos, setModelYPos] = useState(0);
    const [modelZPos, setModelZPos] = useState(0);


    const [keypressDirection, setKeyPressDirection] = useState(null)

    useEffect(() => {
        console.log(keypressDirection)
        directionalMovement(keypressDirection);
    }, [keypressDirection]);

    {/* The X axis is red. The Y axis is green. The Z axis is blue. */ }
    const directionalMovement = (direction) => {
        switch (direction) {
            case 'down':
                setModelXPos(
                    modelXPos + 0.02
                );
                setKeyPressDirection(null)
                break;
            case 'up':
                setModelXPos(
                    modelXPos - 0.02
                );
                setKeyPressDirection(null)
                break;
            case 'left':
                setModelYPos(
                    modelYPos - 0.02
                )
                setKeyPressDirection(null)
                break;
            case 'right':
                setModelYPos(
                    modelYPos + 0.02
                )
                setKeyPressDirection(null)
                break;
            case 'add':
                setModelScale(
                    modelScale + 0.02
                );
                setKeyPressDirection(null)
                break;
            case 'subtract':
                setModelScale(
                    modelScale - 0.02
                );
                setKeyPressDirection(null)
                break;
            default:
                return;
        }
    }

    function SelectToZoom({ children }) {
        const api = useBounds()
        return (
            <group
                onClick={(e) => (e.stopPropagation(),
                    e.delta <= 2 && api.refresh(e.object).fit())
                }
                onPointerMissed={
                    (e) => e.button === 0 && api.refresh().fit()
                }

            >
                {children}
            </group>
        )
    }
    const ref = useRef()
    const shapeRef = useRef()

    function Dodecahedron({ ...props }) {
        const [clicked, click] = useState(false)

        return (
            <mesh {...props}
                ref={shapeRef}
                onClick={(event) => {
                    click(!clicked)
                }}
            >
                <dodecahedronGeometry />

                <meshStandardMaterial roughness={0.75} emissive="#404057" />
                {clicked && (
                    <Html distanceFactor={10}>
                        <div className="content">
                            {props.labelContent}

                        </div>
                    </Html>
                )}
            </mesh>
        )
    }

    function keypressDiscover() {
        // addEventListener('keyup', (e) => {
        e.preventDefault()
        console.log(e)
        // check what key was pressed...
        if (e.code === 'ArrowRight' || e.code === 'ArrowLeft' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
            setKeyPressDirection(e.code.substring(5).toLowerCase())
        } else if (e.code === 'NumpadAdd' || e.code === 'NumpadSubtract') {
            setKeyPressDirection(e.code.substring(6).toLowerCase())
        } else { return }
        // });
    }



    function CustomCamera(props) {
        const cameraRef = useRef()
        const set = useThree(({ set }) => set)
        const size = useThree(({ size }) => size)
        useLayoutEffect(() => {
            if (cameraRef.current) {
                cameraRef.current.aspect = size.width / size.height
                cameraRef.current.updateProjectionMatrix()
            }
        }, [size, props])

        useLayoutEffect(() => {
            set({ camera: cameraRef.current })
        }, [])

        return <perspectiveCamera ref={cameraRef}
            position={[0, 5, 8]}
        />
    }



    return (
        <>
            <div className="main-container" id="container1">
                <MenuPanel
                    directionalMovement={directionalMovement}
                />

                <Canvas id="scene-container"
                    tabIndex='0'
                    onKeyDown={(e) => {
                        if (e.key === "-") {
                            directionalMovement('subtract')
                        } else if (e.key === "+") {
                            directionalMovement('add')
                        } else {
                            let slicedkeyCode = e.key.slice(5)
                            console.log('keycode', e.key)
                            directionalMovement(slicedkeyCode.toLowerCase())
                        }
                    }}
                >
                    <axesHelper args={[50]} />
                    <CustomCamera />
                    <mesh >
                        <gridHelper />

                        <OrbitControls />
                        <ambientLight
                            intensity={0.5}
                        />
                        <directionalLight
                            position={[-2, 5, 2]}
                            intensity={1}
                        />
                        <Suspense fallback={<Progress />}>
                            <group ref={ref}
                                rotation={[modelXPos, modelZPos, modelYPos]}
                                scale={modelScale}
                            >
                                <Dodecahedron
                                    position={[-2, 0, 0]}
                                    labelContent="shape 1" />
                                <Dodecahedron
                                    position={[0, -2, -3]}
                                    labelContent="shape 2" />
                            </group>

                        </Suspense>
                    </mesh>

                </Canvas>

            </div>
        </>

    )
}

export default SceneViewer