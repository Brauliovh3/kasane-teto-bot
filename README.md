# ❤ KASANE TETO BOT ❤
### 🥖 *Bot de WhatsApp Multi-Device con la personalidad de Teto* 🎤
![Kasane teto Banner](https://files.catbox.moe/hx106s.jpg)

<div align="center">

  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
  [![Baileys](https://img.shields.io/badge/Baileys-Multi--Device-blue.svg)](https://github.com/WhiskeySockets/Baileys)
  [![License](https://img.shields.io/badge/License-GPL--3.0-red.svg)](LICENSE)
</div>

---

## 🎵 **Características Principales**

> **Kasane Teto**, la chimera virtual cantante, ahora como tu bot de WhatsApp personal

- 🎤 **Personalidad de Teto**: Respuestas dulces y temática musical
- 🥖 **Sistema de Baguettes**: Moneda única del juego (reemplaza piroxenos)
- 🎮 **Juegos RPG**: Casino, ruleta, coinflip con baguettes
- 🎭 **Comandos de Diversión**: Interacciones temáticas de Teto
- 🛡️ **Sistema Anti-Spam**: Antilink, antitóxicos, etc.
- 👥 **Gestión de Grupos**: Bienvenidas, administración
- 🎨 **Stickers**: Creación de stickers personalizados
- 📥 **Descargas**: YouTube, TikTok, Instagram, etc.
- 🤖 **Multi-Device**: Compatible con WhatsApp Web

---

## 🚀 **Instalación Rápida**

### Prerrequisitos
- **Node.js** v18 o superior
- **Git** instalado
- **WhatsApp** (para vincular)

### 1. Clonar el repositorio
```bash
git clone https://github.com/Brauliovh3/kasane-teto-bot.git
cd kasane-teto-bot
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar
```bash
npm start
```

### 4. Escanear QR
- Abre WhatsApp → Dispositivos vinculados → Vincular dispositivo
- Escanea el código QR que aparece en la terminal

---

## 📱 **Instalación en Termux (Android)**

### Prerrequisitos para Termux
- **Termux** instalado desde F-Droid (recomendado)
- Al menos 2GB de almacenamiento libre

### 1. Actualizar Termux
```bash
pkg update && pkg upgrade
```

### 2. Instalar dependencias
```bash
pkg install nodejs git
```

### 3. Instalar paquetes adicionales (opcional)
```bash
pkg install ffmpeg imagemagick
```

### 4. Clonar e instalar el bot
```bash
git clone https://github.com/Brauliovh3/kasane-teto-bot.git
cd kasane-teto-bot
npm install
```

### 5. Ejecutar en Termux
```bash
npm start
```

### 6. Mantener activo (opcional)
Para que el bot siga funcionando cuando cierres Termux:
```bash
pkg install screen
screen -S teto-bot npm start
```
Para volver a la sesión: `screen -r teto-bot`

### Consejos para Termux:
- 🔋 **Batería**: Desactiva la optimización de batería para Termux
- 📂 **Permisos**: Otorga permisos de almacenamiento con `termux-setup-storage`
- 💾 **Espacio**: El bot ocupa aproximadamente 500MB-1GB
- 🔄 **Reinicio**: Si se cierra, simplemente ejecuta `npm start` de nuevo

---

## 🥖 **Sistema de Baguettes**

El bot utiliza **🥖 Baguettes** como moneda principal:

- **Ganar Baguettes**: Usando comandos, juegos, actividad diaria
- **Usar Baguettes**: Juegos de casino, comandos premium
- **Ver Balance**: `#baguettes` o `#balance`

### Comandos de Juegos
- `#coinflip [cara/cruz]` - Apostar baguettes en volados
- `#ruleta [cantidad] [red/black]` - Ruleta de casino
- `#casino [cantidad]` - Máquinas tragamonedas

---

## 🎤 **Comandos de Teto**

### Diversión
- `#comer` / `#baguette` - Teto come baguettes
- `#feliz` - Teto cantando feliz
- `#acariciar @usuario` - Caricias tiernas como Teto
- `#fortuna` - Baguette de la fortuna

### Música y Audio
- `#play [canción]` - Buscar y descargar música
- `#spotify [url]` - Descargar de Spotify

### Interacción
- `#abrazo @usuario` - Abrazos virtuales
- `#beso @usuario` - Besos dulces
- `#sonrojo` - Teto sonrojándose

---

## 📂 **Estructura del Proyecto**

```
kasane-teto-bot/
├── plugins/          # Comandos del bot
│   ├── fun-*.js     # Comandos de diversión
│   ├── game-*.js    # Juegos con baguettes
│   ├── rpg-*.js     # Sistema RPG
│   └── ...
├── lib/             # Librerías principales
├── storage/         # Almacenamiento de datos
├── sessions/        # Sesiones de WhatsApp
├── settings.js      # Configuración principal
└── package.json     # Dependencias
```

---

## 🤝 **Contribuir**

¡Las contribuciones son bienvenidas! 

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/nueva-funcion`)
3. Commit tus cambios (`git commit -m 'Agregar nueva función'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request

---

## 📄 **Licencia**

Este proyecto está bajo la Licencia GPL-3.0.

---

## 💖 **Créditos**

- **Tema Original**: Hatsune Miku (modificado para Kasane Teto)
- **Inspiración**: Kasane Teto - La chimera virtual cantante
- **Desarrollado con ❤**: Por (ㅎㅊDEPOOLㅊㅎ)

---

<div align="center">
  
  **🎵 "Teto está aquí para hacer tu día más dulce con baguettes y canciones" 🥖❤**
  
</div>

---

> **Nota**: Este bot es para uso educativo y de entretenimiento. Respeta los términos de servicio de WhatsApp.

