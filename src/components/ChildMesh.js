/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from 'react'
import { useA11y } from '@react-three/a11y'
import { Html, } from '@react-three/drei'

export default function ChildMesh(props) {
    const [clicked, setClicked] = useState(false)
    const [hovered, setHovered] = useState(false)
    const childMeshRef = useRef()
    const a11y = useA11y()
    let mesh = props.mesh
    console.log('childMesh', a11y)

    return (
        <mesh
            onClick={(e) => {
                e.stopPropagation();
                setClicked(!clicked)
                if (a11y.pressed) {
                    a11y.pressed = false
                  } else {
                    a11y.pressed = true
                  }
            }}
            key={`childMesh` + props.index}
            geometry={props.geometry}
            material={props.material}
            ref={childMeshRef}
            onPointerOver={e => {
                e.stopPropagation()
                // Trigger re-render
                setHovered(true)
                // Set for a11y users
                a11y.hover = true

            }}
            onPointerLeave={e => {
                e.stopPropagation()
                setHovered(false)
                a11y.hover = false
            }}
        >
            {clicked || a11y.focus || hovered || a11y.hover || a11y.pressed ? <meshStandardMaterial
                attach="material"
                color={clicked || a11y.pressed ? "purple" : a11y.focus ? "blue" : a11y.hover ? "grey" : ""}
            /> : ""}

            {clicked && (

                <Html distanceFactor={mesh.labelDistance}>
                    <div
                        className="content"
                        tabIndex="-1"
                    >
                        {mesh.labelContent}
                    </div>
                </Html>
            )}
            {/* duplicate code for tab and enter clicking and mouse clicking - could be reduced but I can't get them to work in one  */}
            {a11y.pressed && (

                <Html distanceFactor={mesh.labelDistance}>
                    <div
                        className="content"
                        tabIndex="-1"
                    >
                        {mesh.labelContent}
                    </div>
                </Html>
            )}
        </mesh>
    )
}
