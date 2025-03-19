const maps = [
    {
        id: 1,
        obstacles: [
            { x: 100, y: 50 },
            { x: 200, y: 100 },
            { x: 50, y: 200 },
            { x: 300, y: 150 }
        ],
        enemyPath: [
            { x: 90, y: 10 },
            { x: 90, y: 30 },
            { x: 90, y: 50 },
            { x: 90, y: 70 },
            { x: 90, y: 90 },
            { x: 90, y: 110 },
            { x: 90, y: 130 },
            { x: 70, y: 130 },
            { x: 50, y: 130 },
            { x: 30, y: 130 },
            { x: 10, y: 130 },
        ]
    },
    {
        id: 2,
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
        id: 3,
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