import axios from 'axios';

//key here

export const sendMessageToChatGPT = async (message) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4o",
                messages: [{ role: "user", content:
                    `If a users writes a full message to you then this is a reminder to respond to the user only when the topic is around Elden Ring
                    builds, if the user input isnt about elden ring then state that you can only help with elden ring builds, also
                    dont give advice on how to play the game but only when a build is requested${message}` }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error communicating with ChatGPT:', error);
        throw error;
    }
};

export const sendStatsToGPT = async (message) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4o",
                messages: [{ role: "user", content:
                    `If you are provided with only the users Elden Ring stats then only respond IN BULLET POINTS with:
                    the 1 most optimal weapons that should be used for those stats,
                    the 1 most optimal ash of war that should be used for the selected weapon,
                    the 1 most optimal affinity on that ash of war for the users stats,
                    the 1 most optimal catalyst for sorceries or incantations that should be used for those stats,
                    the 4 most optimal talismans that should be used for those stats IT IS EXTREMLEY IMPORTANT THAT THESE ARE SELECTED CARFULLY,
                    the 2 most optimal tears for the Flask of Wondrous Physick,
                    the 3 most optimal buffs that should be used for this build,
                    and the most optimal armor for this build.
                    Keep your response limited to the 12 bullet points.
                    Additional rules are as follows:
                    These weapons, talismans, and armor have to be optimized for the given stats, here are the conditions:
                    1) the total equip load can NOT be a heavy load for the user.
                    2) the weapons have to have the best scaling for the users best attributes.
                    3) the talismans have to highlight the users strongest stats and optimize the damage of the selected weapon.
                    4) the tears in the Wondrous Physick have to optimize the damage of the selected weapon or maximize the users defensive stats.
                    5) the selected buffs have to optimize the damage of the selected weapon or maximize the users defensive stats.
                    Here are the users stats:
                    ${message}` }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error communicating with ChatGPT:', error);
        throw error;
    }
};
