const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const csvtojson = require('csvtojson');
dotenv.config();

const convertData = async (client) => {
    const dataJson = await csvtojson().fromFile(
        'population_pyramid_1950-2022.csv',
    );
    await client.db('databaseWeek4').collection('population').deleteMany();
    const result = await client
        .db('databaseWeek4')
        .collection('population')
        .insertMany(dataJson);
};


async function getPopulationByYear(client, country) {
    const PopulationByYear = [
        {
            $match: { Country: country },
        },
        {
            $group: {
                _id: '$Year',
                countPopulation: {
                    $sum: { $add: [{ $toInt: '$M' }, { $toInt: '$F' }] },
                },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ];

    const cursor = await client
        .db('databaseWeek4')
        .collection('population')
        .aggregate(PopulationByYear);
    await cursor.forEach((result) => {
        console.table(result);
    });
}


async function getPopulationByContinent(client, age, year) {
    const PopulationByContinent = [
        {
            $match: {
                Country: {
                    $in: [
                        'AFRICA',
                        'ASIA',
                        'EUROPE',
                        'LATIN AMERICA AND THE CARIBBEAN',
                        'NORTHERN AMERICA',
                        'OCEANIA',
                    ],
                },
                Year: year,
                Age: age,
            },
        },

        {
            $addFields: {
                TotalPopulation: {
                    $add: [{ $toInt: '$M' }, { $toInt: '$F' }],
                },
            },
        },
    ];
    const cursor = await client
        .db('databaseWeek4')
        .collection('population')
        .aggregate(PopulationByContinent);
    await cursor.forEach((result) => {
        console.table(result);
    });
}
async function main() {
    if (process.env.MONGODB_URL == null) {
        throw Error(
            `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
        );
    }
    const client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    });

    try {
        await client.connect();
        await convertData(client);

        await getPopulationByYear(client, 'Netherlands');

        await getPopulationByContinent(client, '100+', '2020');

    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

main();