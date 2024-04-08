export const emojisfun = [
"🥳",
"🐙",
"🎩",
"🚲",
"🌼",
"🎨",
"🍔",
"🛸",
"🎸",
"📸",
"🌍",
"🧩",
"🍹",
"🌞",
"🦋",
"🏄‍♂️",
"🧁",
"🧳",
"🚀",
"🎈"
]


export const getRandomEmojis = () => {
    return emojisfun[Math.floor(Math.random() *emojisfun.length)];
}