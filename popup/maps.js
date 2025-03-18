const maps = [
    {
        obstacles: [
            { x: 100, y: 50 },
            { x: 200, y: 100 },
            { x: 50, y: 200 },
            { x: 300, y: 150 }
        ],
        enemyPath: [
            { x: 50, y: 50 },
            { x: 50, y: 100 },
            { x: 100, y: 100 },
            { x: 100, y: 50 }
        ]
    },
    {
        obstacles: [
            { x: 150, y: 75 },
            { x: 250, y: 125 },
            { x: 75, y: 225 },
            { x: 350, y: 175 }
        ],
        enemyPath: [
            { x: 200, y: 50 },
            { x: 200, y: 100 },
            { x: 250, y: 100 },
            { x: 250, y: 50 }
        ]
    },
    {
        obstacles: [
            { x: 80, y: 40 },
            { x: 220, y: 90 },
            { x: 60, y: 180 },
            { x: 310, y: 130 }
        ],
        enemyPath: [
            { x: 120, y: 60 },
            { x: 120, y: 120 },
            { x: 180, y: 120 },
            { x: 180, y: 60 }
        ]
    }
];

function getRandomMap() {
    return maps[Math.floor(Math.random() * maps.length)];
}

export { getRandomMap };