import * as seeding from 'typeorm-seeding';
import * as glob from 'glob';
import * as path from 'path';

const SEEDS = [`${__dirname}/**/*.seed.{js,ts}`];
const FACTORIES = [`${__dirname}/**/*.factory.{js,ts}`];

let factoriesLoaded = false;

// Expose typeorm-seeding's 'factory' and 'times' functions, so that
// everything related to seeders and factories can be used just the
// current file in our tests.
export const { factory, times } = seeding;

// Initialize factories and seeds defined for the typeorm-seeding package.
// The package only initializes them when calling a CLI to run seeds,
// and we need to setup the defined factories to instance entities
// within our tests.
export const initFactories = async (): Promise<void> => {
    // Make sure factories are initialized only once.
    if (factoriesLoaded) {
        return;
    }

    factoriesLoaded = true;

    // Import seeder and factory files to load their configuration.
    listFiles(SEEDS).forEach((filePath) => {
        importFile(filePath);
    });
    listFiles(FACTORIES).forEach((filePath) => {
        importFile(filePath);
    });

    await seeding.useSeeding({
        root: `${__dirname}/../config`,
        configName: 'typeorm.config.ts',
    });
};

const listFiles = (patterns: string[]): string[] => {
    let filePaths = [];

    patterns.forEach((pattern) => {
        filePaths = filePaths.concat(glob.sync(pattern));
    });

    return filePaths;
};

const importFile = (filePath: string): void => {
    import(path.resolve(process.cwd(), filePath));
};
