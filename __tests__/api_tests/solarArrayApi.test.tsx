import { getArrayData, createArray, updateArray } from 'api/solarArrayApi';
import { ISolarArray } from 'types/ISolarArray';

jest.mock('api/solarArrayApi');

describe('Solar Array Api', () => {
  const mockUserId = 1
  const solarArray: ISolarArray = { solarArrayId: 1, lon: 1, lat: 1, peakPower: 1, loss: 1, angle: 1, aspect: 1, mounting: 'test', userId: 1};

  beforeEach(() => {
    (getArrayData as jest.Mock).mockResolvedValue(solarArray);
    (createArray as jest.Mock).mockResolvedValue(solarArray);
    (updateArray as jest.Mock).mockResolvedValue(solarArray);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return a solar array data', async () => {
    const solarArrayData  = await getArrayData(mockUserId);
    expect(solarArrayData).toEqual(solarArray); 
  });

  test('should update an array', async () => {
    const updateArrayResp  = await updateArray(solarArray);
    expect(updateArrayResp).toEqual(solarArray);
  });

  test('should create an array', async () => {
    const createArrayResp  = await createArray(solarArray);
    expect(createArrayResp).toEqual(solarArray);
  });


});