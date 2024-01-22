import type { StackedBar } from "@/interfaces/BarCharts"
import { reactive } from "vue"

export interface DrinksData {
    [username: string]: {
        beer: number,
        wine: number,
        longdrink: number,
        liqueur: number,
        liquor: number
    }
}

interface SendDrinksDTO {
    username: string,
    beer:  BeerDataDTO,
    wine: WineDataDTO,
    longdrink: DrinkDataDTO,
    liqueur: DrinkDataDTO,
    liquor: DrinkDataDTO
}

interface BeerDataDTO {
    '100ml': number,
    '200ml': number,
    '300ml': number,
    '400ml': number,
    '500ml': number,
    '1000ml': number
}

interface WineDataDTO {
    red: number,
    white: number
}

interface DrinkDataDTO {
    volume: number
}

interface DrinksStatisticDTO {
    data: StatisticDataDTO
}

interface StatisticDataDTO {
    [username: string]: DataPoint[]
}

interface DataPoint {
    [date: string]: {
        beer:  BeerDataDTO,
        wine: WineDataDTO,
        longdrink: DrinkDataDTO,
        liqueur: DrinkDataDTO,
        liquor: DrinkDataDTO
    }
}

const DrinksState = reactive<DrinksStatisticDTO>({
    data: {}
});

function getBarChartSeries(): StackedBar[] {
    const series: StackedBar[] = [];
    const drinks = ['Bier', 'Wein', 'Longdrink', 'Likör', 'Schnapps'];

    for (const drink of drinks) {
        series.push({
            name: drink,
            type: 'column',
            data: []
        })
    }

    return series;
}

function getDrinkData(statisticData: StatisticDataDTO): DrinksData {
    const drinksData: DrinksData = {};

    for (const [username, userDataPoints] of Object.entries(statisticData)) {
        drinksData[username] = {
            beer: 0,
            wine: 0,
            longdrink: 0,
            liqueur: 0,
            liquor: 0
        }

        for (const dataPoint of userDataPoints) {
            const data = Object.values(dataPoint)[0];
            drinksData[username].beer = getBeerData(data.beer);
            drinksData[username].wine = getWineData(data.wine);
            drinksData[username].longdrink = data.longdrink.volume;
            drinksData[username].liqueur = data.liqueur.volume;
            drinksData[username].liquor = data.liquor.volume;
        }
    }

    return drinksData;
}

function getWineData(drink: WineDataDTO) {
    return drink.red + drink.white;
}

function getBeerData(beer: BeerDataDTO): number {
    let beerVol = 0;
    for (const [volume, times] of Object.entries(beer)) {
        beerVol += Number.parseInt(volume.substring(0, volume.length - 2)) * times;
    }
    return beerVol;
}

function generateUserData(users: string[], dataPoints: number) {
    const userStats: StatisticDataDTO = {};
    for (const user of users) {
        userStats[user] = [];
        for (let i = 0; i < dataPoints; i++) {
            userStats[user].push(generateDataPoint());
        }
    }
    DrinksState.data = userStats;
}

function generateDataPoint(): DataPoint {
    const randDate: string = randomDate(new Date('2023-10-01T00:00:00'), new Date(), 0, 23).toISOString();
    const dataPoint: DataPoint = {};
    dataPoint[randDate] =  {
        beer: {
            '100ml': randomCount(1, 0),
            '200ml': randomCount(1, 0),
            '300ml': randomCount(5, 0),
            '400ml': randomCount(1, 0),
            '500ml': randomCount(1, 0),
            '1000ml': randomCount(1, 0)
        },
        wine: {
            red: randomCount(200, 0),
            white: randomCount(200, 0)
        },
        longdrink: { volume: randomCount(200, 0) },
        liqueur: { volume: randomCount(200, 0) },
        liquor: { volume: randomCount(200, 0) }
    }
    return dataPoint;
}

function randomCount(upperBound: number, min: number) {
    return Math.floor(Math.random() * (upperBound + 1)) + min;
}

function randomDate(start: Date, end: Date, startHour: number, endHour: number): Date {
    if (startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23) {
        return new Date();
    }
    const date = new Date(+start + Math.random() * (end.getTime() - start.getTime()));
    const hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
  }

export function useMockBeerData() {

    return {
        DrinksState,
        generateUserData,
        getDrinkData
    }
}