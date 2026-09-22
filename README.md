# bola

## Pokemon + Acelerometro

Projeto simples em Expo + JavaScript.

## O que ele faz

- Usa o acelerometro do Android Emulator.
- Incline o aparelho para mover a Pokebola.
- O Pikachu aparece como alvo.
- Quando a Pokebola encosta no Pikachu, ele e capturado.
- Toque na mensagem para tentar novamente.

## Como instalar

Abra o terminal nesta pasta:

```bash
npm install
npx expo start
```

Depois abra no Android Emulator.

## Se houver erro de versao

Como as versoes do Expo mudam, voce pode criar um projeto Expo novo e instalar o sensor com:

```bash
npx create-expo-app meu-jogo
cd meu-jogo
npx expo install expo-sensors
```

Depois copie o `App.js` deste projeto para o novo projeto.

## Como testar o acelerometro

No Android Emulator, abra os controles estendidos do emulador e use os controles de movimento/inclinacao do aparelho.

O codigo usa:

```javascript
import { Accelerometer } from "expo-sensors";
```
