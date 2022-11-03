# Three.js Scene Viewer with React-fiber

A scene viewr built in react using React-fiber and drei. Organically created webpack folder and Babel inetegration. 

```
npm i
```
```
npm run build
```
To rebuild and reload the live server while making changes
```
webpack --watch
```
This will create main file and basic set up to let the application run 

## Packages Used
- react
- babel
- webpack 
- three
- @react-three/fiber
- @react-three/drei

### To load scss files:
- sass
- sass-loader
- node-sass

To create a css file from the scss files, from the root folder run:
```
 sass src/styles.scss src/styles.css
```

### To insert menu
-   lil-gui


To render glTF files as 2.0 version, which renders, meshes, shadings and animations differently. 
- gltf-pipeline

Once you have your original gltf file, go to the folder it's in and run the following to process and rename the file. 

```
 gltf-pipeline -i scene.gltf -o newname.gltf -d
```
Cnvert the new gltf file into a jsx file with the following command.
```
npx gltf newname.gltf
```

## Wants: 
- No screen reader description
- Clickable/keyboard controls to move and rotate object and toggle labels
- The bottom of the I-Frame visible in fullscreen at 200%
- Render if there is more than one on the webpage using its repsenctive json file to populate content.


## Stretch goals
- Having a test page on the 101 for anyone to test lighting, camera position and scale 
- Convert to Typescript

## Concerns to tackle from Sketchfab integration:
- No movement of object with keyboard when in orbit mode, and limited movement in first-person mode


## Features
- Import data (images and controls) from json files
- Custom built collapsable menu - keyboard navigation

---

## Resources
Royalty free textures found using: https://www.textures.com/
