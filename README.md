# PokéArchive

## Presentation
This project is my **first test with Angular**, mainly created to practice components, routing, API calls and UI experiments.  
The goal of PokéArchive is simple: **view Pokémon cards**, search through them, and play with a smooth 3D card effect.

---

## Preview
![Preview](./frontend/src/assets/readme/screenshot1.png)

---

## Collection & Search
The **Archive** page lets you browse all Pokémon cards available through the TCGDex API.

You can type any string (e.g., `"pika"`) and the app will:
- Query all Pokémon cards from the API  
- Filter only cards that actually have an image  
- Keep only those whose name contains the search string (case-insensitive)  

![Preview](./frontend/src/assets/readme/screenshot2.png)

---

## Card Effect
The card component includes:
- A 3D tilt effect following the pointer  
- A flip animation  
- A small light/glare system  

![Preview](./frontend/src/assets/readme/pokearchive.gif)

---

## Project Structure
```
PokeArchive/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── environments/
│   │   └── index.html
│   ├── angular.json
│   └── package.json
└── README.md (this one)
```

---

## Installation
Inside the `/frontend` folder:

```bash
npm install
npm start
```

Then open:

```
http://localhost:4200
```

---

## Build
To generate a production build:

```bash
ng build
```

The output will be inside:

```
frontend/dist/
```

Upload this folder to your hosting provider.

---

## Stack
- **Angular**
- **TypeScript**
- **Node.js** (not used yet)
- **HTML / CSS**
- **TCGDex API** — https://tcgdex.dev/

---

## Author
Built by **Goschad** — a small Angular learning project.
