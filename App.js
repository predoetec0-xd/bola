import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Accelerometer } from "expo-sensors";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [bolaX, setBolaX] = useState(30);
  const [bolaY, setBolaY] = useState(height / 2);
  const [capturado, setCapturado] = useState(false);

  // Ajustes de sensibilidade
  const SENSITIVITY = 28; // multiplicador de movimento (aumente para mais sensibilidade)
  const THRESHOLD = 0.02; // ignora pequenos ruídos do acelerômetro
  const UPDATE_INTERVAL = 30; // ms entre leituras (menor = mais responsivo)

  // Posição do Pokémon
  const pokemonX = width - 100;
  const pokemonY = height / 2 - 40;

  useEffect(() => {
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL);

    const subscription = Accelerometer.addListener(({ x, y }) => {
      if (capturado) return;

      // Aplicar threshold para ignorar ruído pequeno
      const moveX = Math.abs(x) > THRESHOLD ? -x * SENSITIVITY : 0;
      const moveY = Math.abs(y) > THRESHOLD ? y * SENSITIVITY : 0;

      setBolaX((valor) =>
        Math.max(0, Math.min(width - 50, valor + moveX))
      );

      setBolaY((valor) =>
        Math.max(80, Math.min(height - 70, valor + moveY))
      );
    });

    return () => subscription.remove();
  }, [capturado]);

  useEffect(() => {
    if (capturado) return;

    // Verifica se a Pokébola encostou no Pokémon.
    const centroBolaX = bolaX + 25;
    const centroBolaY = bolaY + 25;
    const centroPokemonX = pokemonX + 40;
    const centroPokemonY = pokemonY + 40;

    const distancia = Math.sqrt(
      Math.pow(centroBolaX - centroPokemonX, 2) +
      Math.pow(centroBolaY - centroPokemonY, 2)
    );

    if (distancia < 60) {
      setCapturado(true);
    }
  }, [bolaX, bolaY, capturado]);

  function reiniciar() {
    setBolaX(30);
    setBolaY(height / 2);
    setCapturado(false);
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>
        {capturado ? "🎉 Pokémon capturado!" : "Incline o celular!"}
      </Text>

      {!capturado && (
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
          }}
          style={[
            styles.pokemon,
            { left: pokemonX, top: pokemonY },
          ]}
        />
      )}

      {/* Pokébola */}
      <View
        style={[
          styles.bola,
          { left: bolaX, top: bolaY },
        ]}
      >
        <View style={styles.linha} />
        <View style={styles.botao} />
      </View>

      {capturado && (
        <Text style={styles.reiniciar} onPress={reiniciar}>
          Tocar aqui para tentar novamente
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#dff6ff",
  },

  titulo: {
    position: "absolute",
    top: 45,
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    zIndex: 10,
  },

  pokemon: {
    position: "absolute",
    width: 80,
    height: 80,
  },

  bola: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
    borderWidth: 3,
    borderColor: "black",
  },

  linha: {
    position: "absolute",
    top: 20,
    left: 0,
    width: 44,
    height: 5,
    backgroundColor: "black",
  },

  botao: {
    position: "absolute",
    top: 14,
    left: 14,
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "black",
  },

  reiniciar: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
