<div align="center">
  <h1>
    Ricky and Morty
  </h1>
  <p align="center">
    <a href="https://luxury-cajeta-2b2e39.netlify.app/">
      <img alt="Deploy status" src="https://api.netlify.com/api/v1/badges/c2b10e24-af2d-41d2-a530-33af06e7ece7/deploy-status" />
    </a>
  </p>
</div>

<br/>

## Available scripts

### Install dependencies:

```
npm install
```

### Start the dev server:

```
npm run dev
```

### Lint the project:

```
npm run lint
npm run lint:fix
```

If VSCode is your editor of choice, you can install the Eslint extension and add the following config to your editor to autofix on save, remove unused imports and organize imports:

```
"editor.codeActionsOnSave": {
   "source.fixAll.eslint": true,
   "source.addMissingImports": true,
   "source.organizeImports": true,
},
```

### Build for production:

```
npm run build
```

## Main dependencies:

| Domain                           | Docs                                       |
| :------------------------------- | :----------------------------------------- |
| CSS framework                    | [TailwindCSS](https://tailwindcss.com/)    |
| Data fetching / state management | [React Query](https://tanstack.com/query/) |
