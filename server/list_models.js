const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');
dotenv.config();

const ai = new GoogleGenAI({});

async function listModels() {
    try {
        const fs = require('fs');
        const response = await ai.models.list();
        const models = [];
        for await (const model of response) {
            models.push(model.name);
        }
        fs.writeFileSync('models.txt', models.join('\n'));
        console.log('Models written to models.txt');
    } catch (error) {
        console.error('Error listing models:', error);
    }
}

listModels();
